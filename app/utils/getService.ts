import { CallingPointResponse } from '@/app/interfaces';
import getTime from './getTime';

export default async function getService(serviceId: string) {
  // Set API key in headers
  const headers = new Headers();
  headers.set('x-apikey', process.env.SERVICE_DETAILS_API_KEY!);

  // Get service details
  const time = getTime();
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

  // Initialise array to store reasons calling points are cancelled
  const cancelReasons: string[] = [];

  // Get details on all calling points
  const previousCallingPointsResponse = response.previousCallingPoints
    ? response.previousCallingPoints[0].callingPoint
    : [];
  const subsequentCallingPointsResponse = response.subsequentCallingPoints
    ? response.subsequentCallingPoints[0].callingPoint
    : [];

  const previousCallingPoints = previousCallingPointsResponse.map(
    (callingPoint: CallingPointResponse) => {
      if (callingPoint.cancelReason && !cancelReasons.includes(callingPoint.cancelReason)) {
        cancelReasons.push(callingPoint.cancelReason);
      }

      return {
        station: callingPoint.locationName,
        departureTime: callingPoint.st,
        estimatedDepartureTime: callingPoint.et,
      };
    },
  );

  const subsequentCallingPoints = subsequentCallingPointsResponse.map(
    (callingPoint: CallingPointResponse) => {
      if (callingPoint.cancelReason && !cancelReasons.includes(callingPoint.cancelReason)) {
        cancelReasons.push(callingPoint.cancelReason);
      }

      return {
        station: callingPoint.locationName,
        departureTime: callingPoint.st,
        estimatedDepartureTime: callingPoint.et,
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
      platform: response.platform,
      focus: true,
    },
    ...subsequentCallingPoints,
  ];

  // Add cancel reason of focussed calling point, if it exists and isn't duplicate
  if (response.cancelReason && !cancelReasons.includes(response.cancelReason)) {
    cancelReasons.push(response.cancelReason);
  }

  return {
    callingPoints,
    cancelReasons,
    time,
  };
}
