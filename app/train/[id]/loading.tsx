import PageHeading from '@/app/components/page-heading/PageHeading';

export default function Loading() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Service details" subHeading="Loading details..." />
      <div className="relative h-[100vh] w-[90vw] max-w-[500px] rounded-xl border-2 border-gray-300 bg-white">
        <h2 className="py-4 text-center text-xl text-gray-600">Loading service details...</h2>
      </div>
    </main>
  );
}
