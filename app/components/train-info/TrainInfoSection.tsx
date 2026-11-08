import getServices from '@/app/utils/getServices';
import TrainInfo from './TrainInfo';
import Notice from '../notice/Notice';
import toTitleCase from '@/app/utils/toTitleCase';
import type { Service } from '@/app/types/app';
import getNextFastest from '@/app/utils/getNextFastest';
import Link from 'next/link';

export default async function TrainInfoSection({ from, to }: { from: string; to?: string }) {
  const services = await getServices(from, to);
  const servicesByDestination = services.services.reduce((groups, service) => {
    const group = groups.get(service.arrivalCrs) ?? [];
    group.push(service);
    groups.set(service.arrivalCrs, group);
    return groups;
  }, new Map<string, Service[]>());
  const destinationStats = new Map(
    [...servicesByDestination].map(([crs, destinationServices]) => {
      const durations = destinationServices.map(({ duration }) => duration);
      const averageDuration =
        durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
      const hasDurationVariance = durations.some((duration) => duration !== durations[0]);
      return [crs, { averageDuration, hasDurationVariance }];
    }),
  );
  const nextFastestIndex = to && getNextFastest(services.services);

  if (services.services.length > 0) {
    return services.services.map((service: Service, i: number) => {
      const { averageDuration, hasDurationVariance } = destinationStats.get(service.arrivalCrs)!;
      return (
        <TrainInfo
          key={service.serviceId}
          service={service}
          fromStation={from}
          fromCrs={services.fromCrs}
          toStation={service.arrivalStation}
          toCrs={service.arrivalCrs}
          averageDuration={averageDuration}
          hasDurationVariance={hasDurationVariance}
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
