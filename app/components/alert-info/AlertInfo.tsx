import toTitleCase from '@/app/utils/toTitleCase';
import { FaCircleExclamation } from 'react-icons/fa6';

export default function AlertInfo({ alert, description }: { alert: string; description: string }) {
  return (
    <div className="min-h-24 w-11/12 max-w-[500px] rounded-xl border-2 border-red-600 bg-white p-2">
      <h2 className="flex items-center gap-2 text-xl font-medium text-red-800">
        <FaCircleExclamation /> {toTitleCase(alert.replaceAll('-', ' '))}
      </h2>
      <p>{description}</p>
    </div>
  );
}
