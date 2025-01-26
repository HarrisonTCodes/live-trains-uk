'use client';
import Button from '@/app/components/button/Button';
import Form from '@/app/components/form/Form';
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
  const [error, setError] = useState<string | undefined>();
  const [firstStation, setFirstStation] = useState<string>(
    toTitleCase(searchParams.get('from') ?? ''),
  );
  const [secondStation, setSecondStation] = useState<string>(
    toTitleCase(searchParams.get('to') ?? ''),
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
      <PageHeading heading="New Journey" />
      <Form onSubmit={createJourney} heading="Create a new journey">
        <section className="flex flex-col gap-6">
          <input
            type="search"
            className="w-[80vw] max-w-96 rounded-lg border border-gray-400 bg-gray-100 p-2 text-xl focus:border-blue-800 focus:outline-none md:w-[40vw]"
            placeholder="Name"
            value={name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          />
          <Search label="First station" value={firstStation} setValue={setFirstStation} />
          <Search label="Second station" value={secondStation} setValue={setSecondStation} />
        </section>
        <Button submit>
          <FaPlus /> Create Journey
        </Button>
      </Form>
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
