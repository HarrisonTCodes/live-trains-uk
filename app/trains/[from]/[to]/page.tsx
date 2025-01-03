import Button from '../../../components/button/Button';
import { FaArrowRightArrowLeft, FaBookmark, FaTriangleExclamation } from 'react-icons/fa6';
import TrainInfo from '../../../components/train-info/TrainInfo';
import toTitleCase from '../../../utils/toTitleCase';
import PageHeading from '../../../components/page-heading/PageHeading';
import getServices from '../../../utils/getServices';
import Link from 'next/link';
import { Service } from '@/app/interfaces';
import Notice from '@/app/components/notice/Notice';

export default async function TrainsPage(props: { params: Promise<{ from: string; to: string }> }) {
  const params = await props.params;
  const parsedFrom = params.from
    .replaceAll('%2B', ' ')
    .replaceAll('%20', ' ')
    .replaceAll('%26', '&')
    .toLowerCase();
  const parsedTo = params.to
    .replaceAll('%2B', ' ')
    .replaceAll('%20', ' ')
    .replaceAll('%26', '&')
    .toLowerCase();
  const services = await getServices(parsedFrom, parsedTo);
  const lastUpdated = services.time ? ` (Last Updated at ${services.time})` : '';
  const averageDuration =
    services.services.reduce(
      (accumulator: number, service: Service) => accumulator + service.duration,
      0,
    ) / services.services.length;

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      {/* Headings */}
      <PageHeading
        heading="Live Departures"
        subHeading={`${toTitleCase(parsedFrom)} to ${toTitleCase(parsedTo)}${lastUpdated}`}
        href="/"
      />
      {/* Buttons */}
      <section className="flex gap-2">
        <Link prefetch={false} href={`/trains/${params.to}/${params.from}`}>
          <Button>
            <FaArrowRightArrowLeft /> Switch
          </Button>
        </Link>
        <Link prefetch={false} href={`/my-journeys/new?from=${params.from}&to=${params.to}`}>
          <Button>
            <FaBookmark /> Save
          </Button>
        </Link>
      </section>
      {/* Trains */}
      <section className="flex w-full flex-col items-center gap-4">
        {services.services.length > 0 ? (
          services.services.map((service: Service) => (
            <TrainInfo
              key={service.serviceId}
              service={service}
              fromStation={parsedFrom}
              fromCrs={services.fromCrs}
              toStation={parsedTo}
              toCrs={services.toCrs}
              averageDuration={averageDuration}
            />
          ))
        ) : (
          <Notice
            notice="No services"
            description={`There are currently no direct services running between ${toTitleCase(parsedFrom)} and ${toTitleCase(parsedTo)}.`}
            icon={<FaTriangleExclamation className="text-[#ffbf00]" color="#ffbf00" />}
          />
        )}
      </section>
    </main>
  );
}

export const dynamic = 'force-dynamic';
