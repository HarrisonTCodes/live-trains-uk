import axios from 'axios';
import type { Services } from '../types/app';
import type { CallingPointResponse, ServiceResponse } from '../types/api';
import getDuration from './getDuration';
import { stations } from './stations';

export default async function getServices(from: string, to?: string): Promise<Services> {
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
