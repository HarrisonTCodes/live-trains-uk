'use client';
import { useEffect, useState } from 'react';
import { Service } from '../interfaces';
import Button from '../components/button/Button';
import { FaArrowRightArrowLeft, FaArrowRotateRight } from 'react-icons/fa6';
import TrainInfo from '../components/train-info/TrainInfo';
import { useRouter } from 'next/navigation';
import TrainInfoSkeletons from '../components/train-info/TrainInfoSkeletons';

export default function TrainsPage({
  searchParams,
}: {
  searchParams: { from: string; to: string };
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [fromCrs, setFromCrs] = useState<string>('');
  const [toCrs, setToCrs] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const getData = () => {
    setServices([]);
    setLoading(true);
    fetch(
      `/api/live-departures?from=${searchParams.from.toLowerCase()}&to=${searchParams.to.toLowerCase()}`,
    )
      .then((response) => response.json())
      .then((response) => {
        setServices(response.services ?? []);
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
      <section className="text-center">
        <h1 className="text-3xl font-medium text-blue-900">Live Departures</h1>
        <h2 className="text-lg font-medium text-blue-900">
          {searchParams.from} to {searchParams.to}
        </h2>
      </section>
      {/* Buttons */}
      <section className="flex gap-2">
        <Button onClick={getData}>
          <FaArrowRotateRight size={24} color="ffffff" className="text-white" />
          Refresh
        </Button>
        <Button onClick={switchStations}>
          <FaArrowRightArrowLeft size={24} color="ffffff" className="text-white" />
          Switch
        </Button>
      </section>
      {/* Trains */}
      <section className="flex w-full flex-col items-center gap-4">
        {loading ? (
          <TrainInfoSkeletons />
        ) : error ? (
          <p>There was an error</p>
        ) : services.length === 0 ? (
          <p>No services</p>
        ) : (
          services.map((service) => <TrainInfo service={service} from={fromCrs} to={toCrs} />)
        )}
      </section>
    </main>
  );
}
