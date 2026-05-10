import { Leg } from '@/app/interfaces';
import formatDate from '@/app/utils/formatDate';
import toTitleCase from '@/app/utils/toTitleCase';
import { TrainFrontIcon, TrainFrontTunnelIcon } from 'lucide-react';

export default function LegInfo({ leg }: { leg: Leg }) {
  const departureTimeString = formatDate(leg.departure.time);
  const arrivalTimeString = formatDate(leg.arrival.time);

  return (
    <section className="p-2">
      {/* Mode */}
      <h2 className="flex items-center gap-1 text-lg text-stone-600">
        {leg.mode === 'train' ? (
          <>
            <TrainFrontIcon /> Train
          </>
        ) : (
          <>
            <TrainFrontTunnelIcon /> Tube{' '}
            {leg.undergroundInfo
              ? `(${leg.undergroundInfo.line} Line, ${leg.undergroundInfo.direction})`
              : ''}
          </>
        )}
      </h2>

      {/* Departure */}
      <section className="flex justify-between">
        <p className="text-lg font-medium">{toTitleCase(leg.departure.station)}</p>
        <p className="text-lg font-medium">{departureTimeString}</p>
      </section>

      {/* Arrival */}
      <section className="flex justify-between">
        <p className="text-lg font-medium">{toTitleCase(leg.arrival.station)}</p>
        <p className="text-lg font-medium">{arrivalTimeString}</p>
      </section>
    </section>
  );
}
