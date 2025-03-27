'use client';
import { useEffect, useState } from 'react';
import { Journey } from '../interfaces';
import JourneyInfo from '../components/journey-info/JourneyInfo';
import Button from '../components/button/Button';
import Link from 'next/link';
import Notice from '../components/notice/Notice';
import Modal from '../components/modal/Modal';
import Skeletons from '../components/skeletons/Skeletons';
import HeadingWidget from '../components/heading-widget/HeadingWidget';
import { LogOutIcon, PlusIcon, Trash2Icon } from 'lucide-react';

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
          confirmIcon={<Trash2Icon />}
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
        className={`flex flex-grow flex-col items-center gap-6 py-8 ${deleteJourneyId !== undefined && 'pointer-events-none blur-sm'}`}
      >
        <section className="flex flex-col items-center gap-1">
          {/* Heading */}
          <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">My Journeys</h1>

          {/* Caption and buttons */}
          <HeadingWidget text="Save your regular routes for quick access to live departures">
            <Link href={'/signout'} className="w-full whitespace-nowrap md:w-40">
              <Button className="w-full" secondary>
                <LogOutIcon /> Sign Out
              </Button>
            </Link>
            <Link href={'/my-journeys/new'} className="w-full md:w-40">
              <Button className="w-full whitespace-nowrap">
                <PlusIcon /> Add Journey
              </Button>
            </Link>
          </HeadingWidget>
        </section>

        {/* Journeys */}
        <section className="flex w-full flex-col items-center gap-4">
          {loading ? (
            <Skeletons className="h-56 sm:h-48" />
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
                key={`journey ${journey.id}`}
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
