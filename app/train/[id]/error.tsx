'use client';
import Notice from '@/app/components/notice/Notice';

export default function Error() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Service Details</h1>
      <Notice
        notice="Error"
        description="There was an error trying to retrieve the service. This service may no longer exist"
        status="fail"
      />
    </main>
  );
}
