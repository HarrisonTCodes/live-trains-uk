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
      <h1
        className="flex items-center gap-2 text-3xl font-medium text-blue-900"
        onClick={() => router.back()}
      >
        <FaArrowLeft size={24} />
        Return
      </h1>
      {callingPoints.map((callingPoint: CallingPoint) => (
        <p>
          {callingPoint.station} {callingPoint.departureTime} {callingPoint.estimatedDepartureTime}
        </p>
      ))}
    </main>
  );
}
