import BackButton from '@/app/components/button/BackButton';
import Button from '@/app/components/button/Button';
import HeadingWidget from '@/app/components/heading-widget/HeadingWidget';
import PlanInfoSection from '@/app/components/plan-info/PlanInfoSection';
import getPlans from '@/app/utils/getPlans';
import getTime from '@/app/utils/getTime';
import toTitleCase from '@/app/utils/toTitleCase';
import { BookmarkIcon } from 'lucide-react';
import Link from 'next/link';

export default async function PlanPage(props: { params: Promise<{ from: string; to: string }> }) {
  const params = await props.params;

  const parsedFrom = decodeURIComponent(params.from).replaceAll('+', ' ').toLowerCase();
  const parsedTo = decodeURIComponent(params.to).replaceAll('+', ' ').toLowerCase();

  return (
    <main className="flex flex-grow flex-col items-center gap-6 py-8">
      <section className="relative flex flex-col items-center gap-1">
        <BackButton />

        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Journey Plans</h1>

        {/* Stations, time and button */}
        <HeadingWidget
          text={`${toTitleCase(parsedFrom)} to ${parsedTo === 'any' ? 'Any Station' : toTitleCase(parsedTo)}`}
          tag={`Journey plans`}
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

      <PlanInfoSection from={parsedFrom} to={parsedTo} />
    </main>
  );
}
