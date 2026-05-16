import axios from 'axios';
import { Leg, Plan, PlansResponse } from '../interfaces';
import convertTransportMode from './convertTransportMode';
import inferUndergroundInfo from './inferUndergroundInfo';
import { stations } from './stations';
import getTubePlan from './getTubePlan';

export default async function getPlans(from: string, to?: string) {
  // Get query parameters
  const fromCrs = stations[from as keyof typeof stations];
  const toCrs = stations[to as keyof typeof stations];

  // If invalid or missing stations provided
  if (!fromCrs || (to && !toCrs)) {
    throw Error(`Invalid station(s) provided: '${from}' and '${to}'`);
  }

  const now = new Date().toISOString();

  const response = (await axios
    .post(process.env.PLANS_BASE_URL!, {
      origin: {
        crs: fromCrs,
        group: false,
      },
      destination: {
        crs: toCrs,
        group: false,
      },
      outwardTime: {
        travelTime: now,
        type: 'DEPART',
      },
      fareRequestDetails: {
        passengers: {
          adult: 1,
          child: 0,
        },
        fareClass: 'ANY',
        railcards: [],
      },
      directTrains: false,
      reducedTransferTime: false,
      onlySearchForSleeper: false,
      overtakenTrains: true,
      useAlternativeServices: false,
      increasedInterchange: 'ZERO',
    })
    .then((response) => response.data)) as PlansResponse;

  const plans: Plan[] = [];
  const icsCache: Record<string, string> = {};

  for (const plan of response.outwardJourneys) {
    const legs: Leg[] = [];

    for (const leg of plan.legs) {
      // If a non-underground leg
      if (leg.mode !== 'UNDERGROUND') {
        legs.push({
          departure: {
            station: leg.board.name.toLowerCase(),
            time: leg.timetable.scheduled.departure,
          },
          arrival: {
            station: leg.alight.name.toLowerCase(),
            time: leg.timetable.scheduled.arrival,
          },
          mode: convertTransportMode(leg.mode.toLowerCase()),
        });
        continue;
      }

      // If leg is trivial, direct underground service (details can be inferred from message string)
      const inferredUndergroundInfo = inferUndergroundInfo(leg);
      if (inferredUndergroundInfo) {
        legs.push({
          departure: {
            station: leg.board.name.toLowerCase(),
            time: leg.timetable.scheduled.departure,
          },
          arrival: {
            station: leg.alight.name.toLowerCase(),
            time: leg.timetable.scheduled.arrival,
          },
          mode: convertTransportMode(leg.mode.toLowerCase()),
          undergroundInfo: inferredUndergroundInfo,
        });
        continue;
      }

      // If leg is a complex tube journey, expand into multiple legs
      const subLegs = await getTubePlan(
        leg.board.name,
        leg.alight.name,
        leg.timetable.scheduled.departure,
        icsCache,
      );
      legs.push(...subLegs);
    }

    plans.push({
      duration: plan.duration,
      legs,
    });
  }

  return plans;
}
