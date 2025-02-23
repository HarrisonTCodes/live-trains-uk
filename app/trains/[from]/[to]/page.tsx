import Button from '../../../components/button/Button';
import TrainInfo from '../../../components/train-info/TrainInfo';
import toTitleCase from '../../../utils/toTitleCase';
import getServices from '../../../utils/getServices';
import Link from 'next/link';
import { Service } from '@/app/interfaces';
import Notice from '@/app/components/notice/Notice';
import HeadingWidget from '@/app/components/heading-widget/HeadingWidget';
import { ArrowRightLeftIcon, BookmarkIcon } from 'lucide-react';

export default async function TrainsPage(props: { params: Promise<{ from: string; to: string }> }) {
  const params = await props.params;

  const parsedFrom = decodeURIComponent(params.from).replaceAll('+', ' ').toLowerCase();
  const parsedTo = decodeURIComponent(params.to).replaceAll('+', ' ').toLowerCase();

  const services = await getServices(parsedFrom, parsedTo === 'any' ? undefined : parsedTo);
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

        {/* Station, last updated and buttons */}
        <HeadingWidget
          text={`${toTitleCase(parsedFrom)} to ${toTitleCase(parsedTo)}`}
          tag={services.time ? `Last updated at ${services.time}` : 'Not yet updated'}
        >
          <Link prefetch={false} href={`/trains/${params.to}/${params.from}`}>
            <Button width="w-[40vw] md:w-40" secondary disabled={parsedTo === 'any'}>
              <ArrowRightLeftIcon /> Switch
            </Button>
          </Link>
          <Link prefetch={false} href={`/my-journeys/new?from=${params.from}&to=${params.to}`}>
            <Button width="w-[40vw] md:w-40">
              <BookmarkIcon /> Save
            </Button>
          </Link>
        </HeadingWidget>
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
              toStation={service.arrivalStation}
              toCrs={service.arrivalCrs}
              averageDuration={averageDuration}
            />
          ))
        ) : (
          <Notice
            notice="No services"
            description={
              parsedTo === 'any'
                ? `There are currently no departures running from ${toTitleCase(parsedFrom)}`
                : `There are currently no direct services running between ${toTitleCase(parsedFrom)} and ${toTitleCase(parsedTo)}.`
            }
          />
        )}
      </section>
    </main>
  );
}

export const dynamic = 'force-dynamic';
