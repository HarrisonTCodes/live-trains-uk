import { Leg } from '@/app/interfaces';
import formatDate from '@/app/utils/formatDate';
import CircleStepGraphic from '../graphics/CircleStepGraphic';

export default function LegInfo({
  leg,
  isFirstLeg,
  isLastLeg,
}: {
  leg: Leg;
  isFirstLeg: boolean;
  isLastLeg: boolean;
}) {
  return (
    <>
      <PlanStationInfo
        station={leg.departure.station}
        time={formatDate(leg.departure.time)}
        isFirstStation={isFirstLeg}
      />
      {isLastLeg && (
        <PlanStationInfo
          station={leg.arrival.station}
          time={formatDate(leg.arrival.time)}
          isLastStation={isLastLeg}
        />
      )}
    </>
  );
}

function PlanStationInfo({
  station,
  time,
  isFirstStation,
  isLastStation,
}: {
  station: string;
  time: string;
  isFirstStation?: boolean;
  isLastStation?: boolean;
}) {
  return (
    <section className="flex items-center gap-2">
      {/* Graphic */}
      <CircleStepGraphic isFirstStep={isFirstStation} isLastStep={isLastStation} />

      {/* Details */}
      <section className="flex h-24 w-full justify-between gap-2 pr-2 pt-9">
        {/* Station and platform */}
        <div className="flex flex-col gap-1">
          <p className={`pl-1 ${(isFirstStation || isLastStation) && 'font-bold'}`}>{station}</p>
        </div>

        {/* Times */}
        <div className="flex flex-col items-end gap-1">
          <p className={`pr-1 ${(isFirstStation || isLastStation) && 'font-bold'}`}>{time}</p>
        </div>
      </section>
    </section>
  );
}
