import Button from '../../../components/button/Button';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import TrainInfo from '../../../components/train-info/TrainInfo';
import toTitleCase from '../../../utils/toTitleCase';
import PageHeading from '../../../components/page-heading/PageHeading';
import getServices from '../../../utils/getServices';
import Link from 'next/link';
import { Service } from '@/app/interfaces';

export default async function TrainsPage({ params }: { params: { from: string; to: string } }) {
  const parsedFrom = params.from.replaceAll('%2B', ' ').replaceAll('%20', ' ').toLowerCase();
  const parsedTo = params.to.replaceAll('%2B', ' ').replaceAll('%20', ' ').toLowerCase();
  const services = await getServices(parsedFrom, parsedTo);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      {/* Headings */}
      <PageHeading
        heading="Live Departures"
        subHeading={`${toTitleCase(parsedFrom)} to ${toTitleCase(parsedTo)} (Last Updated at ${services.time})`}
        href="/"
      />
      {/* Switch Button */}
      <Link prefetch={false} href={`/trains/${params.to}/${params.from}`}>
        <Button>
          <FaArrowRightArrowLeft /> Switch
        </Button>
      </Link>
      {/* Trains */}
      <section className="flex w-full flex-col items-center gap-4">
        {services.services.map((service: Service) => (
          <TrainInfo
            key={service.serviceId}
            service={service}
            fromStation={parsedFrom}
            fromCrs={services.fromCrs}
            toStation={parsedTo}
            toCrs={services.toCrs}
            averageDuration={0}
          />
        ))}
      </section>
    </main>
  );
}

export const dynamic = 'force-dynamic';
