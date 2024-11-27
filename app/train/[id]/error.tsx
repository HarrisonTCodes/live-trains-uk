'use client';
import PageHeading from '@/app/components/page-heading/PageHeading';
import { FaTriangleExclamation } from 'react-icons/fa6';

export default function Error() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Service details" />
      <h2 className="flex items-center gap-2 text-2xl font-medium text-red-700">
        <FaTriangleExclamation /> There was an error
      </h2>
      <p className="px-2 text-center font-medium text-gray-500">
        No such service found. The service you are looking for may no longer exist.
      </p>
    </main>
  );
}
