import { InfoIcon, CircleCheckIcon, CircleAlertIcon, TriangleAlertIcon } from 'lucide-react';

const statusDetails = {
  info: {
    style: 'border-stone-300 bg-white',
    icon: <InfoIcon className="text-blue-800" />,
  },
  success: {
    style: 'border-green-700 bg-green-50 text-green-900',
    icon: <CircleCheckIcon />,
  },
  fail: {
    style: 'border-red-700 bg-red-50 text-red-900',
    icon: <TriangleAlertIcon />,
  },
  alert: {
    style: 'border-red-700 bg-red-50 text-red-900',
    icon: <CircleAlertIcon />,
  },
  warning: {
    style: 'border-orange-700 bg-orange-50 text-orange-900',
    icon: <CircleAlertIcon />,
  },
};

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
      className={`min-h-24 w-[90vw] max-w-[700px] gap-2 rounded-lg border p-2 ${statusDetails[status].style} ${className}`}
    >
      <h2 className="flex items-center gap-2 text-xl font-medium">
        {statusDetails[status].icon}
        {notice}
      </h2>
      <p>{description}</p>
    </div>
  );
}
