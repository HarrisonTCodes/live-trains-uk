import Button from '../button/Button';
import { CheckIcon, XIcon } from 'lucide-react';

export default function Modal({
  children,
  title,
  destructive,
  confirmAction,
  cancelAction,
  confirmLabel,
  confirmIcon,
}: {
  children?: React.ReactNode;
  title: string;
  destructive?: boolean;
  confirmAction?: () => void;
  cancelAction?: () => void;
  confirmLabel?: string;
  confirmIcon?: React.ReactNode;
}) {
  return (
    <div className="fixed left-[50%] top-[50%] z-50 flex min-h-[250px] w-[90%] max-w-[450px] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-between rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-lg">
      <h2 className="text-xl font-bold text-blue-900">{title}</h2>
      {children}
      <section className="flex w-full justify-evenly gap-2 px-2">
        <Button onClick={cancelAction} className="w-full" variant="secondary">
          <XIcon /> Cancel
        </Button>
        <Button
          onClick={confirmAction}
          variant={destructive ? 'destructive' : 'primary'}
          className="w-full"
        >
          {confirmIcon ?? <CheckIcon />} {confirmLabel ?? 'OK'}
        </Button>
      </section>
    </div>
  );
}
