import PageHeading from '@/app/components/page-heading/PageHeading';

export default function Loading() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Service details" />
      <h2 className="text-xl font-medium text-gray-500">Loading service details...</h2>
    </main>
  );
}
