import { CallingPoint } from '@/app/interfaces';
import CallingPointGraphic from './CallingPointGraphic';
import Tag from '../tag/Tag';
import { CircleArrowRight, CircleCheckIcon } from 'lucide-react';
import EstimatedIcon from '../icon/EstimatedIcon';

export default function CallingPointInfo({
  callingPoint,
  isFirstPoint,
  isLastPoint,
  departed,
}: {
  callingPoint: CallingPoint;
  isFirstPoint?: boolean;
  isLastPoint?: boolean;
  departed?: boolean;
}) {
  return (
    <section className="flex items-center gap-2">
      {/* Graphic */}
      <CallingPointGraphic
        isFirstPoint={isFirstPoint}
        isLastPoint={isLastPoint}
        departed={departed}
      />

      {/* Details */}
      <section className="flex h-24 w-full justify-between gap-1 pr-2 pt-9">
        {/* Station and platform */}
        <div className="flex flex-col gap-1">
          <p
            className={`pl-1 ${callingPoint.focus && 'font-bold'} ${departed && 'text-stone-600'}`}
          >
            {callingPoint.station}
          </p>
          {callingPoint.platform && <Tag>Platform {callingPoint.platform}</Tag>}
        </div>

        {/* Times */}
        <div className="flex flex-col items-end gap-1">
          <p
            className={`pr-1 ${callingPoint.focus && 'font-bold'} ${departed && 'text-stone-600'}`}
          >
            {callingPoint.departureTime}
          </p>
          {departed ? (
            <Tag>
              <CircleArrowRight size={16} className="text-stone-600" /> Departed
            </Tag>
          ) : (
            <Tag status={callingPoint.estimatedDepartureTime === 'On time' ? 'success' : 'fail'}>
              <EstimatedIcon estimated={callingPoint.estimatedDepartureTime} />
              {callingPoint.estimatedDepartureTime}
            </Tag>
          )}
        </div>
      </section>
    </section>
  );
}
