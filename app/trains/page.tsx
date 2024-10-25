'use client';
import { useEffect, useState } from 'react';
import { Service } from '../interfaces';
import Button from '../components/button/Button';
import { FaArrowRightArrowLeft, FaArrowRotateRight, FaTriangleExclamation } from 'react-icons/fa6';
import TrainInfo from '../components/train-info/TrainInfo';
import { useRouter } from 'next/navigation';
import toTitleCase from '../utils/toTitleCase';
import Skeletons from '../components/skeletons/Skeletons';
import PageHeading from '../components/page-heading/PageHeading';

export default function TrainsPage({
  searchParams,
}: {
  searchParams: { from: string; to: string };
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [averageDuration, setAverageDuration] = useState<number>(0);
  const [fromCrs, setFromCrs] = useState<string>('');
  const [toCrs, setToCrs] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const getData = () => {
    setLoading(true);
    setError(false);
    fetch(
      `/api/services?from=${searchParams.from.toLowerCase()}&to=${searchParams.to.toLowerCase()}`,
    )
      .then((response) => response.json())
      .then((response) => {
        const responseServices = response.services ?? [];
        setServices(responseServices);
        if (responseServices.length > 0) {
          setAverageDuration(
            responseServices.reduce(
              (accumulator: number, service: Service) => accumulator + service.duration,
              0,
            ) / responseServices.length,
          );
        }
        setFromCrs(response.from);
        setToCrs(response.to);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      });
  };

  const switchStations = () => {
    router.push(`/trains?from=${searchParams.to}&to=${searchParams.from}`);
  };

  useEffect(() => {
    getData();
  }, [searchParams]);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      {/* Headings */}
      <PageHeading
        heading="Live Departures"
        subHeading={`${toTitleCase(searchParams.from)} to ${toTitleCase(searchParams.to)}`}
        href="/"
      />
      {/* Buttons */}
      <section className="flex gap-2">
        <Button onClick={getData}>
          <FaArrowRotateRight /> Refresh
        </Button>
        <Button onClick={switchStations}>
          <FaArrowRightArrowLeft /> Switch
        </Button>
      </section>
      {/* Trains */}
      <section className="flex w-full flex-col items-center gap-4">
        {loading ? (
          <Skeletons />
        ) : error ? (
          <h2 className="flex items-center gap-2 text-2xl font-medium text-red-700">
            <FaTriangleExclamation /> There was an error
          </h2>
        ) : services.length === 0 ? (
          <h2 className="flex items-center gap-2 text-2xl font-medium text-gray-500">
            <FaTriangleExclamation className="text-[#f3a600]" /> No services at the moment
          </h2>
        ) : (
          services.map((service) => (
            <TrainInfo
              key={service.serviceId}
              service={service}
              from={fromCrs}
              to={toCrs}
              averageDuration={averageDuration}
            />
          ))
        )}
      </section>
    </main>
  );
}
