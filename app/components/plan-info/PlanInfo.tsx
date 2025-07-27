import { Leg } from '@/app/interfaces';

export default function PlanInfo({ plan }: { plan: Leg[] }) {
  return (
    <div>
      {plan.map((leg: Leg) => (
        <p
          key={`${leg.departure.crs} ${leg.departure.time} to ${leg.arrival.crs} ${leg.arrival.time}`}
        >
          {JSON.stringify(leg)}
        </p>
      ))}
    </div>
  );
}
