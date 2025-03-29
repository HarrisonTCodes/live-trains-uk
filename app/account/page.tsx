import Link from 'next/link';
import Button from '../components/button/Button';
import HeadingWidget from '../components/heading-widget/HeadingWidget';
import { LogOutIcon } from 'lucide-react';
import { auth } from '@/auth';

export default async function AccountPage() {
  const session = await auth();

  return (
    <main className="flex flex-grow flex-col items-center gap-6 py-8">
      <section className="flex flex-col items-center gap-1">
        {/* Heading */}
        <h1 className="pb-2 text-center text-2xl font-bold text-blue-900">Account</h1>

        <HeadingWidget
          text={`Manage your Live Trains UK account (${session?.user?.email}) and its associated data`}
        >
          <Link href={'/signout'} className="w-full whitespace-nowrap md:w-40">
            <Button className="w-full">
              <LogOutIcon /> Sign Out
            </Button>
          </Link>
        </HeadingWidget>
      </section>
    </main>
  );
}
