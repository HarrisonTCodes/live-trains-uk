import { Service } from '@/app/interfaces';
import formatDuration from '@/app/utils/formatDuration';
import toTitleCase from '@/app/utils/toTitleCase';
import formatEstimated from '@/app/utils/formatEstimated';
import Link from 'next/link';
import Tag from '../tag/Tag';
import { CircleAlertIcon, ClockIcon, MapPinIcon, RabbitIcon, TurtleIcon } from 'lucide-react';

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
      href={`/train/${service.serviceId}?to=${toStation}`}
      prefetch={false}
    >
      {/* From */}
      <section className="flex min-h-20 w-full flex-col gap-1 p-2">
        <div className="flex w-full justify-between">
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
              {service.estimatedDepartureTime === 'Cancelled' && <CircleAlertIcon size={16} />}
              {formatEstimated(service.estimatedDepartureTime)}
            </Tag>
          )}
        </div>
      </section>

      {/* To */}
      <section className="flex min-h-20 w-full flex-col gap-1 p-2">
        <div className="flex w-full justify-between">
          <h2 className="px-1 text-lg font-medium">{toTitleCase(toStation)}</h2>
          <h2 className="px-1 text-lg font-medium">{service.arrivalTime}</h2>
        </div>
        <div className="flex w-full justify-between">
          <Tag status={cancelled ? 'fail' : 'neutral'}>{toCrs}</Tag>
          {service.estimatedArrivalTime && (
            <Tag status={service.estimatedArrivalTime === 'On time' ? 'success' : 'fail'}>
              {service.estimatedArrivalTime === 'Cancelled' && <CircleAlertIcon size={16} />}
              {formatEstimated(service.estimatedArrivalTime)}
            </Tag>
          )}
        </div>
      </section>

      {/* Duration */}
      <section className="grid h-12 w-full grid-cols-3 grid-rows-1 py-2 pl-3 pr-2">
        <p className="flex items-center justify-start gap-1">
          <MapPinIcon className="text-stone-600" /> {service.numberOfStops} Stop
          {service.numberOfStops > 1 && 's'}
        </p>
        <p className="flex items-center justify-center gap-1">
          <ClockIcon className="text-stone-600" /> {formatDuration(service.duration)}
        </p>
        <span className="flex items-center justify-end">
          {fast ? (
            <Tag status="success">
              <RabbitIcon size={16} /> Fast
            </Tag>
          ) : (
            <Tag status="fail">
              <TurtleIcon size={16} /> Slow
            </Tag>
          )}
        </span>
      </section>
    </Link>
  );
}
