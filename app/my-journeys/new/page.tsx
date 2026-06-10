'use client';
import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
import Notice from '@/app/components/notice/Notice';
import Search from '@/app/components/search/Search';
import JourneyTypeSelector from '@/app/components/journey-type-selector/JourneyTypeSelector';
import toTitleCase from '@/app/utils/toTitleCase';
import { PlusIcon, XIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import type { JourneyType } from '@/app/types/enums';

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
  const [type, setType] = useState<JourneyType>(() => {
    const searchParamType = searchParams.get('type')?.toUpperCase();
    return searchParamType === 'PLANS' ? 'PLANS' : 'DEPARTURES';
  });

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

    axios
      .post('/api/journeys', {
        name,
        firstStation,
        secondStation,
        type,
      })
      .then(() => {
        setError(undefined);
        router.push('/my-journeys');
      })
      .catch((error) => {
        const message = error.response?.data || '';
        setError(`Error processing journey: ${message.length > 0 ? message : 'Please try again'}`);
      });
  };

  return (
    <main className="flex flex-grow flex-col items-center gap-6 py-8">
      {error && (
        <Notice notice="Error" status="fail" className="!max-w-[500px]">
          {error}.
        </Notice>
      )}
      <Form
        onSubmit={createJourney}
        heading="Create a New Journey"
        subHeading="Save your regular routes for quick access to departures or plans"
      >
        <section className="flex w-full flex-col gap-4">
          <JourneyTypeSelector value={type} onChange={setType} />

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
          <Button back variant="secondary" className="w-1/2">
            <XIcon /> Cancel
          </Button>
          <Button submit className="w-1/2">
            <PlusIcon /> Create
          </Button>
        </section>
      </Form>
    </main>
  );
}
