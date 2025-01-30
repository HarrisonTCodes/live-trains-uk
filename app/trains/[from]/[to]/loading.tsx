import Button from '@/app/components/button/Button';
import HeadingWidget from '@/app/components/heading-widget/HeadingWidget';
import Skeletons from '@/app/components/skeletons/Skeletons';
import { FaArrowRightArrowLeft, FaBookmark } from 'react-icons/fa6';

export default function Loading() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="flex flex-col items-center gap-1">
        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Live Departures</h1>

        {/* Station, last updated and buttons */}
        <HeadingWidget text="Loading departures..." tag="Not yet updated">
          <Button width="w-[40vw] md:w-28">
            <FaArrowRightArrowLeft /> Switch
          </Button>
          <Button width="w-[40vw] md:w-28">
            <FaBookmark /> Save
          </Button>
        </HeadingWidget>
      </section>

      <section className="flex w-full flex-col items-center gap-4">
        <Skeletons height="h-56" />
      </section>
    </main>
  );
}
