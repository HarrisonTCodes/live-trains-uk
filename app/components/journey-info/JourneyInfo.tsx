import { Journey } from '@/app/interfaces';
import { useRouter } from 'next/navigation';
import { FaArrowRightArrowLeft, FaTrash } from 'react-icons/fa6';

export default function JourneyInfo({
  journey,
  journeys,
  setJourneys,
}: {
  journey: Journey;
  journeys: Journey[];
  setJourneys: (value: Journey[]) => void;
}) {
  const router = useRouter();

  return (
    <div className="flex h-20 w-11/12 max-w-[500px] cursor-pointer divide-x-2 divide-gray-300 rounded-xl border-2 border-gray-300 transition-all hover:bg-gray-100">
      {/* Name and stations */}
      <section
        className="m-2 flex w-full flex-col justify-center gap-2"
        onClick={() =>
          router.push(`/trains?from=${journey.firstStation}&to=${journey.secondStation}`)
        }
      >
        <h2 className="text-xl font-medium text-blue-900">{journey.name}</h2>
        <p className="flex flex-wrap items-center gap-2 text-lg text-gray-600 sm:text-lg">
          {journey.firstCrs} <FaArrowRightArrowLeft /> {journey.secondCrs}
        </p>
      </section>
      {/* Delete button */}
      <button
        className="flex w-[50px] items-center justify-center"
        onClick={() => {
          // Actually delete journey
          fetch(`/api/journeys/${journey.id}`, {
            method: 'DELETE',
          });
          // Remove journey from current list (so no need to refetch data)
          setJourneys(
            journeys.filter((currentJourney: Journey) => currentJourney.id !== journey.id),
          );
        }}
      >
        <FaTrash size={20} color="888888" className="text-[#888888]" />
      </button>
    </div>
  );
}
