import Button from '@/app/components/button/Button';
import CallingPointInfo from '@/app/components/calling-point-info/CallingPointInfo';
import Notice from '@/app/components/notice/Notice';
import Tag from '@/app/components/tag/Tag';
import { CallingPoint } from '@/app/interfaces';
import getService from '@/app/utils/getService';
import toTitleCase from '@/app/utils/toTitleCase';
import { FaArrowLeft, FaClock } from 'react-icons/fa6';

export default async function TrainPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const callingPoints = await getService(params.id);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="flex flex-col items-center gap-1">
        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Service Details</h1>

        <div className="flex w-[90vw] max-w-[700px] flex-col items-center justify-center gap-4 rounded-lg border border-stone-300 bg-white p-3 sm:flex-row sm:justify-between">
          {/* Terminating station and last updated */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <h2 className="text-center text-stone-600 sm:pl-1 md:text-left">
              Terminating at{' '}
              {toTitleCase(
                callingPoints.callingPoints[callingPoints.callingPoints.length - 1].station,
              )}
            </h2>
            {callingPoints.time && (
              <Tag>
                <FaClock className="text-stone-600" /> Last updated at {callingPoints.time}
              </Tag>
            )}
          </div>

          {/* Back button */}
          <Button width="w-full sm:w-56" back>
            <FaArrowLeft /> Back to departures
          </Button>
        </div>
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
