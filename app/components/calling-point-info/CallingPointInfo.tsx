import { CallingPoint } from '@/app/interfaces';
import formatEstimated from '@/app/utils/formatEstimated';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import CallingPointGraphic from './CallingPointGraphic';

export default function CallingPointInfo({
  callingPoint,
  isFirstPoint,
  isLastPoint,
}: {
  callingPoint: CallingPoint;
  isFirstPoint?: boolean;
  isLastPoint?: boolean;
}) {
  return (
    <section className="flex items-center gap-2">
      {/* Graphic */}
      <CallingPointGraphic isFirstPoint={isFirstPoint} isLastPoint={isLastPoint} />
      {/* Details */}
      <section className="w-full pt-6">
        {/* Station and platform */}
        <p className={`text-lg ${callingPoint.focus ? 'font-bold' : 'font-medium'}`}>
          {callingPoint.station}{' '}
          {callingPoint.platform ? `(Platform ${callingPoint.platform})` : ''}
        </p>
        {/* Times */}
        <p className="flex gap-2">
          {/* Departure time */}
          {callingPoint.estimatedDepartureTime ? (
            callingPoint.departureTime
          ) : (
            <span className="text-gray-600">{callingPoint.departureTime} (Departed)</span>
          )}
          {/* Estimated time */}
          {callingPoint.estimatedDepartureTime && (
            <span
              className={`flex items-center gap-1 font-medium ${callingPoint.estimatedDepartureTime === 'On time' ? 'text-green-700' : 'text-red-800'}`}
            >
              {callingPoint.estimatedDepartureTime == 'Cancelled' && <AiOutlineExclamationCircle />}
              {formatEstimated(callingPoint.estimatedDepartureTime)}
            </span>
          )}
        </p>
      </section>
    </section>
  );
}
