import Button from '../components/button/Button';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import Link from 'next/link';
import PageHeading from '../components/page-heading/PageHeading';
import { auth } from '@/auth';

export default async function AccountPage() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Account" backEnabled={false} />
      <p className="px-2 text-center text-xl">Logged in as {session?.user?.email}</p>
      <Link href={'/api/auth/signout'}>
        <Button>
          <FaArrowRightToBracket /> Sign Out
        </Button>
      </Link>
    </main>
  );
}
