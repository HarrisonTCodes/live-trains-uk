'use client';
import { useState } from 'react';
import Form from '../components/form/Form';
import Search from '../components/search/Search';
import Button from '../components/button/Button';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AlertsPage() {
  const [station, setStation] = useState('');
  const router = useRouter();

  const getAlerts = () => {
    if (!station) {
      return;
    }

    router.push(`/alerts/${encodeURIComponent(station)}`);
  };

  return (
    <main className="flex flex-grow flex-col items-center gap-4 py-8">
      <Form
        onSubmit={getAlerts}
        heading="Station Alerts"
        subHeading="Get alerts and disruptions affecting a specific station"
      >
        <Search label="Station" value={station} setValue={setStation} />
        <Button width="w-full" submit>
          <SearchIcon />
          Search Alerts
        </Button>
      </Form>
    </main>
  );
}
