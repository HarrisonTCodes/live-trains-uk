import axios from 'axios';
import type { Plan } from '../types/app';
import type { PlansResponse } from '../types/api';
import type { TransportMode, UndergroundLine } from '../types/enums';
import { stations, getIcsId } from './stations';

const modes: Record<TransportMode, Set<string>> = {
  UNDERGROUND: new Set(['tube', 'elizabeth-line']),
  BUS: new Set(['replacement-bus', 'public-bus', 'coach']),
  TRAIN: new Set(['national-rail', 'overground']),
  WALK: new Set(['walking']),
  TRANSFER: new Set(),
  DLR: new Set(),
  TRAM: new Set(),
  CABLE_CAR: new Set(['cable-car']),
  CYCLE: new Set(['cycle-hire']),
  RIVER: new Set(['river-bus', 'river-tour']),
};

export function convertTransportMode(rawMode: string): TransportMode | undefined {
  // If raw mode appears directly as transport mode variant
  if (rawMode.toUpperCase() in modes) {
    return rawMode.toUpperCase() as TransportMode;
  }

  // If raw mode is a known synonym of a transport mode variant from other APIs
  for (const [mode, otherNames] of Object.entries(modes)) {
    if (otherNames.has(rawMode)) {
      return mode as TransportMode;
    }
  }
}

export async function getPlans(from: string, to: string): Promise<Plan[]> {
  // Get query parameters
  const fromCrs = stations[from as keyof typeof stations];
  const toCrs = stations[to as keyof typeof stations];

  // If invalid or missing stations provided
  if (!fromCrs || !toCrs) {
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
    .then((response) => response.data)
    .catch((err) => {
      // API returns 404 if no plans found, catch and yield mock result with empty journeys
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        return { journeys: [] };
      }
    })) as PlansResponse;

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
        line:
          mode === 'UNDERGROUND'
            ? (leg.routeOptions[0].lineIdentifier.id
                .toUpperCase()
                .replaceAll('-', '_') as UndergroundLine)
            : undefined,
        number: mode === 'BUS' ? leg.routeOptions[0].name : undefined,
      };
    }),
  }));
}
