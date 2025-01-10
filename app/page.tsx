'use client';
import { useState } from 'react';
import Search from './components/search/Search';
import Button from './components/button/Button';
import { FaArrowRightArrowLeft, FaMagnifyingGlass } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import Form from './components/form/Form';

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

    router.push(`/trains/${from}/${to}`);
  };

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <Form onSubmit={getJourneys} heading="Get Live Departures">
        <section className="flex flex-col gap-4 py-4">
          <Search label="From" value={from} setValue={setFrom} />
          <Search label="To" value={to} setValue={setTo} />
        </section>
        <section className="flex gap-6">
          <Button onClick={swapStations}>
            <FaArrowRightArrowLeft /> Switch
          </Button>
          <Button submit>
            <FaMagnifyingGlass /> Go
          </Button>
        </section>
      </Form>
    </main>
  );
}
