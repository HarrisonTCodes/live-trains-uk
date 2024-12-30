'use client';
import Button from '@/app/components/button/Button';
import Notice from '@/app/components/notice/Notice';
import PageHeading from '@/app/components/page-heading/PageHeading';
import Search from '@/app/components/search/Search';
import toTitleCase from '@/app/utils/toTitleCase';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, Suspense, useState } from 'react';
import { FaPlus, FaTriangleExclamation } from 'react-icons/fa6';

// Search bars use search params to get the initial values, so are in own component to allow for suspense
function SearchBars({
  firstStation,
  setFirstStation,
  secondStation,
  setSecondStation,
}: {
  firstStation: string;
  setFirstStation: (value: string) => void;
  secondStation: string;
  setSecondStation: (value: string) => void;
}) {
  const searchParams = useSearchParams();
  setFirstStation(toTitleCase(searchParams.get('from') ?? ''));
  setSecondStation(toTitleCase(searchParams.get('to') ?? ''));

  return (
    <>
      <Search label="First station" value={firstStation} setValue={setFirstStation} />
      <Search label="Second station" value={secondStation} setValue={setSecondStation} />
    </>
  );
}

export default function AddJourneyPage() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | undefined>();
  const [firstStation, setFirstStation] = useState<string>('');
  const [secondStation, setSecondStation] = useState<string>('');

  const createJourney = () => {
    // Make sure all inputs are filled
    if (!name || !firstStation || !secondStation) {
      setError('Please fill in all the inputs above');
      return;
    }

    // Make sure the name isn't too long
    if (name.length > 30) {
      setError('Please make sure your journey name is less than 30 characters');
      return;
    }

    fetch('/api/journeys', {
      method: 'POST',
      body: JSON.stringify({
        name,
        firstStation,
        secondStation,
      }),
    }).then(async (response) => {
      if (response.ok) {
        setError(undefined);
        router.push('/my-journeys');
      } else {
        const message = await response.text();
        setError(`Error processing journey: ${message.length > 0 ? message : 'Please try again'}`);
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
        <Suspense>
          <SearchBars
            firstStation={firstStation}
            setFirstStation={setFirstStation}
            secondStation={secondStation}
            setSecondStation={setSecondStation}
          />
        </Suspense>
      </section>
      <Button onClick={createJourney}>
        <FaPlus /> Add Journey
      </Button>
      {error && (
        <Notice
          notice="Error"
          description={`${error}.`}
          icon={<FaTriangleExclamation />}
          color="red-700"
        />
      )}
    </main>
  );
}
