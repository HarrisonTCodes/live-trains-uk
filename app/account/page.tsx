import Link from 'next/link';
import Button from '../components/button/Button';
import HeadingWidget from '../components/heading-widget/HeadingWidget';
import { LogOutIcon, Trash2Icon } from 'lucide-react';
import { auth } from '@/auth';
import prisma from '../utils/prisma';

export default async function AccountPage() {
  const session = await auth();
  const { accountCreatedAt, journeyCount } = await prisma.user
    .findUnique({
      where: { email: session!.user!.email! },
      select: { createdAt: true, _count: { select: { journeys: true } } },
    })
    .then((response) => ({
      accountCreatedAt: response!.createdAt,
      journeyCount: response!._count.journeys,
    }));

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

      <div className="flex w-[90vw] max-w-[700px] flex-col gap-4 rounded-lg border border-stone-300 bg-white p-2">
        <h2>Account Details</h2>
        <section>
          <p>Email Address: {session?.user?.email}</p>
          <p>Name: {session?.user?.name}</p>
          <p>Date Created: {accountCreatedAt.toDateString()}</p>
          <p>Number of Saved Journeys: {journeyCount}</p>
        </section>
        <Button variant="destructive" className="w-full">
          <Trash2Icon /> Delete Account
        </Button>
      </div>
    </main>
  );
}
