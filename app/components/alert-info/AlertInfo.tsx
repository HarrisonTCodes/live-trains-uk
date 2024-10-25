import toTitleCase from '@/app/utils/toTitleCase';
import { FaCircleExclamation } from 'react-icons/fa6';

export default function AlertInfo({
  station,
  description,
}: {
  station: string;
  description: string;
}) {
  return (
    <div className="h-24 w-11/12 max-w-[500px] rounded-xl border-2 border-red-600 p-2">
      <h2 className="flex items-center gap-2 text-xl font-medium text-red-800">
        <FaCircleExclamation /> {toTitleCase(station)}
      </h2>
      <p>{description}</p>
    </div>
  );
}
