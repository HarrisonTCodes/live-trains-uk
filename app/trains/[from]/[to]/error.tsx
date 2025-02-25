'use client';
import BackButton from '@/app/components/button/BackButton';
import Notice from '@/app/components/notice/Notice';

export default function Error() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="relative w-[90vw] max-w-[700px]">
        <BackButton />
        <h1 className="text-center text-2xl font-bold text-blue-900">Live Departures</h1>
      </section>
      <Notice
        notice="Error"
        description="There was an error retrieving services between these stations. Please make sure you choose valid stations from the dropdown menu."
        status="fail"
      />
    </main>
  );
}
