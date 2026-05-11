import { Leg } from '@/app/interfaces';
import formatDate from '@/app/utils/formatDate';
import toTitleCase from '@/app/utils/toTitleCase';
import { TrainFrontIcon, TrainFrontTunnelIcon } from 'lucide-react';
import CallingPointGraphic from '../calling-point-info/CallingPointGraphic';

export default function LegInfo({
  leg,
  isFirstLeg,
  isLastLeg,
}: {
  leg: Leg;
  isFirstLeg: boolean;
  isLastLeg: boolean;
}) {
  const departureTimeString = formatDate(leg.departure.time);
  const arrivalTimeString = formatDate(leg.arrival.time);

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
      {/* TODO: GENERALISE THIS */}
      <CallingPointGraphic
        isFirstPoint={isFirstStation}
        isLastPoint={isLastStation}
        departed={false}
      />

      {/* Details */}
      <section className="flex h-24 w-full justify-between gap-1 pr-2 pt-9">
        {/* Station and platform */}
        <div className="flex flex-col gap-1">
          <p className={`pl-1 ${(isFirstStation || isLastStation) && 'font-bold'}`}>{station}</p>
          {/* {callingPoint.platform && <Tag>Platform {callingPoint.platform}</Tag>} */}
        </div>

        {/* Times */}
        <div className="flex flex-col items-end gap-1">
          <p className={`pr-1 ${(isFirstStation || isLastStation) && 'font-bold'}`}>{time}</p>
        </div>
      </section>
    </section>
  );
}
