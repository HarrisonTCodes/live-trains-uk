import { Journey } from '@/app/interfaces';
import toTitleCase from '@/app/utils/toTitleCase';
import Link from 'next/link';
import { FaLocationDot, FaMagnifyingGlass, FaTrash } from 'react-icons/fa6';
import Button from '../button/Button';
import Tag from '../tag/Tag';

export default function JourneyInfo({
  journey,
  setDeleteJourneyId,
}: {
  journey: Journey;
  setDeleteJourneyId: (value: number) => void;
}) {
  return (
    <div className="flex w-[90vw] max-w-[700px] flex-col gap-4 rounded-lg border border-stone-300 bg-white p-2">
      {/* Name and stations */}
      <div className="flex flex-col items-start gap-1">
        <h2 className="pb-2 text-xl font-medium text-blue-900">{journey.name}</h2>
        <div className="flex items-center gap-2 text-stone-600">
          <FaLocationDot /> {toTitleCase(journey.firstStation)} <Tag>{journey.firstCrs}</Tag>
        </div>
        <div className="flex items-center gap-2 text-stone-600">
          <FaLocationDot /> {toTitleCase(journey.secondStation)} <Tag>{journey.secondCrs}</Tag>
        </div>
      </div>

      {/* Search departures and delete journey buttons */}
      <div className="flex w-full flex-col items-center justify-center gap-2 px-2 sm:flex-row">
        <Button width="w-full" onClick={() => setDeleteJourneyId(journey.id)}>
          <FaTrash /> Delete Journey
        </Button>
        <Link
          prefetch={false}
          href={`/trains/${journey.firstStation}/${journey.secondStation}`}
          className="w-full"
        >
          <Button width="w-full">
            <FaMagnifyingGlass /> Search Departures
          </Button>
        </Link>
      </div>
    </div>
  );
}
