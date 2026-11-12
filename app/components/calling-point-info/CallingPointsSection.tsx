import { getService } from '@/app/utils/services';
import Notice from '../notice/Notice';
import CallingPointsList from './CallingPointsList';

export default async function CallingPointsSection({ id, to }: { id: string; to?: string }) {
  const callingPoints = await getService(id, to);

  return (
    <section className="flex flex-col items-center gap-6">
      {/* Cancel reasons */}
      {callingPoints.cancelReasons.map((cancelReason: string) => (
        <Notice key={cancelReason} notice="Some stops cancelled" status="alert">
          {cancelReason}. See affected calling points below.
        </Notice>
      ))}

      {/* Calling points */}
      <section className="relative flex w-[90vw] max-w-[700px] flex-col rounded-lg border border-gray-300 bg-white px-2 pb-4">
        <CallingPointsList callingPoints={callingPoints.callingPoints} />
      </section>
    </section>
  );
}
