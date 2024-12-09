'use client';
import Button from '@/app/components/button/Button';
import Notice from '@/app/components/notice/Notice';
import PageHeading from '@/app/components/page-heading/PageHeading';
import Search from '@/app/components/search/Search';
import toTitleCase from '@/app/utils/toTitleCase';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { FaPlus, FaTriangleExclamation } from 'react-icons/fa6';

export default function AddJourneyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [firstStation, setFirstStation] = useState<string>(
    toTitleCase(searchParams.get('from') ?? ''),
  );
  const [secondStation, setSecondStation] = useState<string>(
    toTitleCase(searchParams.get('to') ?? ''),
  );

  const createJourney = () => {
    fetch('/api/journeys', {
      method: 'POST',
      body: JSON.stringify({
        name,
        firstStation,
        secondStation,
      }),
    }).then((response) => {
      if (response.ok) {
        setError(false);
        router.push('/my-journeys');
      } else {
        setError(true);
      }
    });
  };

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="New Journey" />
      <section className="flex flex-col gap-6">
        <input
          type="search"
          className="w-[80vw] max-w-96 rounded-lg border-2 border-gray-400 bg-gray-100 p-2 text-xl focus:border-blue-800 focus:outline-none md:w-[40vw]"
          placeholder="Name"
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
        <Search label="First station" value={firstStation} setValue={setFirstStation} />
        <Search label="Second station" value={secondStation} setValue={setSecondStation} />
      </section>
      <Button onClick={createJourney}>
        <FaPlus /> Add Journey
      </Button>
      {error && (
        <Notice
          notice="Error"
          description="There was an error trying to create a journey. Please make sure all inputs are valid and populated"
          icon={<FaTriangleExclamation />}
          color="red-700"
        />
      )}
    </main>
  );
}
