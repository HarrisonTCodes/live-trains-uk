import { CallingPoint } from '@/app/interfaces';
import formatEstimated from '@/app/utils/formatEstimated';

export default function CallingPointInfo({ callingPoint }: { callingPoint: CallingPoint }) {
  return (
    <section className="flex items-center gap-2">
      {/* Circle */}
      <div className="z-10 my-10 h-[16px] w-[16px] rounded-full bg-blue-700" />
      {/* Details */}
      <section className="w-full">
        <p className={`text-lg ${callingPoint.focus ? 'font-bold' : 'font-medium'}`}>
          {callingPoint.station}{' '}
          {callingPoint.platform ? `(Platform ${callingPoint.platform})` : ''}
        </p>
        <p className="flex gap-2">
          {callingPoint.departureTime}
          {callingPoint.estimatedDepartureTime && (
            <span
              className={`font-medium ${callingPoint.estimatedDepartureTime === 'On time' ? 'text-green-700' : 'text-red-800'}`}
            >
              {formatEstimated(callingPoint.estimatedDepartureTime)}
            </span>
          )}
        </p>
      </section>
    </section>
  );
}
