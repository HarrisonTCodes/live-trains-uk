import { Service } from '@/app/interfaces';

export default function TrainInfo({
  service,
  from,
  to,
}: {
  service: Service;
  from: string;
  to: string;
}) {
  return (
    <div className="flex w-11/12 max-w-[500px] divide-x-2 rounded-xl border-2 border-gray-300">
      <section className="flex w-1/3 flex-col items-center">
        <h2>{from}</h2>
        <p>{service.departureTime}</p>
        <p>{service.estimatedDepartureTime}</p>
      </section>
      <section className="flex w-1/3 flex-col items-center">
        <h2>{to}</h2>
        <p>{service.arrivalTime}</p>
        <p>{service.estimatedArrivalTime}</p>
      </section>
      <section className="flex w-1/3 flex-col items-center">
        <h2>DURATION</h2>
        <p>0m</p>
      </section>
    </div>
  );
}
