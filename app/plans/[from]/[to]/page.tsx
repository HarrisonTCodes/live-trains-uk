import BackButton from '@/app/components/button/BackButton';
import Button from '@/app/components/button/Button';
import HeadingWidget from '@/app/components/heading-widget/HeadingWidget';
import Notice from '@/app/components/notice/Notice';
import PlanInfoSection from '@/app/components/plan-info/PlanInfoSection';
import Skeletons from '@/app/components/skeletons/Skeletons';
import getTime from '@/app/utils/getTime';
import toTitleCase from '@/app/utils/toTitleCase';
import { BookmarkIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function PlanPage(props: { params: Promise<{ from: string; to: string }> }) {
  const params = await props.params;

  const parsedFrom = decodeURIComponent(params.from).replaceAll('+', ' ').toLowerCase();
  const parsedTo = decodeURIComponent(params.to).replaceAll('+', ' ').toLowerCase();
  const now = getTime();

  return (
    <main className="flex flex-grow flex-col items-center gap-6 py-8">
      <section className="relative flex flex-col items-center gap-1">
        <BackButton />

        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Journey Plans</h1>

        {/* Stations, time and button */}
        <HeadingWidget
          text={`${toTitleCase(parsedFrom)} to ${parsedTo === 'any' ? 'Any Station' : toTitleCase(parsedTo)}`}
          tag={`Last updated at ${now}`}
        >
          <Link
            prefetch={false}
            href={`/my-journeys/new?from=${params.from}&to=${params.to}&type=plans`}
            className="w-full"
          >
            <Button className="w-full md:w-56">
              <BookmarkIcon /> Save Journey
            </Button>
          </Link>
        </HeadingWidget>
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

      {/* Plans */}
      <Suspense fallback={<Skeletons className="h-96" />}>
        <PlanInfoSection from={parsedFrom} to={parsedTo} />
      </Suspense>
    </main>
  );
}
