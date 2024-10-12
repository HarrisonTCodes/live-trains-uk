'use client';
import { useState } from 'react';
import Search from './components/search/Search';
import Button from './components/button/Button';
import { FaArrowRightArrowLeft, FaMagnifyingGlass } from 'react-icons/fa6';
import Link from 'next/link';

export default function LiveTrainsPage() {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  const swapStations = () => {
    const oldFrom = from;
    setFrom(to);
    setTo(oldFrom);
  };

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-3xl font-medium text-blue-900">Get Live Departures</h1>
      <section className="flex flex-col gap-4 py-4 md:flex-row">
        <Search label="From" value={from} setValue={setFrom} />
        <Search label="To" value={to} setValue={setTo} />
      </section>
      <section className="flex flex-col gap-6">
        <Button onClick={swapStations}>
          <FaArrowRightArrowLeft size={24} color="ffffff" className="text-white" />
          Switch
        </Button>
        <Link href={`/trains?from=${from}&to=${to}`}>
          <Button>
            <FaMagnifyingGlass size={24} color="ffffff" className="text-white" />
            Go
          </Button>
        </Link>
      </section>
    </main>
  );
}
