import { Leg } from '@/app/interfaces';
import CircleStepGraphic from '../graphics/CircleStepGraphic';
import Tag from '../tag/Tag';
import {
  ArrowRightLeftIcon,
  BikeIcon,
  BusIcon,
  CableCarIcon,
  FootprintsIcon,
  TrainFrontIcon,
  TrainFrontTunnelIcon,
  TrainTrackIcon,
  TramFrontIcon,
  WavesIcon,
} from 'lucide-react';
import toTitleCase from '@/app/utils/toTitleCase';
import { format } from 'date-fns';

const modeDetails = {
  train: {
    label: 'Train',
    icon: <TrainFrontIcon size={16} />,
  },
  underground: {
    label: 'Tube',
    icon: <TrainFrontTunnelIcon size={16} />,
  },
  walk: {
    label: 'Walk',
    icon: <FootprintsIcon size={16} />,
  },
  transfer: {
    label: 'Transfer',
    icon: <ArrowRightLeftIcon size={16} />,
  },
  bus: {
    label: 'Bus',
    icon: <BusIcon size={16} />,
  },
  dlr: {
    label: 'DLR',
    icon: <TrainFrontIcon size={16} />,
  },
  tram: {
    label: 'Tram',
    icon: <TramFrontIcon size={16} />,
  },
  cableCar: {
    label: 'Cable Car',
    icon: <CableCarIcon size={16} />,
  },
  cycle: {
    label: 'Cycle',
    icon: <BikeIcon size={16} />,
  },
  river: {
    label: 'River',
    icon: <WavesIcon size={16} />,
  },
};

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
  const time = isLastStation
    ? format(leg.arrival.time, 'd MMM, HH:mm')
    : format(leg.departure.time, 'd MMM, HH:mm');
  const station = isLastStation ? leg.arrival.station : leg.departure.station;

  return (
    <section className="flex items-center gap-2">
      {/* Graphic */}
      <CircleStepGraphic isFirstStep={isFirstStation} isLastStep={isLastStation} length={150} />

      {/* Details */}
      <section className="flex h-24 w-full flex-col gap-2 pr-2 pt-9">
        {/* Station */}
        <div className="flex w-full justify-between gap-4">
          <p className={`pl-1 ${(isFirstStation || isLastStation) && 'font-bold'}`}>
            {toTitleCase(station)}
          </p>
          <p
            className={`whitespace-nowrap pr-1 ${(isFirstStation || isLastStation) && 'font-bold'}`}
          >
            {time}
          </p>
        </div>

        {/* Detail tags */}
        <div className="flex gap-2">
          <section className="flex flex-wrap gap-2">
            {!isLastStation && (
              <>
                <Tag>
                  {modeDetails[leg.mode].icon}
                  {modeDetails[leg.mode].label}
                </Tag>
                {leg.line && (
                  <Tag>
                    <TrainTrackIcon size={16} /> {`${toTitleCase(leg.line)} Line`}
                  </Tag>
                )}
              </>
            )}
          </section>
        </div>
      </section>
    </section>
  );
}
