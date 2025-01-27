'use client';
import { useRouter } from 'next/navigation';

export default function Button({
  children,
  onClick,
  submit,
  width,
  back,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  submit?: boolean;
  width?: string;
  back?: boolean;
}) {
  const router = useRouter();

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg bg-blue-800 p-2 font-medium text-white hover:bg-blue-600 active:bg-blue-500 ${width}`}
      // If button has no onclick and is a back button, onclick navigate to previous page
      onClick={onClick ?? (back ? () => router.back() : () => {})}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}
