'use client';
import { useState } from 'react';
import Search from './components/search/Search';
import Button from './components/button/Button';
import { FaArrowRightArrowLeft, FaMagnifyingGlass } from 'react-icons/fa6';
import PageHeading from './components/page-heading/PageHeading';
import { useRouter } from 'next/navigation';

export default function LiveTrainsPage() {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const router = useRouter();

  const swapStations = () => {
    const oldFrom = from;
    setFrom(to);
    setTo(oldFrom);
  };

  const getJourneys = () => {
    if (!from || !to) {
      return;
    }

    router.push(`/trains?from=${from}&to=${to}`);
  };

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Get Live Departures" backEnabled={false} />
      <section className="flex flex-col gap-4 py-4 md:flex-row">
        <Search label="From" value={from} setValue={setFrom} />
        <Search label="To" value={to} setValue={setTo} />
      </section>
      <section className="flex flex-col gap-6">
        <Button onClick={swapStations}>
          <FaArrowRightArrowLeft /> Switch
        </Button>
        <Button onClick={getJourneys}>
          <FaMagnifyingGlass /> Go
        </Button>
      </section>
    </main>
  );
}
