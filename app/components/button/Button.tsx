'use client';
import { useRouter } from 'next/navigation';

export default function Button({
  children,
  onClick,
  submit,
  className,
  back,
  secondary,
  destructive,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  submit?: boolean;
  className?: string;
  back?: boolean;
  secondary?: boolean;
  destructive?: boolean;
  disabled?: boolean;
}) {
  const router = useRouter();
  const primary = !secondary && !destructive;

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg p-2 font-medium transition disabled:cursor-not-allowed ${secondary && 'border border-stone-300 enabled:hover:bg-stone-100 disabled:bg-stone-200 disabled:text-stone-400'} ${primary && 'border border-blue-800 bg-blue-800 text-white enabled:hover:border-blue-600 enabled:hover:bg-blue-600'} ${destructive && 'border border-red-700 bg-red-700 text-white enabled:hover:border-red-600 enabled:hover:bg-red-600'} ${className}`}
      // If button has no onclick and is a back button, onclick navigate to previous page
      onClick={onClick ?? (back ? () => router.back() : () => {})}
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
