'use client';
import { useEffect, useState } from 'react';
import { Journey } from '../interfaces';

export default function JourneysPage() {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    fetch('/api/journeys')
      .then((response) => response.json())
      .then((response) => setJourneys(response));
  }, []);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-3xl font-medium text-blue-900">Journeys</h1>
      {journeys.map((journey: Journey) => (
        <p>{JSON.stringify(journey)}</p>
      ))}
    </main>
  );
}
