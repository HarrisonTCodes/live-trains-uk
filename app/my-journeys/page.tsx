'use client';
import { useEffect, useState } from 'react';
import { Journey } from '../interfaces';
import JourneyInfo from '../components/journey-info/JourneyInfo';

export default function JourneysPage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);

  useEffect(() => {
    fetch('/api/journeys')
      .then((response) => response.json())
      .then((response) => setJourneys(response));
  }, []);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-3xl font-medium text-blue-900">My Journeys</h1>
      <section className="flex w-full flex-col items-center gap-4">
        {journeys.map((journey: Journey) => (
          <JourneyInfo
            key={`journey ${journey.name}`}
            journey={journey}
            journeys={journeys}
            setJourneys={setJourneys}
          />
        ))}
      </section>
    </main>
  );
}
