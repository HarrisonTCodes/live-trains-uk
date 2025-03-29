'use client';
import Link from 'next/link';
import Button from '../components/button/Button';
import HeadingWidget from '../components/heading-widget/HeadingWidget';
import { LogOutIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { User } from '../interfaces';
import Skeletons from '../components/skeletons/Skeletons';
import Notice from '../components/notice/Notice';

export default function AccountPage() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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

  return (
    <main className="flex flex-grow flex-col items-center gap-6 py-8">
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
        <Skeletons className="h-72 sm:h-56" count={1} />
      ) : error ? (
        <Notice
          notice="Error"
          description="There was an error getting account information, please try again."
          status="fail"
        />
      ) : (
        <div className="flex w-[90vw] max-w-[700px] flex-col gap-4 rounded-lg border border-stone-300 bg-white p-2">
          {/* Account section heading */}
          <h2 className="text-xl font-medium text-blue-900">Account Details</h2>

          {/* Account details section */}
          <section className="flex flex-col gap-1">
            <p className="text-stone-600">
              <span className="font-medium text-black">Email Address:</span> {user?.email}
            </p>
            <p className="text-stone-600">
              <span className="font-medium text-black">Name:</span> {user?.name}
            </p>
            <p className="text-stone-600">
              <span className="font-medium text-black">Date Created:</span> {user?.dateCreated}
            </p>
            <p className="text-stone-600">
              <span className="font-medium text-black">Number of Saved Journeys:</span>{' '}
              {user?.journeyCount}
            </p>
          </section>

          {/* Buttons */}
          <section className="flex w-full flex-col items-center justify-center gap-2 px-2 sm:flex-row">
            <Link href={'/signout'} className="w-full">
              <Button className="w-full" variant="secondary">
                <LogOutIcon /> Sign Out
              </Button>
            </Link>
            <Button variant="destructive" className="w-full">
              <Trash2Icon /> Delete Account
            </Button>
          </section>
        </div>
      )}
    </main>
  );
}
