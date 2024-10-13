'use client';
import { useEffect, useState } from 'react';
import { Service } from '../interfaces';

export default function TrainsPage({
  searchParams,
}: {
  searchParams: { from: string; to: string };
}) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch(
      `/api/live-departures?from=${searchParams.from.toLowerCase()}&to=${searchParams.to.toLowerCase()}`,
    )
      .then((response) => response.json())
      .then((services) => setServices(services));
  }, []);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="text-center">
        <h1 className="text-3xl font-medium text-blue-900">Live Departures</h1>
        <h2 className="text-lg font-medium text-blue-900">
          {searchParams.from} to {searchParams.to}
        </h2>
      </section>
      <p>{JSON.stringify(services)}</p>
    </main>
  );
}
