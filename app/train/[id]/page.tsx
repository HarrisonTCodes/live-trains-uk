import Button from '@/app/components/button/Button';
import CallingPointsSection from '@/app/components/calling-point-info/CallingPointsSection';
import HeadingWidget from '@/app/components/heading-widget/HeadingWidget';
import Skeletons from '@/app/components/skeletons/Skeletons';
import getTime from '@/app/utils/getTime';
import { ArrowLeftIcon } from 'lucide-react';
import { Suspense } from 'react';

export default async function TrainPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ to: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const now = getTime();

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="flex flex-col items-center gap-1">
        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Service Details</h1>

        {/* Last updated and back button */}
        <HeadingWidget text="Calling points and times" tag={`Last updated at ${now}`}>
          <Button width="w-full md:w-56" back>
            <ArrowLeftIcon /> Back to departures
          </Button>
        </HeadingWidget>
      </section>

      {/* Cancellation reasons and calling points */}
      <Suspense fallback={<Skeletons count={1} height="h-[100dvh]" />}>
        <CallingPointsSection id={params.id} to={searchParams.to} />
      </Suspense>
    </main>
  );
}

export const dynamic = 'force-dynamic';
