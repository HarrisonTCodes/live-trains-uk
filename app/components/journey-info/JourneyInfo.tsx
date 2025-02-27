import { Journey } from '@/app/interfaces';
import toTitleCase from '@/app/utils/toTitleCase';
import Link from 'next/link';
import Button from '../button/Button';
import Tag from '../tag/Tag';
import {
  CircleAlertIcon,
  EllipsisVerticalIcon,
  MapPinIcon,
  SearchIcon,
  Trash2Icon,
  XIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function JourneyInfo({
  journey,
  setDeleteJourneyId,
}: {
  journey: Journey;
  setDeleteJourneyId: (value: number) => void;
}) {
  const [kebabMenuOpen, setKebabMenuOpen] = useState(false);
  const kebabMenuRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    if (kebabMenuRef.current && !kebabMenuRef.current.contains(event.target as Node)) {
      setKebabMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [kebabMenuRef]);

  return (
    <div className="relative flex w-[90vw] max-w-[700px] flex-col gap-4 rounded-lg border border-stone-300 bg-white p-2">
      {/* Name and stations */}
      <div className="flex flex-col items-start gap-1">
        <section className="flex w-full justify-between">
          <h2 className="pb-2 text-xl font-medium text-blue-900">{journey.name}</h2>
          <button onClick={() => setKebabMenuOpen(!kebabMenuOpen)}>
            {kebabMenuOpen ? (
              <XIcon className="text-stone-600" />
            ) : (
              <EllipsisVerticalIcon className="text-stone-600" />
            )}
          </button>
        </section>
        <div className="flex items-center gap-2 text-stone-600">
          <MapPinIcon /> {toTitleCase(journey.firstStation)} <Tag>{journey.firstCrs}</Tag>
        </div>
        <div className="flex items-center gap-2 text-stone-600">
          <MapPinIcon /> {toTitleCase(journey.secondStation)} <Tag>{journey.secondCrs}</Tag>
        </div>
      </div>

      {/* Search departures and delete journey buttons */}
      <div className="flex w-full flex-col items-center justify-center gap-2 px-2 sm:flex-row">
        <Button width="w-full" onClick={() => setDeleteJourneyId(journey.id)} secondary>
          <Trash2Icon /> Delete Journey
        </Button>
        <Link
          prefetch={false}
          href={`/trains/${journey.firstStation}/${journey.secondStation}`}
          className="w-full"
        >
          <Button width="w-full">
            <SearchIcon /> Search Departures
          </Button>
        </Link>
      </div>

      {/* Kebab menu */}
      {kebabMenuOpen && (
        <div
          className="absolute right-9 flex w-48 cursor-pointer flex-col divide-y divide-stone-300 rounded-lg border border-stone-300 bg-white shadow-xl"
          ref={kebabMenuRef}
        >
          <button className="flex items-center gap-2 px-2 py-2 text-left active:bg-stone-200">
            <CircleAlertIcon className="text-blue-900" /> Alerts for {journey.firstCrs}
          </button>
          <button className="flex items-center gap-2 px-2 py-2 text-left active:bg-stone-200">
            <CircleAlertIcon className="text-blue-900" /> Alerts for {journey.secondCrs}
          </button>
          <button className="flex items-center gap-2 px-2 py-2 text-left active:bg-stone-200">
            <Trash2Icon className="text-blue-900" /> Delete Journey
          </button>
        </div>
      )}
    </div>
  );
}
