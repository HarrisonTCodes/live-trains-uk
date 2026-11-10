import axios from 'axios';
import type { Services, Service, DestinationStats, ServiceDetails } from '../types/app';
import type { CallingPointResponse, ServiceResponse } from '../types/api';
import { stations } from './stations';
import { getDuration } from './time';

export function getDestinationStats(services: Service[]): Map<string, DestinationStats> {
  const servicesByDestination = services.reduce((groups, service) => {
    const group = groups.get(service.arrivalCrs) ?? [];
    group.push(service);
    groups.set(service.arrivalCrs, group);
    return groups;
  }, new Map<string, Service[]>());

  return new Map(
    [...servicesByDestination].map(([crs, destinationServices]) => {
      const durations = destinationServices.map(({ duration }) => duration);
      const averageDuration =
        durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
      const hasDurationVariance = durations.some((duration) => duration !== durations[0]);

      return [crs, { averageDuration, hasDurationVariance }];
    }),
  );
}

function serialiseTime(time: string, day: number) {
  return parseInt(time.split(':').join('')) + day * 2400;
}

export function getNextFastest(services: Service[]): number {
  let day = 0;
  const serialisedArrivals: number[] = [];

  // Return no next fastest (-1) if no services or all cancelled
  if (
    services.length === 0 ||
    services.every(
      (service: Service) =>
        service.estimatedDepartureTime === 'Cancelled' ||
        service.estimatedArrivalTime === 'Cancelled',
    )
  ) {
    return -1;
  }

  for (let i = 0; i < services.length; i++) {
    const service = services[i];

    const arrivalTime =
      service.estimatedArrivalTime && service.estimatedArrivalTime !== 'On time'
        ? service.estimatedArrivalTime
        : service.arrivalTime;

    // If service cancelled, don't consider as next fastest candidate
    if (arrivalTime === 'Cancelled' || service.estimatedDepartureTime === 'Cancelled') {
      serialisedArrivals.push(Infinity);
      continue;
    }

    let serialisedDeparture = serialiseTime(service.departureTime, day);
    if (i > 0) {
      const previousSerialisedDeparture = serialiseTime(services[i - 1].departureTime, day);

      // If departure time is "earlier" than previous, day has changed
      if (serialisedDeparture < previousSerialisedDeparture) {
        day++;
        serialisedDeparture += 2400;
      }
    }

    let serialisedArrival = serialiseTime(arrivalTime, day);
    // If arrival time is less than departure time, service crosses day boundary
    if (serialisedArrival < serialisedDeparture) {
      serialisedArrival += 2400;
    }

    serialisedArrivals.push(serialisedArrival);
  }

  return serialisedArrivals.reduce(
    (minIndex, serialisedTime, i) => (serialisedTime < serialisedArrivals[minIndex] ? i : minIndex),
    0,
  );
}

export async function getServices(from: string, to?: string): Promise<Services> {
  // Get query parameters
  const fromCrs = stations[from as keyof typeof stations];
  const toCrs = stations[to as keyof typeof stations];

  // If invalid or missing stations provided
  if (!fromCrs) {
    throw Error(`Invalid 'from' station provided: '${from}'`);
  }
  if (to && !toCrs) {
    throw Error(`Invalid 'to' station provided: '${to}'`);
  }

  // Get service details
  const response = await axios
    .get(`${process.env.LIVE_DEPARTURE_BOARD_BASE_URL}/${fromCrs}`, {
      headers: {
        'x-apikey': process.env.LIVE_DEPARTURE_BOARD_API_KEY!,
      },
      params: {
        numRows: 10,
        filterCrs: toCrs,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error({
        event: 'error_getting_services',
        fromCrs,
        toCrs,
        error: err,
      });

      throw err;
    });

  // If the response has a fault attribute, something has necessarily gone fatally wrong
  if (response.fault) {
    console.error({
      event: 'fault_getting_services',
      fromCrs,
      toCrs,
      fault: response.fault,
    });

    throw Error('Failed to access departure board API');
  }

  // If no services
  if (!response.trainServices) {
    return {
      services: [],
      fromCrs,
      toCrs,
    };
  }

  // Parse data
  const services = response.trainServices.flatMap((serviceResponse: ServiceResponse) => {
    // Skip service if no subsequent calling points
    if (!serviceResponse.subsequentCallingPoints) {
      return [];
    }

    // Get index of arrival calling point data (or terminating station if not provided)
    let arrivalDataIndex;
    if (to) {
      arrivalDataIndex = serviceResponse.subsequentCallingPoints[0].callingPoint.findIndex(
        ({ crs }: { crs: string }) => crs === toCrs,
      );
    } else {
      arrivalDataIndex = serviceResponse.subsequentCallingPoints[0].callingPoint.length - 1;
    }

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
        arrivalCrs: arrivalData.crs,
        arrivalStation: arrivalData.locationName,
        duration: getDuration(serviceResponse.std, arrivalData.st),
        numberOfStops: arrivalDataIndex + 1,
        serviceId: serviceResponse.serviceID,
      },
    ];
  });

  return {
    services,
    fromCrs,
  };
}

const SERVICE_ID_LENGTH = 16;

export async function getService(serviceId: string, toStation?: string): Promise<ServiceDetails> {
  // Get service details
  const paddedSeviceId = serviceId.padEnd(SERVICE_ID_LENGTH, '_');
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
