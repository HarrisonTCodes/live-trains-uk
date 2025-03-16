'use client';
import { useState } from 'react';
import Search from './components/search/Search';
import Button from './components/button/Button';
import { useRouter } from 'next/navigation';
import Form from './components/form/Form';
import { SearchIcon } from 'lucide-react';

export default function LiveTrainsPage() {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const router = useRouter();

  const getJourneys = () => {
    if (!from) {
      return;
    }

    router.push(`/trains/${encodeURIComponent(from)}/${encodeURIComponent(to ? to : 'any')}`);
  };

  return (
    <main className="flex flex-grow flex-col items-center gap-6 py-8">
      <Form
        onSubmit={getJourneys}
        heading="Get Live Departures"
        subHeading="Search for live direct departures across all stations in the UK"
      >
        <section className="flex w-full flex-col gap-4 py-4">
          <Search label="From" value={from} setValue={setFrom} />
          <Search label="To (Optional)" value={to} setValue={setTo} />
        </section>
        <Button submit className="w-full">
          <SearchIcon /> Search Departures
        </Button>
      </Form>
    </main>
  );
}
