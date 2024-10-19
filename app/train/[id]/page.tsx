'use client';
import { CallingPoint } from '@/app/interfaces';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';

export default function TrainPage() {
  const [callingPoints, setCallingPoints] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const splitPathname = pathname.split('/');

  const getData = () => {
    fetch(`/api/service/${splitPathname[splitPathname.length - 1]}`)
      .then((response) => response.json())
      .then((response) => setCallingPoints(response));
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
      <div className="relative flex w-[90vw] max-w-[500px] flex-col rounded-xl bg-gray-200 px-[14.5px]">
        {/* Line */}
        <div className="absolute left-5 h-full w-1 rounded-full bg-blue-900" />
        {/* Points */}
        <section>
          {callingPoints.map((callingPoint: CallingPoint) => (
            <section className="flex items-center gap-2">
              {/* Circle */}
              <div className="z-10 my-10 h-[16px] w-[16px] rounded-full bg-blue-700" />
              {/* Details */}
              <section className="w-full">
                <p className={`text-lg ${callingPoint.focus ? 'font-bold' : ''}`}>
                  {callingPoint.station}
                </p>
                <p>
                  {callingPoint.departureTime}
                  {callingPoint.estimatedDepartureTime
                    ? ` (${callingPoint.estimatedDepartureTime})`
                    : ''}
                </p>
              </section>
            </section>
          ))}
        </section>
      </div>
    </main>
  );
}
