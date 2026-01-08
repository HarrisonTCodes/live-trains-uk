import { CallingPointResponse, ServiceResponse } from '../interfaces';
import getDuration from './getDuration';
import { stations } from './stations';

export default async function getServices(from: string, to?: string) {
  // Get query parameters
  const fromCrs = stations[from as keyof typeof stations];
  const toCrs = stations[to as keyof typeof stations];

  // If invalid or missing stations provided
  if (!fromCrs || (to && !toCrs)) {
    throw Error(`Invalid station(s) provided: '${from}' and '${to}'`);
  }

  // Set API key in headers
  const headers = new Headers();
  headers.set('x-apikey', process.env.LIVE_DEPARTURE_BOARD_API_KEY!);

  // Get service details
  const response = await fetch(
    `https://api1.raildata.org.uk/1010-live-departure-board-dep1_2/LDBWS/api/20220120/GetDepBoardWithDetails/${fromCrs}?numRows=10${toCrs && `&filterCrs=${toCrs}`}`,
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
