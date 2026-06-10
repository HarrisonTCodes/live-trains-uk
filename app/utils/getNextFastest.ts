import { Service } from '../types/app';

function serialiseTime(time: string, day: number) {
  return parseInt(time.split(':').join('')) + day * 2400;
}

export default function getNextFastest(services: Service[]): number {
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
