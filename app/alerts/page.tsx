'use client';
import { useState } from 'react';
import Form from '../components/form/Form';
import Search from '../components/search/Search';
import Button from '../components/button/Button';
import { SearchIcon } from 'lucide-react';

export default function AlertsPage() {
  const [station, setStation] = useState('');

  return (
    <main className="flex flex-col items-center gap-4 py-8">
      <Form
        heading="Station Alerts"
        subHeading="Get alerts and disruptions affecting a specific station"
      >
        <Search label="Station" value={station} setValue={setStation} />
        <Button width="w-full">
          <SearchIcon />
          Search alerts
        </Button>
      </Form>
    </main>
  );
}
