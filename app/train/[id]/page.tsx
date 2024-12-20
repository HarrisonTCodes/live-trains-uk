import AlertInfo from '@/app/components/alert-info/AlertInfo';
import CallingPointInfo from '@/app/components/calling-point-info/CallingPointInfo';
import PageHeading from '@/app/components/page-heading/PageHeading';
import { CallingPoint } from '@/app/interfaces';
import getService from '@/app/utils/getService';

export default async function TrainPage({ params }: { params: { id: string } }) {
  const callingPoints = await getService(params.id);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      {/* Heading */}
      <PageHeading
        heading="Service details"
        subHeading={`(Last Updated at ${callingPoints.time})`}
      />
      {/* Cancel reasons */}
      {callingPoints.cancelReasons.map((cancelReason: string) => (
        <AlertInfo
          key={cancelReason}
          alert="Some stops cancelled"
          description={`${cancelReason}. See affected calling points below.`}
        />
      ))}
      {/* Calling points */}
      <section className="relative flex w-[90vw] max-w-[500px] flex-col rounded-xl bg-gray-200 px-[14.5px]">
        {callingPoints.callingPoints.map((callingPoint: CallingPoint, index: number) => (
          <CallingPointInfo
            key={`calling point ${callingPoint.station}`}
            callingPoint={callingPoint}
            isFirstPoint={index === 0}
            isLastPoint={index === callingPoints.callingPoints.length - 1}
          />
        ))}
      </section>
    </main>
  );
}

export const dynamic = 'force-dynamic';
