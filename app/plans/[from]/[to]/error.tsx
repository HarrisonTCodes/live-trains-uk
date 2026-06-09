'use client';
import BackButton from '@/app/components/button/BackButton';
import Notice from '@/app/components/notice/Notice';
import Link from 'next/link';

export default function Error() {
  return (
    <main className="flex flex-grow flex-col items-center gap-6 py-8">
      <section className="relative w-[90vw] max-w-[700px]">
        <BackButton />
        <h1 className="text-center text-2xl font-bold text-blue-900">Journey Plans</h1>
      </section>
      {/* Experimental feature notice */}
      <Notice notice="Experimental Feature" status="info">
        Planning is still in development, and may not work as expected, or undergo regular change.
        You can report any issues or feedback on{' '}
        <Link
          className="text-blue-900 underline"
          href="https://github.com/HarrisonTCodes/live-trains-uk"
        >
          GitHub
        </Link>
        .
      </Notice>
      <Notice notice="Error" status="fail">
        There was an error retrieving plans between these stations. Please make sure you choose
        valid stations from the dropdown menu.
      </Notice>
    </main>
  );
}
