import { CallingPointResponse } from '@/app/interfaces';

export default async function GET(serviceId: string) {
  // Set API key in headers
  const headers = new Headers();
  headers.set('x-apikey', process.env.SERVICE_DETAILS_API_KEY!);

  // Get service details
  const response = await fetch(
    `https://api1.raildata.org.uk/1010-service-details/LDBWS/api/20220120/GetServiceDetails/${serviceId}`,
    { headers, cache: 'no-store' },
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  // If the response has a message attribute, something has necessarily gone wrong
  if (response.Message) {
    throw Error('Service not found');
  }

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
      departureTime: response.std ?? response.sta,
      estimatedDepartureTime: response.etd ?? response.eta,
      cancelReason: response.cancelReason,
      platform: response.platform,
      focus: true,
    },
    ...subsequentCallingPoints,
  ];

  return callingPoints;
}
