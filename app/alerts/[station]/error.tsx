'use client';
import BackButton from '@/app/components/button/BackButton';
import Notice from '@/app/components/notice/Notice';

export default function Error() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="relative w-[90vw] max-w-[700px]">
        <BackButton />
        <h1 className="text-center text-2xl font-bold text-blue-900">Alerts and Disruptions</h1>
      </section>
      <Notice
        notice="Error"
        description="There was an error retrieving alerts for this station. Please make sure you choose a valid station from the dropdown menu."
        status="fail"
      />
    </main>
  );
}
