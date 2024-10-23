'use client';
import { useEffect, useState } from 'react';
import { Journey } from '../interfaces';
import JourneyInfo from '../components/journey-info/JourneyInfo';
import Button from '../components/button/Button';
import { FaPlus, FaTriangleExclamation } from 'react-icons/fa6';
import Link from 'next/link';
import Skeletons from '../components/skeletons/Skeletons';

export default function JourneysPage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/journeys')
      .then((response) => response.json())
      .then((response) => {
        setJourneys(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-3xl font-medium text-blue-900">My Journeys</h1>
      <Link href={'/my-journeys/new'}>
        <Button>
          <FaPlus size={24} color="ffffff" className="text-white" />
          Add Journey
        </Button>
      </Link>
      <section className="flex w-full flex-col items-center gap-4">
        {loading ? (
          <Skeletons />
        ) : error ? (
          <h2 className="flex items-center gap-2 text-2xl font-medium text-red-700">
            <FaTriangleExclamation size={24} color="ff0000" className="text-red-700" /> There was an
            error
          </h2>
        ) : journeys.length === 0 ? (
          <h2 className="px-2 text-center text-2xl text-gray-400">
            No journeys found. Click above to add a new journey
          </h2>
        ) : (
          journeys.map((journey: Journey) => (
            <JourneyInfo
              key={`journey ${journey.name}`}
              journey={journey}
              journeys={journeys}
              setJourneys={setJourneys}
            />
          ))
        )}
      </section>
    </main>
  );
}
