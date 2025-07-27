import { Leg } from '@/app/interfaces';
import LegInfo from './LegInfo';

export default function PlanInfo({ plan }: { plan: Leg[] }) {
  return (
    <div className="flex w-[90vw] max-w-[700px] flex-col gap-2 divide-y divide-gray-300 rounded-lg border border-gray-300 bg-white">
      {plan.map((leg: Leg) => (
        <LegInfo
          key={`${leg.departure.crs} ${leg.departure.time} to ${leg.arrival.crs} ${leg.arrival.time}`}
          leg={leg}
        />
      ))}
    </div>
  );
}
