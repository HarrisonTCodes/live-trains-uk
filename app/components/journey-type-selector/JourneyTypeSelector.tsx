import type { JourneyType } from '@/app/types/enums';
import { MapIcon, TrainFrontIcon } from 'lucide-react';

export default function JourneyTypeSelector({
  value,
  onChange,
}: {
  value: JourneyType;
  onChange: (value: JourneyType) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full overflow-hidden rounded-lg border border-stone-300">
        <button
          type="button"
          className={`flex w-1/2 items-center justify-center gap-2 py-2 font-medium transition ${
            value === 'DEPARTURES'
              ? 'bg-blue-800 text-white'
              : 'bg-white text-stone-600 hover:bg-stone-100'
          }`}
          onClick={() => onChange('DEPARTURES')}
        >
          <TrainFrontIcon /> Departures
        </button>
        <button
          type="button"
          className={`flex w-1/2 items-center justify-center gap-2 py-2 font-medium transition ${
            value === 'PLANS'
              ? 'bg-blue-800 text-white'
              : 'bg-white text-stone-600 hover:bg-stone-100'
          }`}
          onClick={() => onChange('PLANS')}
        >
          <MapIcon /> Plans
        </button>
      </div>
    </div>
  );
}
