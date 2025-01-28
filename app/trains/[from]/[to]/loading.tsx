import Button from '@/app/components/button/Button';
import Skeletons from '@/app/components/skeletons/Skeletons';
import Tag from '@/app/components/tag/Tag';
import { FaArrowRightArrowLeft, FaBookmark, FaClock } from 'react-icons/fa6';

export default function Loading() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="flex flex-col items-center gap-1">
        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Live Departures</h1>

        <div className="flex w-[90vw] max-w-[700px] flex-col items-center justify-center gap-4 rounded-lg border border-stone-300 bg-white p-3 md:flex-row md:justify-between">
          {/* Stations and last updated */}
          <div className="flex flex-col items-center gap-1 md:items-start">
            <h2 className="text-center text-stone-600 md:pl-1">Loading departures...</h2>
            <Tag>
              <FaClock className="text-stone-600" /> Not yet updated
            </Tag>
          </div>

          {/* Switch and save buttons */}
          <div className="flex w-full justify-center gap-2 md:w-fit md:justify-end">
            <Button width="w-[40vw] md:w-28">
              <FaArrowRightArrowLeft /> Switch
            </Button>
            <Button width="w-[40vw] md:w-28">
              <FaBookmark /> Save
            </Button>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center gap-4">
        <Skeletons height="h-40" />
      </section>
    </main>
  );
}
