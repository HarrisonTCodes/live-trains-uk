import { CallingPoint } from '@/app/interfaces';
import formatEstimated from '@/app/utils/formatEstimated';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

export default function CallingPointInfo({ callingPoint }: { callingPoint: CallingPoint }) {
  return (
    <section className="flex items-center gap-2">
      {/* Graphic */}
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" width="6" height="40" fill="#1e40af" />
        <circle cx="12" cy="50" y="30" r="8" stroke="#1e40af" stroke-width="4" fill="none" />
        <rect x="9" y="60" width="6" height="40" fill="#1e40af" />
      </svg>
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
