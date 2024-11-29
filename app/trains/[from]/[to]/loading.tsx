import Button from '@/app/components/button/Button';
import PageHeading from '@/app/components/page-heading/PageHeading';
import TrainSkeletons from '@/app/components/skeletons/TrainSkeletons';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

export default function Loading() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Live Departures" subHeading="Loading services..." href="/" />
      <Button>
        <FaArrowRightArrowLeft /> Switch
      </Button>
      <TrainSkeletons />
    </main>
  );
}
