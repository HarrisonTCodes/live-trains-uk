import { CallingPoint, ServiceResponse } from '@/app/interfaces';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Get query parameters
  const from = request.nextUrl.searchParams.get('from')?.toUpperCase();
  const to = request.nextUrl.searchParams.get('to')?.toUpperCase();

  // If a 'from' or 'to' station argument isn't provided in the query parameters, error
  if (!from || !to) {
    return new Response('Missing URL parameters - must have a from and to value', {
      status: 400,
    });
  }

  // Set API key in headers
  const headers = new Headers();
  headers.set('x-apikey', process.env.API_KEY!);

  // Get service details
  const response = await fetch(
    `https://api1.raildata.org.uk/1010-live-departure-board-dep/LDBWS/api/20220120/GetDepBoardWithDetails/${from}?numRows=10&filterCrs=${to}`,
    {
      headers,
    },
  ).then((response) => response.json());

  // Parse data
  const services = response.trainServices.map((serviceResponse: ServiceResponse) => {
    // Get data from calling point matching provided destination station
    const arrivalData: CallingPoint = serviceResponse.subsequentCallingPoints[0].callingPoint.find(
      ({ crs }: { crs: string }) => crs === to,
    )!;

    return {
      departureTime: serviceResponse.std,
      estimatedDepartureTime: serviceResponse.etd,
      platform: serviceResponse.platform,
      arrivalTime: arrivalData.st,
      estimatedArrivalTime: arrivalData.et,
    };
  });

  return Response.json(services);
}
