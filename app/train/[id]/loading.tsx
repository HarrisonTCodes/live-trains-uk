import Button from '@/app/components/button/Button';
import Tag from '@/app/components/tag/Tag';
import { FaArrowLeft, FaClock } from 'react-icons/fa6';

export default function Loading() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="flex flex-col items-center gap-1">
        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Service Details</h1>

        <div className="flex w-[90vw] max-w-[700px] flex-col items-center justify-center gap-4 rounded-lg border border-stone-300 bg-white p-3 sm:flex-row sm:justify-between">
          {/* Stations and last updated */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <h2 className="text-center text-stone-600 sm:pl-1">Loading service details...</h2>
            <Tag>
              <FaClock className="text-stone-600" /> Not yet updated
            </Tag>
          </div>

          {/* Switch and save buttons */}
          <div className="flex w-full sm:w-fit sm:justify-end">
            <Button width="w-full sm:w-56" back>
              <FaArrowLeft /> Back to departures
            </Button>
          </div>
        </div>
      </section>

      <div className="relative h-[100vh] w-[90vw] max-w-[700px] rounded-lg border border-gray-300 bg-white">
        <h2 className="py-4 text-center text-xl text-stone-600">Loading service details...</h2>
      </div>
    </main>
  );
}
