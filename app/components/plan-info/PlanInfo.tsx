import { Leg, Plan } from '@/app/interfaces';
import LegInfo from './LegInfo';
import { ClockIcon, MapPinIcon, MapPinCheckIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function PlanInfo({ plan }: { plan: Plan }) {
  return (
    <div className="relative flex w-[90vw] max-w-[700px] flex-col divide-y divide-gray-300 rounded-lg border border-gray-300 bg-white px-2 pb-4">
      {/* Plan legs */}
      <section>
        {plan.legs.map((leg: Leg, index: number) => (
          <LegInfo
            key={`${leg.departure.crs} ${leg.departure.time} to ${leg.arrival.crs} ${leg.arrival.time}`}
            leg={leg}
            isFirstLeg={index === 0}
            isLastLeg={index === plan.legs.length - 1}
          />
        ))}
      </section>

      {/* Plan summary */}
      <section className="grid h-12 w-full grid-cols-3 grid-rows-1 px-1 pb-2 pt-6">
        <p className="flex items-center justify-start gap-1">
          <MapPinIcon className="text-stone-600" /> {plan.legs.length} Leg
          {plan.legs.length > 1 && 's'}
        </p>
        <p className="flex items-center justify-center gap-1">
          <ClockIcon className="text-stone-600" /> {plan.duration}
        </p>
        <p className="flex items-center justify-end gap-1">
          <MapPinCheckIcon className="text-stone-600" />{' '}
          {format(plan.legs[plan.legs.length - 1].arrival.time, 'HH:mm')}
        </p>
      </section>
    </div>
  );
}
