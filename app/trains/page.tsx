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
    <main>
      <p>{JSON.stringify(services)}</p>
    </main>
  );
}
