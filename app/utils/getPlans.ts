import { formatDate } from 'date-fns';
import { Leg, LegResponse, Plan, PlanResponse } from '../interfaces';
import convertTransportMode from './convertTransportMode';
import inferUndergroundInfo from './inferUndergroundInfo';
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

  const response = await fetch(process.env.PLANS_BASE_URL!, {
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
            crs: leg.board.crsCode,
            time: leg.timetable.scheduled.departure,
          },
          arrival: {
            station: leg.alight.name.toLowerCase(),
            crs: leg.alight.crsCode,
            time: leg.timetable.scheduled.arrival,
          },
          mode: leg.mode.toLowerCase(),
        });
        continue;
      }

      // If leg is trivial, direct underground service (details can be inferred from message string)
      const inferredUndergroundInfo = inferUndergroundInfo(leg);
      if (inferredUndergroundInfo) {
        legs.push({
          departure: {
            station: leg.board.name.toLowerCase(),
            crs: leg.board.crsCode,
            time: leg.timetable.scheduled.departure,
          },
          arrival: {
            station: leg.alight.name.toLowerCase(),
            crs: leg.alight.crsCode,
            time: leg.timetable.scheduled.arrival,
          },
          mode: convertTransportMode(leg.mode.toLowerCase()),
          undergroundInfo: inferredUndergroundInfo,
        });
        continue;
      }

      // Get station ICS IDs using (cleaned) names for TfL tube API
      const cleanedNames = [
        leg.board.name.replace(/\s*\(.*?\)/g, ''),
        leg.alight.name.replace(/\s*\(.*?\)/g, ''),
      ];
      const [departureIcs, arrivalIcs] = await Promise.all(
        cleanedNames.map(async (name) => {
          if (name in icsCache) {
            return icsCache[name];
          }

          const search = await fetch(
            `${process.env.STOP_POINT_SEARCH_BASE_URL}?query=${name}&app_key=${process.env.STOP_POINT_SEARCH_API_KEY}`,
          ).then((response) => response.json());

          // Get result that has every word in name, if none, fallback to first result
          const nameWords = name.toLowerCase().split();
          let ics = search.matches.find((match: any) => {
            const matchWords = new Set(match.name.toLowerCase().split());
            return nameWords.every((word: string) => matchWords.has(word));
          })?.icsId;
          if (!ics) {
            ics = search.matches[0].icsId;
          }

          // Update cache and return ID
          icsCache[name] = ics;
          return ics;
        }),
      );

      // Get tube journey between two stations
      const tubePlanResponse = await fetch(
        `${process.env.TUBE_PLANS_BASE_URL}/${departureIcs}/to/${arrivalIcs}?date=${formatDate(leg.timetable.scheduled.departure, 'yyyyMMdd')}&time=${formatDate(leg.timetable.scheduled.departure, 'HHmm')}&app_key=${process.env.TUBE_PLANS_API_KEY}`,
      ).then((response) => response.json());
      const earliestJourney = tubePlanResponse.journeys[0];

      for (const subLeg of earliestJourney.legs) {
        const mode = convertTransportMode(subLeg.mode.id.toLowerCase());
        legs.push({
          departure: {
            station: subLeg.departurePoint.commonName.toLowerCase(),
            crs: subLeg.departurePoint.icsCode, // TODO: FIX!!!
            time: subLeg.departureTime,
          },
          arrival: {
            station: subLeg.arrivalPoint.commonName.toLowerCase(),
            crs: subLeg.arrivalPoint.icsCode, // TODO: FIX!!!
            time: subLeg.arrivalTime,
          },
          mode,
          undergroundInfo: {
            line: mode === 'underground' ? subLeg.routeOptions[0].lineIdentifier.id : undefined,
          },
        });
      }
    }

    plans.push({
      duration: plan.duration,
      legs,
    });
  }

  return plans;
}
