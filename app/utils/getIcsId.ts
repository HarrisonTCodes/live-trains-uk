import axios from 'axios';
import { StopPointsResponse } from '../types/api';

export default async function getIcsId(station: string): Promise<string> {
  const response = (await axios
    .get(process.env.STOP_POINT_SEARCH_BASE_URL!, {
      params: {
        query: station,
        app_key: process.env.STOP_POINT_SEARCH_API_KEY,
      },
    })
    .then((response) => response.data)) as StopPointsResponse;

  // Get result that has every word in name
  const nameWords = station.toLowerCase().split(' ');
  let ics = response.matches.find((match) => {
    const matchWords = new Set(match.name.toLowerCase().split(' '));
    return nameWords.every((word: string) => matchWords.has(word));
  })?.icsId;

  // If no word-match found, fallback to first result
  if (!ics) {
    ics = response.matches[0].icsId;
  }

  return ics;
}
