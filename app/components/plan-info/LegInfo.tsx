import { Leg } from '@/app/interfaces';
import formatDate from '@/app/utils/formatDate';
import CircleStepGraphic from '../graphics/CircleStepGraphic';
import Tag from '../tag/Tag';
import { FootprintsIcon, TrainFrontIcon, TrainFrontTunnelIcon } from 'lucide-react';

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
      <PlanStationInfo leg={leg} isFirstStation={isFirstLeg} />
      {isLastLeg && <PlanStationInfo leg={leg} isLastStation={isLastLeg} />}
    </>
  );
}

function PlanStationInfo({
  leg,
  isFirstStation,
  isLastStation,
}: {
  leg: Leg;
  isFirstStation?: boolean;
  isLastStation?: boolean;
}) {
  const time = isLastStation ? formatDate(leg.arrival.time) : formatDate(leg.departure.time);
  const station = isLastStation ? leg.arrival.station : leg.departure.station;
  if (leg.mode === 'underground') {
    console.log(leg.undergroundInfo);
  }

  return (
    <section className="flex items-center gap-2">
      {/* Graphic */}
      <CircleStepGraphic isFirstStep={isFirstStation} isLastStep={isLastStation} length={150} />

      {/* Details */}
      <section className="flex h-24 w-full flex-col gap-2 pr-2 pt-9">
        {/* Station */}
        <div className="flex w-full justify-between gap-4">
          <p className={`pl-1 ${(isFirstStation || isLastStation) && 'font-bold'}`}>{station}</p>
          <p
            className={`whitespace-nowrap pr-1 ${(isFirstStation || isLastStation) && 'font-bold'}`}
          >
            {time}
          </p>
        </div>

        {/* Detail tags */}
        <div className="flex gap-2">
          <section className="flex flex-wrap gap-2">
            <Tag>
              {leg.mode === 'train' ? (
                <>
                  <TrainFrontIcon size={16} /> Train
                </>
              ) : leg.mode === 'underground' ? (
                <>
                  <TrainFrontTunnelIcon size={16} /> Tube
                </>
              ) : (
                <>
                  <FootprintsIcon size={16} /> Walk
                </>
              )}
            </Tag>
            {leg.mode === 'underground' && leg.undergroundInfo?.line && (
              <Tag>{leg.undergroundInfo.line} Line</Tag>
            )}
            {leg.mode === 'underground' && leg.undergroundInfo?.direction && (
              <Tag>{leg.undergroundInfo.direction}</Tag>
            )}
          </section>
        </div>
      </section>
    </section>
  );
}
