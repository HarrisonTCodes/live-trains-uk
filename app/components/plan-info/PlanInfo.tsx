import { Leg } from '@/app/interfaces';
import LegInfo from './LegInfo';

export default function PlanInfo({ plan }: { plan: Leg[] }) {
  return (
    <div className="relative flex w-[90vw] max-w-[700px] flex-col rounded-lg border border-gray-300 bg-white px-2 pb-4">
      {plan.map((leg: Leg, index: number) => (
        <LegInfo
          key={`${leg.departure.crs} ${leg.departure.time} to ${leg.arrival.crs} ${leg.arrival.time}`}
          leg={leg}
          isFirstLeg={index === 0}
          isLastLeg={index === plan.length - 1}
        />
      ))}
    </div>
  );
}
