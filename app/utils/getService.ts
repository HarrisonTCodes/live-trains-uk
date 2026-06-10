import axios from 'axios';
import { CallingPointResponse } from '@/app/types/api';
import { ServiceDetails } from '@/app/types/app';

export default async function getService(
  serviceId: string,
  toStation?: string,
): Promise<ServiceDetails> {
  // Get service details
  const paddedSeviceId = serviceId.padEnd(15, '_');
  const response = await axios
    .get(`${process.env.SERVICE_DETAILS_BASE_URL}/${paddedSeviceId}`, {
      headers: {
        'x-apikey': process.env.SERVICE_DETAILS_API_KEY!,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error({
        event: 'error_getting_service_details',
        serviceId: paddedSeviceId,
        error: err,
      });

      throw err;
    });

  // If the response has a Message attribute, something has necessarily gone wrong
  if (response.Message) {
    throw Error('Service not found');
  }

  // If the response has a fault attribute, something has necessarily gone fatally wrong
  if (response.fault) {
    console.error({
      event: 'fault_getting_service_details',
      serviceId: paddedSeviceId,
      fault: response.fault,
    });

    throw Error('Failed to access service details API');
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
        focus: callingPoint.locationName.toLowerCase() === toStation?.toLowerCase(),
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
  };
}
