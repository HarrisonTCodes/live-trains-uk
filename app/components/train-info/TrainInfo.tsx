import { Service } from '@/app/interfaces';
import formatDuration from '@/app/utils/formatDuration';
import { GiRabbit, GiTortoise } from 'react-icons/gi';
import { useRouter } from 'next/navigation';
import toTitleCase from '@/app/utils/toTitleCase';
import formatEstimated from '@/app/utils/formatEstimated';

export default function TrainInfo({
  service,
  fromStation,
  fromCrs,
  toStation,
  toCrs,
  averageDuration,
}: {
  service: Service;
  fromStation: string;
  fromCrs: string;
  toStation: string;
  toCrs: string;
  averageDuration: number;
}) {
  const fast = service.duration <= averageDuration;
  const router = useRouter();

  return (
    <div
      className="flex min-h-40 w-[90vw] max-w-[700px] cursor-pointer flex-col gap-2 rounded-xl border-2 border-gray-300 bg-white p-2 transition-all hover:bg-gray-100"
      onClick={() => router.push(`/train/${service.serviceId}`)}
    >
      {/* From */}
      <section>
        <h2 className="text-xl font-medium">
          {toTitleCase(fromStation)} <span className="text-sm text-gray-500">({fromCrs})</span>
        </h2>
        <p>
          {service.departureTime}
          {service.estimatedDepartureTime ? ' | ' : ''}
          <span
            className={`font-medium ${service.estimatedDepartureTime === 'On time' ? 'text-green-700' : 'text-red-800'} `}
          >
            {formatEstimated(service.estimatedDepartureTime)}
          </span>
          {service.platform ? ` | Platform ${service.platform}` : ''}
        </p>
      </section>
      {/* To */}
      <section>
        <h2 className="text-xl font-medium">
          {toTitleCase(toStation)} <span className="text-sm text-gray-500">({toCrs})</span>
        </h2>
        <p>
          {service.arrivalTime}
          {service.estimatedArrivalTime ? ' | ' : ''}
          <span
            className={`font-medium ${service.estimatedArrivalTime === 'On time' ? 'text-green-700' : 'text-red-800'} `}
          >
            {formatEstimated(service.estimatedArrivalTime)}
          </span>
        </p>
      </section>
      {/* Duration */}
      <p className="flex text-lg">
        {service.numberOfStops} Stop{service.numberOfStops > 1 ? 's' : ''} |{' '}
        <span className="px-1 font-medium">{formatDuration(service.duration)}</span> |{' '}
        <span
          className={`flex items-center gap-1 pl-1 font-medium ${fast ? 'text-green-700' : 'text-red-800'}`}
        >
          {fast ? <GiRabbit /> : <GiTortoise />}
          {fast ? 'Fast' : 'Slow'}
        </span>
      </p>
    </div>
  );
}
