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
      {/* Details */}
      <div className="relative flex w-[90vw] max-w-[500px] flex-col rounded-xl bg-gray-200 px-[14.5px]">
        {/* Line */}
        <div
          className="absolute left-5 top-[50px] w-1 rounded-full bg-blue-900"
          style={{ height: `calc(100% - 100px)` }}
        />
        {/* Calling points */}
        <section>
          {callingPoints.callingPoints.map((callingPoint: CallingPoint) => (
            <CallingPointInfo
              key={`calling point ${callingPoint.station}`}
              callingPoint={callingPoint}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

export const dynamic = 'force-dynamic';
