import getServices from '@/app/utils/getServices';
import TrainInfo from './TrainInfo';
import Notice from '../notice/Notice';
import toTitleCase from '@/app/utils/toTitleCase';
import { Service } from '@/app/interfaces';

export default async function TrainInfoSection({ from, to }: { from: string; to?: string }) {
  const services = await getServices(from, to);
  const averageDuration =
    services.services.reduce(
      (accumulator: number, service: Service) => accumulator + service.duration,
      0,
    ) / services.services.length;

  if (services.services.length > 0) {
    return services.services.map((service: Service) => (
      <TrainInfo
        key={service.serviceId}
        service={service}
        fromStation={from}
        fromCrs={services.fromCrs}
        toStation={service.arrivalStation}
        toCrs={service.arrivalCrs}
        averageDuration={averageDuration}
      />
    ));
  } else {
    return (
      <Notice
        notice="No services"
        description={
          to
            ? `There are currently no direct services running between ${toTitleCase(from)} and ${toTitleCase(to)}.`
            : `There are currently no departures running from ${toTitleCase(from)}`
        }
      />
    );
  }
}
