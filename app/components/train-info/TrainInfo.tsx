import { Service } from '@/app/interfaces';

function getDuration(departureTime: string, arrivalTime: string) {
  // Parse numbers from time strings
  const [departureHours, departureMinutes] = departureTime
    .split(':')
    .map((number) => parseInt(number));
  const [arrivalHours, arrivalMinutes] = arrivalTime.split(':').map((number) => parseInt(number));

  // Create dates for finding difference
  const departureDate = new Date(0, 0, 0, departureHours, departureMinutes);
  const arrivalDate = new Date(
    0,
    0,
    // Check if the times span across 2 days
    arrivalHours < departureHours ||
    (arrivalHours === departureHours && arrivalMinutes < departureMinutes)
      ? 1
      : 0,
    arrivalHours,
    arrivalMinutes,
  );

  const difference = (arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60); // Convert milliseconds to minutes
  return difference;
}

function formatDuration(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours > 0 ? hours.toString() + 'h ' : ''}${minutes > 0 ? minutes.toString() + 'm' : ''}`;
}

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
        <p className="text-2xl">{service.departureTime}</p>
        <p>{service.estimatedDepartureTime}</p>
      </section>
      <section className="flex w-1/3 flex-col items-center">
        <h2>{to}</h2>
        <p className="text-2xl">{service.arrivalTime}</p>
        <p>{service.estimatedArrivalTime}</p>
      </section>
      <section className="flex w-1/3 flex-col items-center">
        <h2>DURATION</h2>
        <p className="text-2xl">
          {formatDuration(getDuration(service.departureTime, service.arrivalTime))}
        </p>
      </section>
    </div>
  );
}
