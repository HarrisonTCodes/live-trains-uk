import { CallingPointResponse, ServiceResponse } from '@/app/interfaces';
import { NextRequest } from 'next/server';
import stations from '../../utils/stations';
import getDuration from '@/app/utils/getDuration';

export async function GET(request: NextRequest) {
  // Get query parameters
  const from = stations[request.nextUrl.searchParams.get('from') as keyof typeof stations];
  const to = stations[request.nextUrl.searchParams.get('to') as keyof typeof stations];

  // If invalid or missing stations provided
  if (!from || !to) {
    return new Response('Invalid stations provided', {
      status: 400,
    });
  }

  // Set API key in headers
  const headers = new Headers();
  headers.set('x-apikey', process.env.DEPARTURE_BOARD_API_KEY!);

  // Get service details
  const response = await fetch(
    `https://api1.raildata.org.uk/1010-live-departure-board-dep/LDBWS/api/20220120/GetDepBoardWithDetails/${from}?numRows=10&filterCrs=${to}`,
    { headers },
  ).then((response) => response.json());

  // If no services
  if (!response.trainServices) {
    return Response.json([]);
  }

  // Parse data
  const services = response.trainServices.flatMap((serviceResponse: ServiceResponse) => {
    // Get index of arrival calling point data
    const arrivalDataIndex = serviceResponse.subsequentCallingPoints[0].callingPoint.findIndex(
      ({ crs }: { crs: string }) => crs === to,
    );

    // Skip service if destination station not found
    if (arrivalDataIndex === -1) {
      return [];
    }

    // Get data from calling point matching provided destination station
    const arrivalData: CallingPointResponse =
      serviceResponse.subsequentCallingPoints[0].callingPoint[arrivalDataIndex];

    return [
      {
        departureTime: serviceResponse.std,
        estimatedDepartureTime: serviceResponse.etd,
        platform: serviceResponse.platform,
        arrivalTime: arrivalData.st,
        estimatedArrivalTime: arrivalData.et,
        duration: getDuration(serviceResponse.std, arrivalData.st),
        numberOfStops: arrivalDataIndex + 1,
        serviceId: serviceResponse.serviceID,
      },
    ];
  });

  return Response.json({
    services,
    from,
    to,
  });
}
