'use client';
import { useRouter } from 'next/navigation';

export default function Button({
  children,
  onClick,
  submit,
  width,
  back,
  secondary,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  submit?: boolean;
  width?: string;
  back?: boolean;
  secondary?: boolean;
}) {
  const router = useRouter();

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg p-2 font-medium transition ${secondary ? 'border border-stone-300 hover:bg-stone-100' : 'border border-blue-800 bg-blue-800 text-white hover:border-blue-600 hover:bg-blue-600'} ${width}`}
      // If button has no onclick and is a back button, onclick navigate to previous page
      onClick={onClick ?? (back ? () => router.back() : () => {})}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}
