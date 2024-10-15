import { NextRequest } from 'next/server';
import stations from '../shared/stations';

function matchStation(station: string, prompt: string) {
  // Catch exact matches
  if (station.slice(0, prompt.length) == prompt) return true;

  // Allow searching of CRS for power users
  const crs = stations[station as keyof typeof stations];
  if (crs.toLowerCase() === prompt) return true;

  // Check each word of prompt against each word of station
  const stationWords = station.split(' ');
  const promptWords = prompt.split(' ');
  for (const promptWord of promptWords) {
    for (const stationWord of stationWords) {
      if (stationWord.slice(0, promptWord.length) == promptWord) return true;
    }
  }

  // If no cases above match, return false
  return false;
}

export function GET(request: NextRequest) {
  const prompt = request.nextUrl.searchParams.get('prompt')?.toLowerCase() ?? '';

  return Response.json(
    Object.keys(stations)
      .filter((station) => matchStation(station, prompt)) // Get stations that match prompt
      .slice(0, 16), // Get up to only the first 16 stations to avoid overloading
  );
}
