import { NextRequest } from 'next/server';
import stations from '../../utils/stations';
import matchStation from '@/app/utils/matchStation';

export function GET(request: NextRequest) {
  const prompt = request.nextUrl.searchParams.get('prompt')?.toLowerCase() ?? '';

  return Response.json(
    Object.keys(stations)
      .filter((station) => matchStation(station, prompt)) // Get stations that match prompt
      .sort((a, b) => {
        // Sort matches so those that exactly match are bumped to the top
        const aMatches = a.toLowerCase().includes(prompt);
        const bMatches = b.toLowerCase().includes(prompt);

        return +bMatches - +aMatches;
      })
      .slice(0, 16) // Get up to only the first 16 stations to avoid overloading
      .map((station) => ({
        // Send back station name and CRS
        name: station,
        crs: stations[station as keyof typeof stations],
      })),
  );
}
