'use client';
import CallingPointInfo from '@/app/components/calling-point-info/CallingPointInfo';
import PageHeading from '@/app/components/page-heading/PageHeading';
import { CallingPoint } from '@/app/interfaces';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTriangleExclamation } from 'react-icons/fa6';

export default function TrainPage() {
  const [callingPoints, setCallingPoints] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const pathname = usePathname();
  const splitPathname = pathname.split('/');

  const getData = () => {
    setLoading(true);
    setError(false);
    fetch(`/api/services/${splitPathname[splitPathname.length - 1]}`)
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
      <PageHeading heading="Service details" />
      {/* Details */}
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
        {/* Calling points */}
        <section>
          {callingPoints.map((callingPoint: CallingPoint) => (
            <CallingPointInfo
              key={`calling point ${callingPoint.station}`}
              callingPoint={callingPoint}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
