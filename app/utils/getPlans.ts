import { LegResponse, PlanResponse } from '../interfaces';
import { stations } from './stations';

export default async function getPlans(from: string, to?: string) {
  // Get query parameters
  const fromCrs = stations[from as keyof typeof stations];
  const toCrs = stations[to as keyof typeof stations];

  // If invalid or missing stations provided
  if (!fromCrs || (to && !toCrs)) {
    throw Error(`Invalid station(s) provided: '${from}' and '${to}'`);
  }

  const now = new Date().toISOString();

  const response = await fetch('https://jpservices.nationalrail.co.uk/journey-planner', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
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
    }),
  }).then((response) => response.json());

  const plans = response.outwardJourneys.map((plan: PlanResponse) => {
    return plan.legs.map((leg: LegResponse) => ({
      departure: {
        station: leg.board.name,
        crs: leg.board.crsCode,
        time: leg.timetable.scheduled.departure,
      },
      arrival: {
        station: leg.alight.name,
        crs: leg.alight.crsCode,
        time: leg.timetable.scheduled.arrival,
      },
      mode: leg.mode.toLowerCase(),
    }));
  });

  return plans;
}
