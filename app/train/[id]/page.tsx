'use client';
import { CallingPoint } from '@/app/interfaces';
import formatEstimated from '@/app/utils/formatEstimated';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaTriangleExclamation } from 'react-icons/fa6';

export default function TrainPage() {
  const [callingPoints, setCallingPoints] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const splitPathname = pathname.split('/');

  const getData = () => {
    setLoading(true);
    fetch(`/api/service/${splitPathname[splitPathname.length - 1]}`)
      .then((response) => response.json())
      .then((response) => {
        setCallingPoints(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    getData();
  }, [pathname]);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      {/* Heading */}
      <h1
        className="flex cursor-pointer items-center gap-2 text-3xl font-medium text-blue-900"
        onClick={() => router.back()}
      >
        <FaArrowLeft size={24} />
        Return to Departures
      </h1>
      {/* Calling points */}
      <div
        className={`relative flex w-[90vw] max-w-[500px] flex-col rounded-xl bg-gray-200 px-[14.5px] ${loading ? 'h-[100vh]' : ''}`}
      >
        {/* Loading message */}
        {loading && (
          <h2 className="py-4 text-center text-xl text-gray-400">Loading service details...</h2>
        )}
        {/* Error message */}
        {error && (
          <h2 className="flex items-center justify-center gap-2 py-4 text-xl font-medium text-red-700">
            <FaTriangleExclamation size={24} color="ff0000" className="text-red-700" /> There was an
            error
          </h2>
        )}
        {/* Line */}
        {!loading && !error && (
          <div className="absolute left-5 h-full w-1 rounded-full bg-blue-900" />
        )}
        {/* Points */}
        <section>
          {callingPoints.map((callingPoint: CallingPoint) => (
            <section
              key={`${callingPoint.station} calling point`}
              className="flex items-center gap-2"
            >
              {/* Circle */}
              <div className="z-10 my-10 h-[16px] w-[16px] rounded-full bg-blue-700" />
              {/* Details */}
              <section className="w-full">
                <p className={`text-lg ${callingPoint.focus ? 'font-bold' : ''}`}>
                  {callingPoint.station}
                </p>
                <p>
                  {callingPoint.departureTime}
                  {callingPoint.estimatedDepartureTime && (
                    <span
                      className={
                        callingPoint.estimatedDepartureTime === 'Cancelled'
                          ? 'font-medium text-red-700'
                          : 'text-gray-600'
                      }
                    >
                      {formatEstimated(callingPoint.estimatedDepartureTime)}
                    </span>
                  )}
                </p>
              </section>
            </section>
          ))}
        </section>
      </div>
    </main>
  );
}
