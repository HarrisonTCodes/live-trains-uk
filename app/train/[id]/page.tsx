import Button from '@/app/components/button/Button';
import CallingPointInfo from '@/app/components/calling-point-info/CallingPointInfo';
import HeadingWidget from '@/app/components/heading-widget/HeadingWidget';
import Notice from '@/app/components/notice/Notice';
import { CallingPoint } from '@/app/interfaces';
import getService from '@/app/utils/getService';
import toTitleCase from '@/app/utils/toTitleCase';
import { FaArrowLeft } from 'react-icons/fa6';

export default async function TrainPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ to: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const callingPoints = await getService(params.id, searchParams.to);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="flex flex-col items-center gap-1">
        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Service Details</h1>

        {/* Terminating station, last updated and back button */}
        <HeadingWidget
          text={`Terminating at ${toTitleCase(callingPoints.callingPoints[callingPoints.callingPoints.length - 1].station)}`}
          tag={`Last updated at ${callingPoints.time}`}
        >
          <Button width="w-full md:w-56" back>
            <FaArrowLeft /> Back to departures
          </Button>
        </HeadingWidget>
      </section>

      {/* Cancel reasons */}
      {callingPoints.cancelReasons.map((cancelReason: string) => (
        <Notice
          key={cancelReason}
          notice="Some stops cancelled"
          description={`${cancelReason}. See affected calling points below.`}
          status="alert"
        />
      ))}

      {/* Calling points */}
      <section className="relative flex w-[90vw] max-w-[700px] flex-col rounded-lg border border-gray-300 bg-white px-2 pb-4">
        {callingPoints.callingPoints.map((callingPoint: CallingPoint, index: number) => (
          <CallingPointInfo
            key={`calling point ${index}`}
            callingPoint={callingPoint}
            isFirstPoint={index === 0}
            isLastPoint={index === callingPoints.callingPoints.length - 1}
            departed={!callingPoint.estimatedDepartureTime}
          />
        ))}
      </section>
    </main>
  );
}

export const dynamic = 'force-dynamic';
