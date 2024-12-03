'use client';
import PageHeading from '@/app/components/page-heading/PageHeading';
import { FaTriangleExclamation } from 'react-icons/fa6';

export default function Error() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Service details" />
      <section className="flex flex-col items-center">
        <h2 className="flex items-center gap-2 text-2xl font-medium text-red-700">
          <FaTriangleExclamation /> Error
        </h2>
        <p className="px-2 text-center text-lg text-red-700">
          There was an error trying to retrieve the service. This service may no longer exist
        </p>
      </section>
    </main>
  );
}
