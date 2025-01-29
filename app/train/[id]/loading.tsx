import Button from '@/app/components/button/Button';
import HeadingWidget from '@/app/components/heading-widget/HeadingWidget';
import { FaArrowLeft } from 'react-icons/fa6';

export default function Loading() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="flex flex-col items-center gap-1">
        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Service Details</h1>

        {/* Terminating station, last updated and back button */}
        <HeadingWidget text="Loading service..." tag="Not yet updated">
          <Button width="w-full md:w-56" back>
            <FaArrowLeft /> Back to departures
          </Button>
        </HeadingWidget>
      </section>

      <div className="relative h-[100vh] w-[90vw] max-w-[700px] rounded-lg border border-gray-300 bg-white">
        <h2 className="py-4 text-center text-xl text-stone-600">Loading service details...</h2>
      </div>
    </main>
  );
}
