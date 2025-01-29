import Button from '../../../components/button/Button';
import { FaArrowRightArrowLeft, FaBookmark, FaClock } from 'react-icons/fa6';
import TrainInfo from '../../../components/train-info/TrainInfo';
import toTitleCase from '../../../utils/toTitleCase';
import getServices from '../../../utils/getServices';
import Link from 'next/link';
import { Service } from '@/app/interfaces';
import Notice from '@/app/components/notice/Notice';
import Tag from '@/app/components/tag/Tag';

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
  const averageDuration =
    services.services.reduce(
      (accumulator: number, service: Service) => accumulator + service.duration,
      0,
    ) / services.services.length;

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <section className="flex flex-col items-center gap-1">
        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Live Departures</h1>

        <div className="flex w-[90vw] max-w-[700px] flex-col items-center justify-center gap-4 rounded-lg border border-stone-300 bg-white p-3 md:flex-row md:justify-between">
          {/* Stations and last updated */}
          <div className="flex flex-col items-center gap-1 md:items-start">
            <h2 className="text-center text-stone-600 md:pl-1 md:text-left">
              {toTitleCase(parsedFrom)} to {toTitleCase(parsedTo)}
            </h2>
            <Tag>
              <FaClock className="text-stone-600" />{' '}
              {services.time ? `Last updated at ${services.time}` : 'Not yet updated'}
            </Tag>
          </div>

          {/* Switch and save buttons */}
          <div className="flex w-full justify-center gap-2 md:w-fit md:justify-end">
            <Link prefetch={false} href={`/trains/${params.to}/${params.from}`}>
              <Button width="w-[40vw] md:w-28">
                <FaArrowRightArrowLeft /> Switch
              </Button>
            </Link>
            <Link prefetch={false} href={`/my-journeys/new?from=${params.from}&to=${params.to}`}>
              <Button width="w-[40vw] md:w-28">
                <FaBookmark /> Save
              </Button>
            </Link>
          </div>
        </div>
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
          />
        )}
      </section>
    </main>
  );
}

export const dynamic = 'force-dynamic';
