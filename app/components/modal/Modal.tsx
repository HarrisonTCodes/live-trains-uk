import { FaCheck, FaX } from 'react-icons/fa6';
import Button from '../button/Button';

export default function Modal({
  children,
  title,
  confirmAction,
  cancelAction,
  confirmLabel,
  confirmIcon,
}: {
  children?: React.ReactNode;
  title: string;
  confirmAction?: () => void;
  cancelAction?: () => void;
  confirmLabel?: string;
  confirmIcon?: React.ReactNode;
}) {
  return (
    <div className="fixed left-[50%] top-[50%] z-50 flex min-h-[250px] w-[90%] max-w-[450px] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-between rounded-lg border border-gray-300 bg-white px-2 py-4 shadow-lg">
      <h2 className="text-xl font-bold text-blue-900">{title}</h2>
      {children}
      <section className="flex w-full justify-evenly gap-2">
        <Button onClick={confirmAction} width="w-full">
          {confirmIcon ?? <FaCheck />} {confirmLabel ?? 'OK'}
        </Button>
        <Button onClick={cancelAction} width="w-full">
          <FaX /> Cancel
        </Button>
      </section>
    </div>
  );
}
