'use client';
import Button from '@/app/components/button/Button';
import PageHeading from '@/app/components/page-heading/PageHeading';
import Search from '@/app/components/search/Search';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { FaPlus, FaTriangleExclamation } from 'react-icons/fa6';

export default function AddJourneyPage() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [firstStation, setFirstStation] = useState<string>('');
  const [secondStation, setSecondStation] = useState<string>('');

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
        <FaPlus size={24} color="ffffff" className="text-white" />
        Add Journey
      </Button>
      {error && (
        <div className="flex flex-col items-center gap-1">
          <h2 className="flex items-center gap-2 text-2xl font-medium text-red-700">
            <FaTriangleExclamation size={24} color="ff0000" className="text-red-700" /> There was an
            error
          </h2>
          <p className="text-center text-red-700">
            Make sure all inputs are filled and valid stations are chosen
          </p>
        </div>
      )}
    </main>
  );
}
