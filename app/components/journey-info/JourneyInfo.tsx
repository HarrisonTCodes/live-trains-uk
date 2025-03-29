import { Journey } from '@/app/interfaces';
import toTitleCase from '@/app/utils/toTitleCase';
import Link from 'next/link';
import Button from '../button/Button';
import Tag from '../tag/Tag';
import {
  ArrowRightIcon,
  CircleAlertIcon,
  EllipsisVerticalIcon,
  MapPinIcon,
  SearchIcon,
  Trash2Icon,
  XIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

      {/* Search departures buttons */}
      <div className="flex w-full flex-col items-center justify-center gap-2 px-2 sm:flex-row">
        <Link
          prefetch={false}
          href={`/trains/${journey.secondStation}/${journey.firstStation}`}
          className="w-full"
        >
          <Button className="w-full" variant="secondary">
            <SearchIcon />
            <span className="flex items-center gap-0.5">
              {journey.secondCrs} <ArrowRightIcon size={16} /> {journey.firstCrs}
            </span>
          </Button>
        </Link>
        <Link
          prefetch={false}
          href={`/trains/${journey.firstStation}/${journey.secondStation}`}
          className="w-full"
        >
          <Button className="w-full">
            <SearchIcon />
            <span className="flex items-center gap-0.5">
              {journey.firstCrs} <ArrowRightIcon size={16} /> {journey.secondCrs}
            </span>
          </Button>
        </Link>
      </div>

      {/* Kebab menu */}
      <AnimatePresence>
        {kebabMenuOpen && (
          <motion.div
            className="absolute right-9 flex w-48 cursor-pointer flex-col divide-y divide-stone-300 rounded-lg border border-stone-300 bg-white shadow-xl"
            ref={kebabMenuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Link
              href={`/alerts/${journey.firstStation}`}
              className="flex items-center gap-2 px-2 py-2 text-left active:bg-stone-200"
            >
              <CircleAlertIcon className="text-blue-900" /> Alerts for {journey.firstCrs}
            </Link>
            <Link
              href={`/alerts/${journey.secondStation}`}
              className="flex items-center gap-2 px-2 py-2 text-left active:bg-stone-200"
            >
              <CircleAlertIcon className="text-blue-900" /> Alerts for {journey.secondCrs}
            </Link>
            <button
              className="flex items-center gap-2 px-2 py-2 text-left text-red-800 active:bg-stone-200"
              onClick={() => {
                setDeleteJourneyId(journey.id);
                setKebabMenuOpen(false);
              }}
            >
              <Trash2Icon className="text-red-700" /> Delete Journey
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
