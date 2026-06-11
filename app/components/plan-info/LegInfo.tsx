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
  TRAIN: {
    label: 'Train',
    icon: <TrainFrontIcon size={16} />,
  },
  UNDERGROUND: {
    label: 'Tube',
    icon: <TrainFrontTunnelIcon size={16} />,
  },
  WALK: {
    label: 'Walk',
    icon: <FootprintsIcon size={16} />,
  },
  TRANSFER: {
    label: 'Transfer',
    icon: <ArrowRightLeftIcon size={16} />,
  },
  BUS: {
    label: 'Bus',
    icon: <BusIcon size={16} />,
  },
  DLR: {
    label: 'DLR',
    icon: <TrainFrontIcon size={16} />,
  },
  TRAM: {
    label: 'Tram',
    icon: <TramFrontIcon size={16} />,
  },
  CABLE_CAR: {
    label: 'Cable Car',
    icon: <CableCarIcon size={16} />,
  },
  CYCLE: {
    label: 'Cycle',
    icon: <BikeIcon size={16} />,
  },
  RIVER: {
    label: 'River',
    icon: <WavesIcon size={16} />,
  },
} satisfies Record<TransportMode, unknown>;

const lineStyles: Record<UndergroundLine, string> = {
  BAKERLOO: 'border-[#b05f0f] bg-[#b05f0f]/30 text-yellow-950',
  CENTRAL: 'border-[#e02525] bg-[#e02525]/30 text-red-950',
  CIRCLE: 'border-[#fece08] bg-[#fece08]/30 text-yellow-950',
  DISTRICT: 'border-[#04783f] bg-[#04783f]/30 text-green-950',
  'HAMMERSMITH-CITY': 'border-[#ee9bac] bg-[#ee9bac]/30 text-pink-950',
  JUBILEE: 'border-[#7b848b] bg-[#7b848b]/30 text-gray-950',
  METROPOLITAN: 'border-[#861a54] bg-[#861a54]/30 text-purple-950',
  NORTHERN: 'border-[#231f20] bg-[#231f20]/30 text-gray-950',
  PICCADILLY: 'border-[#1b3f94] bg-[#1b3f94]/30 text-blue-950',
  VICTORIA: 'border-[#0c9fdc] bg-[#0c9fdc]/30 text-cyan-950',
  'WATERLOO-CITY': 'border-[#6dc7b0] bg-[#6dc7b0]/30 text-teal-950',
  ELIZABETH: 'border-[#8719e0] bg-[#8719e0]/30 text-purple-950',
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
