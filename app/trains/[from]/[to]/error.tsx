'use client';
import PageHeading from '@/app/components/page-heading/PageHeading';
import { FaTriangleExclamation } from 'react-icons/fa6';

export default function Error() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Live Departures" />
      <h2 className="flex items-center gap-2 text-2xl font-medium text-red-700">
        <FaTriangleExclamation /> There was an error
      </h2>
      <p className="max-w-[700px] px-2 text-center font-medium text-gray-500">
        There was an error when trying to find journeys between these stations. The stations you
        entered may be invalid. Please use the search bar dropdown menu to pick a station.
      </p>
    </main>
  );
}
