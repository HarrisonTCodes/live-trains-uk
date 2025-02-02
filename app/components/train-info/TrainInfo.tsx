import { Service } from '@/app/interfaces';
import formatDuration from '@/app/utils/formatDuration';
import { GiRabbit, GiTortoise } from 'react-icons/gi';
import toTitleCase from '@/app/utils/toTitleCase';
import formatEstimated from '@/app/utils/formatEstimated';
import Link from 'next/link';
import Tag from '../tag/Tag';
import { FaClock, FaLocationDot } from 'react-icons/fa6';
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
      className={`flex min-h-40 w-[90vw] max-w-[700px] cursor-pointer flex-col gap-2 divide-y rounded-lg border transition-all ${cancelled ? 'divide-red-700 border-red-700 bg-red-50' : 'divide-gray-300 border-gray-300 bg-white hover:bg-stone-100'}`}
      href={`/train/${service.serviceId}`}
      prefetch={false}
    >
      {/* From */}
      <section className="flex min-h-20 w-full flex-col gap-1 p-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="px-1 text-lg font-medium">{toTitleCase(fromStation)}</h2>
          <h2 className="px-1 text-lg font-medium">{service.departureTime}</h2>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex gap-2">
            <Tag status={cancelled ? 'fail' : 'neutral'}>{fromCrs}</Tag>
            {service.platform && (
              <Tag status={cancelled ? 'fail' : 'neutral'}>Platform {service.platform}</Tag>
            )}
          </div>
          {service.estimatedDepartureTime && (
            <Tag status={service.estimatedDepartureTime === 'On time' ? 'success' : 'fail'}>
              {service.estimatedDepartureTime === 'Cancelled' && <AiOutlineExclamationCircle />}
              {formatEstimated(service.estimatedDepartureTime)}
            </Tag>
          )}
        </div>
      </section>

      {/* To */}
      <section className="min-h-20 p-2">
        <div className="flex w-full justify-between">
          <h2 className="px-1 text-lg font-medium">{toTitleCase(toStation)}</h2>
          <h2 className="px-1 text-lg font-medium">{service.arrivalTime}</h2>
        </div>
        <div className="flex w-full justify-between">
          <Tag status={cancelled ? 'fail' : 'neutral'}>{toCrs}</Tag>
          {service.estimatedArrivalTime && (
            <Tag status={service.estimatedArrivalTime === 'On time' ? 'success' : 'fail'}>
              {service.estimatedArrivalTime === 'Cancelled' && <AiOutlineExclamationCircle />}
              {formatEstimated(service.estimatedArrivalTime)}
            </Tag>
          )}
        </div>
      </section>

      {/* Duration */}
      <section className="grid h-12 w-full grid-cols-3 grid-rows-1 py-2 pl-3 pr-2">
        <p className="flex items-center justify-start gap-1">
          <FaLocationDot className="text-stone-600" /> {service.numberOfStops} Stop
          {service.numberOfStops > 1 && 's'}
        </p>
        <p className="flex items-center justify-center gap-1">
          <FaClock className="text-stone-600" /> {formatDuration(service.duration)}
        </p>
        <span className="flex items-center justify-end">
          {fast ? (
            <Tag status="success">
              <GiRabbit /> Fast
            </Tag>
          ) : (
            <Tag status="fail">
              <GiTortoise /> Slow
            </Tag>
          )}
        </span>
      </section>
    </Link>
  );
}
