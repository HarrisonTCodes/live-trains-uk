'use client';
import { useEffect, useState } from 'react';
import { Journey } from '../interfaces';
import JourneyInfo from '../components/journey-info/JourneyInfo';
import Button from '../components/button/Button';
import { FaPlus, FaTrash, FaTriangleExclamation } from 'react-icons/fa6';
import Link from 'next/link';
import JourneySkeletons from '../components/skeletons/JourneySkeletons';
import PageHeading from '../components/page-heading/PageHeading';
import Notice from '../components/notice/Notice';
import Modal from '../components/modal/Modal';

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
      {deleteJourneyId !== undefined ? (
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
      ) : (
        <></>
      )}
      {/* Page content */}
      <main
        className={`flex flex-col items-center gap-6 py-8 ${deleteJourneyId !== undefined ? 'pointer-events-none blur-sm' : ''}`}
      >
        <PageHeading heading="My Journeys" backEnabled={false} />
        <Link href={'/my-journeys/new'}>
          <Button>
            <FaPlus /> Add Journey
          </Button>
        </Link>
        <section className="flex w-full flex-col items-center gap-4">
          {loading ? (
            <JourneySkeletons />
          ) : error ? (
            <Notice
              notice="Error"
              description="There was an error getting journeys, please try again"
              icon={<FaTriangleExclamation />}
              color="red-700"
            />
          ) : journeys.length === 0 ? (
            <h2 className="px-2 text-center text-2xl text-gray-400">
              No journeys found. Click above to add a new journey
            </h2>
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
