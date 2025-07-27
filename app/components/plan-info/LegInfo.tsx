import { Leg } from '@/app/interfaces';
import toTitleCase from '@/app/utils/toTitleCase';
import { TrainFrontIcon, TrainFrontTunnelIcon } from 'lucide-react';

export default function LegInfo({ leg }: { leg: Leg }) {
  const departureDate = new Date(leg.departure.time);
  const departureTimeString = `${departureDate.getDate().toString()} ${departureDate.toLocaleString('en-GB', { month: 'long' })}, ${departureDate.getHours().toString().padStart(2, '0')}:${departureDate.getMinutes().toString().padStart(2, '0')}`;
  const arrivalDate = new Date(leg.arrival.time);
  const arrivalTimeString = `${arrivalDate.getDate().toString()} ${arrivalDate.toLocaleString('en-GB', { month: 'long' })}, ${arrivalDate.getHours().toString().padStart(2, '0')}:${arrivalDate.getMinutes().toString().padStart(2, '0')}`;

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
            <TrainFrontTunnelIcon /> Tube
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
