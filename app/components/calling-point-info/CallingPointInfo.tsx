import { CallingPoint } from '@/app/interfaces';
import formatEstimated from '@/app/utils/formatEstimated';

export default function CallingPointInfo({ callingPoint }: { callingPoint: CallingPoint }) {
  return (
    <section className="flex items-center gap-2">
      {/* Circle */}
      <div className="z-10 my-10 h-[16px] w-[16px] rounded-full bg-blue-700" />
      {/* Details */}
      <section className="w-full">
        <p className={`text-lg ${callingPoint.focus ? 'font-bold' : ''}`}>{callingPoint.station}</p>
        <p>
          {callingPoint.departureTime}
          {callingPoint.estimatedDepartureTime && (
            <span
              className={
                callingPoint.estimatedDepartureTime === 'Cancelled'
                  ? 'font-medium text-red-700'
                  : 'text-gray-600'
              }
            >
              {formatEstimated(callingPoint.estimatedDepartureTime)}
            </span>
          )}
        </p>
      </section>
    </section>
  );
}
