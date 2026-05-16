import axios from 'axios';
import { formatDate } from 'date-fns';
import convertTransportMode from './convertTransportMode';

export default async function getTubePlan(
  from: string,
  to: string,
  at: string,
  icsCache: Record<string, string>,
) {
  // Get station ICS IDs using (cleaned) names for TfL tube API
  const cleanedNames = [from.replace(/\s*\(.*?\)/g, ''), to.replace(/\s*\(.*?\)/g, '')];
  const [departureIcs, arrivalIcs] = await Promise.all(
    cleanedNames.map(async (name) => {
      if (name in icsCache) {
        return icsCache[name];
      }

      const search = await axios
        .get(process.env.STOP_POINT_SEARCH_BASE_URL!, {
          params: {
            query: name,
            app_key: process.env.STOP_POINT_SEARCH_API_KEY,
          },
        })
        .then((response) => response.data);

      // Get result that has every word in name, if none, fallback to first result
      const nameWords = name.toLowerCase().split(' ');
      let ics = search.matches.find((match: any) => {
        const matchWords = new Set(match.name.toLowerCase().split(' '));
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
  const tubePlanResponse = await axios
    .get(`${process.env.TUBE_PLANS_BASE_URL}/${departureIcs}/to/${arrivalIcs}`, {
      params: {
        date: formatDate(at, 'yyyyMMdd'),
        time: formatDate(at, 'HHmm'),
        app_key: process.env.TUBE_PLANS_API_KEY,
      },
    })
    .then((response) => response.data);
  const earliestJourney = tubePlanResponse.journeys[0];

  return earliestJourney.legs.map((leg: any) => {
    const mode = convertTransportMode(leg.mode.id.toLowerCase());
    return {
      departure: {
        station: leg.departurePoint.commonName.toLowerCase(),
        crs: leg.departurePoint.icsCode, // TODO: FIX!!!
        time: leg.departureTime,
      },
      arrival: {
        station: leg.arrivalPoint.commonName.toLowerCase(),
        crs: leg.arrivalPoint.icsCode, // TODO: FIX!!!
        time: leg.arrivalTime,
      },
      mode,
      undergroundInfo: {
        line: mode === 'underground' ? leg.routeOptions[0].lineIdentifier.id : undefined,
      },
    };
  });
}
