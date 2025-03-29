import { InfoIcon, CircleCheckIcon, CircleAlertIcon, TriangleAlertIcon } from 'lucide-react';

export default function Notice({
  notice,
  description,
  className,
  status = 'info',
}: {
  notice: string;
  description: string;
  className?: string;
  status?: 'info' | 'success' | 'fail' | 'alert' | 'warning';
}) {
  return (
    <div
      className={`min-h-24 w-[90vw] max-w-[700px] gap-2 rounded-lg border p-2 ${status === 'info' && 'border-stone-300 bg-white'} ${status === 'success' && 'border-green-700 bg-green-50 text-green-900'} ${(status === 'fail' || status === 'alert') && 'border-red-700 bg-red-50 text-red-900'} ${status === 'warning' && 'border-orange-700 bg-orange-50 text-orange-900'} ${className}`}
    >
      <h2 className="flex items-center gap-2 text-xl font-medium">
        {status === 'info' && <InfoIcon className="text-blue-800" />}
        {status === 'success' && <CircleCheckIcon />}
        {status === 'fail' && <TriangleAlertIcon />}
        {(status === 'alert' || status === 'warning') && <CircleAlertIcon />}
        {notice}
      </h2>
      <p>{description}</p>
    </div>
  );
}
