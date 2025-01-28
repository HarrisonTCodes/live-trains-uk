import {
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleInfo,
  FaTriangleExclamation,
} from 'react-icons/fa6';

export default function Notice({
  notice,
  description,
  status,
}: {
  notice: string;
  description: string;
  status?: 'success' | 'fail' | 'alert';
}) {
  return (
    <div
      className={`min-h-24 w-[90vw] max-w-[700px] gap-2 rounded-lg border p-2 ${!status && 'border-stone-300 bg-white'} ${status === 'success' && 'border-green-700 bg-green-50 text-green-900'} ${(status === 'fail' || status === 'alert') && 'border-red-700 bg-red-50 text-red-900'}`}
    >
      <h2 className="flex items-center gap-1 text-xl font-medium">
        {!status && <FaCircleInfo className="text-blue-800" />}
        {status === 'success' && <FaCircleCheck />}
        {status === 'fail' && <FaTriangleExclamation />}
        {status === 'alert' && <FaCircleExclamation />}
        {notice}
      </h2>
      <p>{description}</p>
    </div>
  );
}
