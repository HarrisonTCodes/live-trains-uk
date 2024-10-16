import { Service } from '@/app/interfaces';
import formatDuration from '@/app/utils/formatDuration';

export default function TrainInfo({
  service,
  from,
  to,
  averageDuration,
}: {
  service: Service;
  from: string;
  to: string;
  averageDuration: number;
}) {
  return (
    <div className="flex w-11/12 max-w-[500px] divide-x-2 rounded-xl border-2 border-gray-300">
      <section className="flex w-1/3 flex-col items-center gap-1">
        <h2>
          {from} {service.platform ? `P${service.platform}` : ''}
        </h2>
        <p className="text-2xl">{service.departureTime}</p>
        <p className="text-gray-500">{service.estimatedDepartureTime}</p>
      </section>
      <section className="flex w-1/3 flex-col items-center gap-1">
        <h2>{to}</h2>
        <p className="text-2xl">{service.arrivalTime}</p>
        <p className="text-gray-500">{service.estimatedArrivalTime}</p>
      </section>
      <section className="flex w-1/3 flex-col items-center gap-1">
        <h2>DURATION</h2>
        <p className="text-2xl">{formatDuration(service.duration)}</p>
        <p className="text-gray-500">{service.duration <= averageDuration ? 'Fast' : 'Slow'}</p>
      </section>
    </div>
  );
}
