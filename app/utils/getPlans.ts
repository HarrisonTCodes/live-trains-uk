import axios from 'axios';
import convertTransportMode from './convertTransportMode';
import { stations } from './stations';
import getIcsId from './getIcsId';
import { Plan, PlansResponse } from '../interfaces';

export default async function getPlans(from: string, to: string): Promise<Plan[]> {
  // Get query parameters
  const fromCrs = stations[from as keyof typeof stations];
  const toCrs = stations[to as keyof typeof stations];

  // If invalid or missing stations provided
  if (!fromCrs || (to && !toCrs)) {
    throw Error(`Invalid station(s) provided: '${from}' and '${to}'`);
  }

  // Get ICS IDs for stations (TfL APIs use ICS instead of CRS)
  const [fromIcs, toIcs] = await Promise.all([getIcsId(from), getIcsId(to)]);

  // Get plan between stations
  const response = (await axios
    .get(`${process.env.PLANS_BASE_URL}/${fromIcs}/to/${toIcs}`, {
      params: {
        app_key: process.env.PLANS_API_KEY,
      },
    })
    .then((response) => response.data)) as PlansResponse;

  return response.journeys.map((plan) => ({
    duration: plan.duration,
    legs: plan.legs.map((leg) => {
      const mode = convertTransportMode(leg.mode.id.toLowerCase());

      return {
        departure: {
          station: leg.departurePoint.commonName.toLowerCase(),
          time: leg.departureTime,
        },
        arrival: {
          station: leg.arrivalPoint.commonName.toLowerCase(),
          time: leg.arrivalTime,
        },
        mode,
        undergroundInfo:
          mode === 'underground'
            ? {
                line: leg.routeOptions[0].lineIdentifier.id,
              }
            : undefined,
      };
    }),
  }));
}
