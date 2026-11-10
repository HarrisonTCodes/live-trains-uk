import { getServices } from '@/app/utils/services';
import TrainInfo from './TrainInfo';
import Notice from '../notice/Notice';
import { toTitleCase } from '@/app/utils/stations';
import { getDestinationStats } from '@/app/utils/services';
import { getNextFastest } from '@/app/utils/services';
import Link from 'next/link';
import type { Service } from '@/app/types/app';

export default async function TrainInfoSection({ from, to }: { from: string; to?: string }) {
  const services = await getServices(from, to);
  const destinationStats = getDestinationStats(services.services);
  const nextFastestIndex = to && getNextFastest(services.services);

  if (services.services.length > 0) {
    return services.services.map((service: Service, i: number) => {
      return (
        <TrainInfo
          key={service.serviceId}
          service={service}
          fromStation={from}
          fromCrs={services.fromCrs}
          toStation={service.arrivalStation}
          toCrs={service.arrivalCrs}
          destinationStats={destinationStats.get(service.arrivalCrs)!}
          nextFastest={i === nextFastestIndex}
        />
      );
    });
  } else {
    return (
      <Notice notice="No services">
        {to ? (
          <>
            There are currently no direct services running between {toTitleCase(from)} and{' '}
            {toTitleCase(to)}. You can try{' '}
            <Link
              className="text-blue-900 underline"
              href={`/plans/${toTitleCase(from)}/${toTitleCase(to)}`}
            >
              planning a journey
            </Link>{' '}
            instead.
          </>
        ) : (
          `There are currently no departures running from ${toTitleCase(from)}`
        )}
      </Notice>
    );
  }
}
