import { Service } from '@/app/interfaces';
import formatDuration from '@/app/utils/formatDuration';
import { GiRabbit, GiTortoise } from 'react-icons/gi';
import toTitleCase from '@/app/utils/toTitleCase';
import formatEstimated from '@/app/utils/formatEstimated';
import Link from 'next/link';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

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
  const cancelled =
    service.estimatedArrivalTime == 'Cancelled' || service.estimatedDepartureTime == 'Cancelled';

  return (
    <Link
      className={`flex min-h-40 w-[90vw] max-w-[700px] cursor-pointer flex-col gap-2 rounded-lg border p-2 transition-all ${cancelled ? 'border-red-700 bg-red-50' : 'border-gray-300 bg-white hover:bg-gray-100'}`}
      href={`/train/${service.serviceId}`}
      prefetch={false}
    >
      {/* From */}
      <section>
        <h2 className="text-xl font-medium">
          {toTitleCase(fromStation)} <span className="text-sm text-gray-500">({fromCrs})</span>
        </h2>
        <p className="flex items-center gap-1">
          {service.departureTime}
          {service.estimatedDepartureTime && ' | '}
          <span
            className={`flex items-center gap-1 font-medium ${service.estimatedDepartureTime === 'On time' ? 'text-green-700' : 'text-red-800'} `}
          >
            {service.estimatedDepartureTime == 'Cancelled' && <AiOutlineExclamationCircle />}{' '}
            {formatEstimated(service.estimatedDepartureTime)}
          </span>
          {service.platform && ` | Platform ${service.platform}`}
        </p>
      </section>
      {/* To */}
      <section>
        <h2 className="text-xl font-medium">
          {toTitleCase(toStation)} <span className="text-sm text-gray-500">({toCrs})</span>
        </h2>
        <p className="flex items-center gap-1">
          {service.arrivalTime}
          {service.estimatedArrivalTime && ' | '}
          <span
            className={`flex items-center gap-1 font-medium ${service.estimatedArrivalTime === 'On time' ? 'text-green-700' : 'text-red-800'} `}
          >
            {service.estimatedArrivalTime == 'Cancelled' && <AiOutlineExclamationCircle />}
            {formatEstimated(service.estimatedArrivalTime)}
          </span>
        </p>
      </section>
      {/* Duration */}
      <p className="flex text-lg">
        {service.numberOfStops} Stop{service.numberOfStops > 1 && 's'} |{' '}
        <span className="px-1 font-medium">{formatDuration(service.duration)}</span> |{' '}
        <span
          className={`flex items-center gap-1 pl-1 font-medium ${fast ? 'text-green-700' : 'text-red-800'}`}
        >
          {fast ? <GiRabbit /> : <GiTortoise />}
          {fast ? 'Fast' : 'Slow'}
        </span>
      </p>
    </Link>
  );
}
