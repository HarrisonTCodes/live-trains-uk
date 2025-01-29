'use client';
import { useEffect, useState } from 'react';
import { Journey } from '../interfaces';
import JourneyInfo from '../components/journey-info/JourneyInfo';
import Button from '../components/button/Button';
import Link from 'next/link';
import Notice from '../components/notice/Notice';
import Modal from '../components/modal/Modal';
import { FaArrowRightToBracket, FaPlus, FaTrash } from 'react-icons/fa6';
import Skeletons from '../components/skeletons/Skeletons';

export default function JourneysPage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [deleteJourneyId, setDeleteJourneyId] = useState<number | undefined>();

  const deleteJourney = (id: number) => {
    // Reset selected journey to delete
    setDeleteJourneyId(undefined);

    // Actually delete journey
    fetch(`/api/journeys/${id}`, {
      method: 'DELETE',
    });

    // Remove journey from current list (so no need to refetch data)
    setJourneys(journeys.filter((journey: Journey) => journey.id !== id));
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch('/api/journeys')
      .then((response) => response.json())
      .then((response) => {
        setJourneys(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      {/* Modal */}
      {deleteJourneyId !== undefined && (
        <Modal
          title="Delete Journey?"
          confirmAction={() => deleteJourney(deleteJourneyId)}
          cancelAction={() => setDeleteJourneyId(undefined)}
          confirmLabel="Delete"
          confirmIcon={<FaTrash />}
        >
          <p className="text-center">
            Are you sure you want to delete{' '}
            <span className="font-bold">
              {journeys.find((journey) => journey.id === deleteJourneyId)!.name}
            </span>
            ? This action cannot be reversed.
          </p>
        </Modal>
      )}
      {/* Page content */}
      <main
        className={`flex flex-col items-center gap-6 py-8 ${deleteJourneyId !== undefined && 'pointer-events-none blur-sm'}`}
      >
        <section className="flex flex-col items-center gap-1">
          <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">My Journeys</h1>
          <div className="flex w-[90vw] max-w-[700px] flex-col items-center justify-center gap-4 rounded-lg border border-stone-300 bg-white p-3 md:flex-row md:justify-between">
            {/* Caption*/}
            <h2 className="text-center text-stone-600 md:text-left">
              Save your regular routes for quick access to live departures
            </h2>

            {/* New journey button */}
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row md:w-fit md:justify-end">
              <Link href={'/signout'}>
                <Button width="w-full sm:w-[40vw] md:w-40">
                  <FaArrowRightToBracket /> Sign Out
                </Button>
              </Link>
              <Link href={'/my-journeys/new'}>
                <Button width="w-full sm:w-[40vw] md:w-40">
                  <FaPlus /> Add Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Journeys */}
        <section className="flex w-full flex-col items-center gap-4">
          {loading ? (
            <Skeletons height="h-40" />
          ) : error ? (
            <Notice
              notice="Error"
              description="There was an error getting journeys, please try again."
              status="fail"
            />
          ) : journeys.length === 0 ? (
            <Notice
              notice="No journeys"
              description="You don't have any saved journeys yet. Click 'Add Journey' to create one."
            />
          ) : (
            journeys.map((journey: Journey) => (
              <JourneyInfo
                key={`journey ${journey.name}`}
                journey={journey}
                setDeleteJourneyId={setDeleteJourneyId}
              />
            ))
          )}
        </section>
      </main>
    </>
  );
}
