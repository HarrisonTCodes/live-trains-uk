import type { Leg } from '@/app/types/app';
import type { TransportMode, UndergroundLine } from '@/app/types/enums';
import CircleStepGraphic from '../graphics/CircleStepGraphic';
import Tag from '../tag/Tag';
import {
  ArrowRightLeftIcon,
  BikeIcon,
  BusFrontIcon,
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
} satisfies Record<TransportMode, unknown>;

const lineStyles: Record<UndergroundLine, string> = {
  bakerloo: 'border-[#b05f0f] bg-[#b05f0f]/30 text-yellow-950',
  central: 'border-[#e02525] bg-[#e02525]/30 text-red-950',
  circle: 'border-[#fece08] bg-[#fece08]/30 text-yellow-950',
  district: 'border-[#04783f] bg-[#04783f]/30 text-green-950',
  'hammersmith-city': 'border-[#ee9bac] bg-[#ee9bac]/30 text-pink-950',
  jubilee: 'border-[#7b848b] bg-[#7b848b]/30 text-gray-950',
  metropolitan: 'border-[#861a54] bg-[#861a54]/30 text-purple-950',
  northern: 'border-[#231f20] bg-[#231f20]/30 text-gray-950',
  piccadilly: 'border-[#1b3f94] bg-[#1b3f94]/30 text-blue-950',
  victoria: 'border-[#0c9fdc] bg-[#0c9fdc]/30 text-cyan-950',
  'waterloo-city': 'border-[#6dc7b0] bg-[#6dc7b0]/30 text-teal-950',
  elizabeth: 'border-[#8719e0] bg-[#8719e0]/30 text-purple-950',
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
                {leg.mode && (
                  <Tag>
                    {modeDetails[leg.mode].icon}
                    {modeDetails[leg.mode].label}
                  </Tag>
                )}
                {leg.line && (
                  <Tag overrideStyle={lineStyles[leg.line]}>
                    <TrainTrackIcon size={16} />{' '}
                    {`${toTitleCase(leg.line.replaceAll('-', ' & '))} Line`}
                  </Tag>
                )}
                {leg.number && (
                  <Tag>
                    <BusFrontIcon size={16} /> {leg.number}
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
