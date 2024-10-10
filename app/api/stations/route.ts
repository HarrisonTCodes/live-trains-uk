import { NextRequest } from 'next/server';
import stations from '../shared/stations';

export function GET(request: NextRequest) {
  const prompt = request.nextUrl.searchParams.get('prompt')?.toLowerCase() ?? '';

  return Response.json(
    Object.keys(stations)
      .filter((station) => station.slice(0, prompt.length) == prompt) // Get stations that match prompt
      .slice(0, 16), // Get up to only the first 16 stations to avoid overloading
  );
}
