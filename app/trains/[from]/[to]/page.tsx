import Button from '../../../components/button/Button';
import toTitleCase from '../../../utils/toTitleCase';
import Link from 'next/link';
import HeadingWidget from '@/app/components/heading-widget/HeadingWidget';
import { BookmarkIcon } from 'lucide-react';
import { Suspense } from 'react';
import Skeletons from '@/app/components/skeletons/Skeletons';
import TrainInfoSection from '@/app/components/train-info/TrainInfoSection';
import getTime from '@/app/utils/getTime';
import BackButton from '@/app/components/button/BackButton';

export default async function TrainsPage(props: { params: Promise<{ from: string; to: string }> }) {
  const params = await props.params;

  const parsedFrom = decodeURIComponent(params.from).replaceAll('+', ' ').toLowerCase();
  const parsedTo = decodeURIComponent(params.to).replaceAll('+', ' ').toLowerCase();
  const now = getTime();

  return (
    <main className="flex flex-grow flex-col items-center gap-6 py-8">
      <section className="relative flex flex-col items-center gap-1">
        <BackButton />

        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Live Departures</h1>

        {/* Station, last updated and buttons */}
        <HeadingWidget
          text={`${toTitleCase(parsedFrom)} to ${parsedTo === 'any' ? 'Any Station' : toTitleCase(parsedTo)}`}
          tag={`Last updated at ${now}`}
        >
          <Link
            prefetch={false}
            href={`/my-journeys/new?from=${params.from}&to=${params.to}`}
            className="w-full"
          >
            <Button className="w-full md:w-56">
              <BookmarkIcon /> Save Journey
            </Button>
          </Link>
        </HeadingWidget>
      </section>

      {/* Trains */}
      <section className="flex w-full flex-col items-center gap-4">
        <Suspense fallback={<Skeletons className="h-56" />}>
          <TrainInfoSection from={parsedFrom} to={parsedTo !== 'any' ? parsedTo : undefined} />
        </Suspense>
      </section>
    </main>
  );
}

export const dynamic = 'force-dynamic';
