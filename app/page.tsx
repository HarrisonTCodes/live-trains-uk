'use client';
import { useState } from 'react';
import Search from './components/search/Search';

export default function LiveTrainsPage() {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  return (
    <main className="flex flex-col items-center gap-6 py-6">
      <h1 className="text-3xl font-medium text-blue-900">Get Live Departures</h1>
      <section className="flex flex-col gap-4 md:flex-row">
        <Search label="From" value={from} setValue={setFrom} />
        <Search label="To" value={to} setValue={setTo} />
      </section>
    </main>
  );
}
