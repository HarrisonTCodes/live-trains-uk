'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute left-0 rounded-lg p-1 text-blue-900 transition hover:bg-stone-200"
    >
      <ArrowLeftIcon />
    </button>
  );
}
