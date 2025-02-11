'use client';
import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import Notice from '@/app/components/notice/Notice';
import Search from '@/app/components/search/Search';
import toTitleCase from '@/app/utils/toTitleCase';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { FaArrowLeft, FaPlus } from 'react-icons/fa6';

export default function AddJourneyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | undefined>();
  const [firstStation, setFirstStation] = useState<string>(
    toTitleCase(searchParams.get('from') ?? ''),
  );
  const [secondStation, setSecondStation] = useState<string>(
    toTitleCase(
      !searchParams.get('to') || searchParams.get('to') === 'any' ? '' : searchParams.get('to')!,
    ),
  );

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
      <Form
        onSubmit={createJourney}
        heading="Create a New Journey"
        subHeading="Save your regular routes for quick access to live departures"
      >
        <section className="flex w-full flex-col gap-4">
          <input
            type="search"
            className="w-full rounded-lg border border-gray-400 bg-white p-2 text-lg focus:border-blue-800 focus:outline-none"
            placeholder="Name"
            value={name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          />
          <Search label="First station" value={firstStation} setValue={setFirstStation} />
          <Search label="Second station" value={secondStation} setValue={setSecondStation} />
        </section>
        <section className="flex w-full justify-evenly gap-2">
          <Button back secondary width="w-1/2">
            <FaArrowLeft /> Cancel
          </Button>
          <Button submit width="w-1/2">
            <FaPlus /> Create
          </Button>
        </section>
      </Form>
      {error && <Notice notice="Error" description={`${error}.`} status="fail" />}
    </main>
  );
}
