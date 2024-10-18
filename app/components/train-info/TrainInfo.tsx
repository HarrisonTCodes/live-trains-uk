import { Service } from '@/app/interfaces';
import formatDuration from '@/app/utils/formatDuration';
import { GiRabbit, GiTortoise } from 'react-icons/gi';
import { useRouter } from 'next/navigation';

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
  const speed = service.duration <= averageDuration ? 'Fast' : 'Slow';
  const router = useRouter();

  return (
    <div
      className="flex w-11/12 max-w-[500px] cursor-pointer divide-x-2 divide-gray-300 rounded-xl border-2 border-gray-300"
      onClick={() => router.push(`/train/${service.serviceId}`)}
    >
      {/* Departure station */}
      <section className="flex w-1/3 flex-col items-center gap-1">
        <h2>
          {from} {service.platform ? `P${service.platform}` : ''}
        </h2>
        <p className="text-2xl">{service.departureTime}</p>
        <p
          className={`${service.estimatedDepartureTime === 'Cancelled' ? 'text-red-700' : 'text-gray-500'} ${service.estimatedDepartureTime === 'On time' ? 'font-normal' : 'font-medium'}`}
        >
          {service.estimatedDepartureTime}
        </p>
      </section>
      {/* Arrival station */}
      <section className="flex w-1/3 flex-col items-center gap-1">
        <h2>{to}</h2>
        <p className="text-2xl">{service.arrivalTime}</p>
        <p
          className={`${service.estimatedArrivalTime === 'Cancelled' ? 'text-red-700' : 'text-gray-500'} ${service.estimatedArrivalTime === 'On time' ? 'font-normal' : 'font-medium'}`}
        >
          {service.estimatedArrivalTime}
        </p>
      </section>
      {/* Duration */}
      <section className="flex w-1/3 flex-col items-center gap-1">
        <h2>DURATION</h2>
        <p className="text-2xl">{formatDuration(service.duration)}</p>
        <p
          className={`flex items-center gap-1 font-medium ${speed === 'Fast' ? 'text-green-700' : 'text-red-700'}`}
        >
          {speed === 'Fast' ? <GiRabbit /> : <GiTortoise />}
          {speed}
        </p>
      </section>
    </div>
  );
}
