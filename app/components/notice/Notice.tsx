import { InfoIcon, CircleCheckIcon, CircleAlertIcon, TriangleAlertIcon } from 'lucide-react';

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
      <h2 className="flex items-center gap-2 text-xl font-medium">
        {!status && <InfoIcon className="text-blue-800" />}
        {status === 'success' && <CircleCheckIcon />}
        {status === 'fail' && <TriangleAlertIcon />}
        {status === 'alert' && <CircleAlertIcon />}
        {notice}
      </h2>
      <p>{description}</p>
    </div>
  );
}
