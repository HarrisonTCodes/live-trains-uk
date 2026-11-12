'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type { CallingPoint } from '@/app/types/app';
import CallingPointInfo from './CallingPointInfo';

export default function CallingPointsList({ callingPoints }: { callingPoints: CallingPoint[] }) {
  const [showDeparted, setShowDeparted] = useState(false);
  const departedCount = callingPoints.filter((point) => !point.estimatedDepartureTime).length;
  const firstVisiblePointIndex = showDeparted
    ? 0
    : callingPoints.findIndex((point) => Boolean(point.estimatedDepartureTime));

  return (
    <>
      {departedCount > 0 && (
        <button
          type="button"
          className="flex min-h-12 items-center justify-center gap-2 border-b border-gray-200 px-2 text-base font-medium text-blue-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          aria-expanded={showDeparted}
          onClick={() => setShowDeparted((shown) => !shown)}
        >
          {showDeparted ? (
            <ChevronUpIcon size={18} aria-hidden="true" />
          ) : (
            <ChevronDownIcon size={18} aria-hidden="true" />
          )}
          {showDeparted
            ? 'Hide'
            : `Show ${departedCount} departed ${departedCount === 1 ? 'stop' : 'stops'}`}
        </button>
      )}

      {callingPoints.map((callingPoint, index) => {
        const departed = !callingPoint.estimatedDepartureTime;

        if (departed && !showDeparted) return null;

        return (
          <CallingPointInfo
            key={`calling point ${index}`}
            callingPoint={callingPoint}
            isFirstPoint={index === firstVisiblePointIndex}
            isLastPoint={index === callingPoints.length - 1}
            departed={departed}
          />
        );
      })}
    </>
  );
}
