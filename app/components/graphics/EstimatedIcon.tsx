import { CircleAlertIcon, CircleCheckIcon, ClockAlertIcon } from 'lucide-react';

export default function EstimatedIcon({ estimated }: { estimated?: string }) {
  if (estimated === 'Cancelled') {
    return <CircleAlertIcon size={16} />;
  } else if (estimated === 'On time') {
    return <CircleCheckIcon size={16} />;
  } else if (estimated === 'Delayed' || /\d/.test(estimated ?? '')) {
    return <ClockAlertIcon size={16} />;
  } else {
    return;
  }
}
