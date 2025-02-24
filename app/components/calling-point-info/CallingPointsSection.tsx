import getService from '@/app/utils/getService';
import Notice from '../notice/Notice';
import CallingPointInfo from './CallingPointInfo';
import { CallingPoint } from '@/app/interfaces';

export default async function CallingPointsSection({ id, to }: { id: string; to?: string }) {
  const callingPoints = await getService(id, to);

  return (
    <section className="flex flex-col items-center gap-6">
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
    </section>
  );
}
