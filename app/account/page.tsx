'use client';
import Link from 'next/link';
import Button from '../components/button/Button';
import HeadingWidget from '../components/heading-widget/HeadingWidget';
import {
  BookmarkIcon,
  CalendarIcon,
  LogOutIcon,
  MailIcon,
  Trash2Icon,
  UserRoundIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { User } from '../interfaces';
import Skeletons from '../components/skeletons/Skeletons';
import Notice from '../components/notice/Notice';
import Modal from '../components/modal/Modal';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch('/api/account')
      .then((response) => response.json())
      .then((response) => {
        setUser(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  const deleteAccount = () => {
    fetch('/api/account', { method: 'DELETE' });
    router.push('/api/auth/signout');
  };

  return (
    <>
      {/* Modal */}
      {modalOpen && !loading && !error && (
        <Modal
          title="Delete Account?"
          destructive
          confirmAction={deleteAccount}
          cancelAction={() => setModalOpen(false)}
          confirmLabel="Delete"
          confirmIcon={<Trash2Icon />}
        >
          <p className="text-center">
            Are you sure you want to delete your account under{' '}
            <span className="font-bold">{user?.email}</span>? This action cannot be reversed.
          </p>
        </Modal>
      )}
      {/* Page content */}
      <main
        className={`flex flex-grow flex-col items-center gap-6 py-8 ${modalOpen && 'pointer-events-none blur-sm'}`}
      >
        <section className="flex flex-col items-center gap-1">
          {/* Heading */}
          <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Account</h1>

          <HeadingWidget text={`Manage your Live Trains UK account and its associated data`}>
            <Link href={'/signout'} className="w-full whitespace-nowrap md:w-40">
              <Button className="w-full">
                <LogOutIcon /> Sign Out
              </Button>
            </Link>
          </HeadingWidget>
        </section>

        {/* Account info */}
        {loading ? (
          <Skeletons className="h-80 sm:h-64" count={1} />
        ) : error ? (
          <Notice
            notice="Error"
            description="There was an error getting account information, please sign out and try again."
            status="fail"
          />
        ) : (
          <div className="flex w-[90vw] max-w-[700px] flex-col gap-4 rounded-lg border border-stone-300 bg-white p-2">
            {/* Account section heading */}
            <h2 className="text-xl font-medium text-blue-900">Account Details</h2>

            {/* Account details section */}
            <section className="flex flex-col gap-3">
              {/* Email */}
              <section className="flex flex-wrap items-center gap-2">
                <MailIcon className="text-blue-900" />
                <p className="text-stone-600">Email Address:</p>
                <p>{user!.email}</p>
              </section>

              {/* Name */}
              <section className="flex flex-wrap items-center gap-2">
                <UserRoundIcon className="text-blue-900" />
                <p className="text-stone-600">Name:</p>
                <p>{user!.name}</p>
              </section>

              {/* Date created */}
              <section className="flex flex-wrap items-center gap-2">
                <CalendarIcon className="text-blue-900" />
                <p className="text-stone-600">Date Created:</p>
                <p>{user!.dateCreated}</p>
              </section>

              {/* Journey COunt */}
              <section className="flex flex-wrap items-center gap-2">
                <BookmarkIcon className="text-blue-900" />
                <p className="text-stone-600">Number of Saved Journeys:</p>
                <p>{user!.journeyCount}</p>
              </section>
            </section>

            {/* Buttons */}
            <section className="flex w-full flex-col items-center justify-center gap-2 px-2 sm:flex-row">
              <Link href={'/signout'} className="w-full">
                <Button className="w-full" variant="secondary">
                  <LogOutIcon /> Sign Out
                </Button>
              </Link>
              <Button variant="destructive" className="w-full" onClick={() => setModalOpen(true)}>
                <Trash2Icon /> Delete Account
              </Button>
            </section>
          </div>
        )}
      </main>
    </>
  );
}
