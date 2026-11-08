import type { DestinationStats, Service } from '../types/app';

export default function getDestinationStats(services: Service[]): Map<string, DestinationStats> {
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
