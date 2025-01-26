'use client';
import { useState } from 'react';
import Search from './components/search/Search';
import Button from './components/button/Button';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Form from './components/form/Form';

export default function LiveTrainsPage() {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const router = useRouter();

  const getJourneys = () => {
    if (!from || !to) {
      return;
    }

    router.push(`/trains/${from}/${to}`);
  };

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <Form
        onSubmit={getJourneys}
        heading="Get Live Departures"
        subHeading="Search for live direct departures across all stations in the UK"
      >
        <section className="flex w-full flex-col gap-4 py-4">
          <Search label="From" value={from} setValue={setFrom} />
          <Search label="To" value={to} setValue={setTo} />
        </section>
        <Button submit width="w-full">
          <FaMagnifyingGlass /> Search Departures
        </Button>
      </Form>
    </main>
  );
}
