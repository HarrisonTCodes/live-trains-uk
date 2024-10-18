import { CallingPointResponse } from '@/app/interfaces';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const serviceId = params.id;

  // Set API key in headers
  const headers = new Headers();
  headers.set('x-apikey', process.env.SERVICE_DETAILS_API_KEY!);

  // Get service details
  const response = await fetch(
    `https://api1.raildata.org.uk/1010-service-details/LDBWS/api/20220120/GetServiceDetails/${serviceId}`,
    { headers },
  ).then((response) => response.json());

  // Get details on all calling points
  const previousCallingPointsResponse = response.previousCallingPoints
    ? response.previousCallingPoints[0].callingPoint
    : [];
  const subsequentCallingPointsResponse = response.subsequentCallingPoints
    ? response.subsequentCallingPoints[0].callingPoint
    : [];

  const previousCallingPoints = previousCallingPointsResponse.map(
    (callingPoint: CallingPointResponse) => {
      return {
        station: callingPoint.locationName,
        departureTime: callingPoint.st,
        estimatedDepartureTime: callingPoint.et,
        cancelReason: callingPoint.cancelReason,
      };
    },
  );

  const subsequentCallingPoints = subsequentCallingPointsResponse.map(
    (callingPoint: CallingPointResponse) => {
      return {
        station: callingPoint.locationName,
        departureTime: callingPoint.st,
        estimatedDepartureTime: callingPoint.et,
        cancelReason: callingPoint.cancelReason,
      };
    },
  );

  // Create array of all calling points, in order
  const callingPoints = [
    ...previousCallingPoints,
    {
      station: response.locationName,
      departureTime: response.std,
      estimatedDepartureTime: response.etd,
      cancelReason: response.cancelReason,
      platform: response.platform,
    },
    ...subsequentCallingPoints,
  ];

  return Response.json(callingPoints);
}
