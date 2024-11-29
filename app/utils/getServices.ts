import { CallingPointResponse, ServiceResponse } from '../interfaces';
import getDuration from './getDuration';
import getTime from './getTime';
import stations from './stations';

export default async function getServices(from: string, to: string) {
  // Get query parameters
  const fromCrs = stations[from as keyof typeof stations];
  const toCrs = stations[to as keyof typeof stations];

  // If invalid or missing stations provided
  if (!fromCrs || !toCrs) {
    throw Error(`Invalid station(s) provided: '${from}' and '${to}'`);
  }

  // Set API key in headers
  const headers = new Headers();
  headers.set('x-apikey', process.env.DEPARTURE_BOARD_API_KEY!);

  // Get service details
  const time = getTime();
  const response = await fetch(
    `https://api1.raildata.org.uk/1010-live-departure-board-dep/LDBWS/api/20220120/GetDepBoardWithDetails/${fromCrs}?numRows=10&filterCrs=${toCrs}`,
    { headers, cache: 'no-store' },
  ).then((response) => response.json());

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
    // Get index of arrival calling point data
    const arrivalDataIndex = serviceResponse.subsequentCallingPoints[0].callingPoint.findIndex(
      ({ crs }: { crs: string }) => crs === toCrs,
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

  return {
    services,
    fromCrs,
    toCrs,
    time,
  };
}
