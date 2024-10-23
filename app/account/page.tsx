import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Button from '../components/button/Button';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import Link from 'next/link';

export default async function AccountPage() {
  const session = await getServerSession(options);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-3xl font-medium text-blue-900">Account</h1>
      <p className="px-2 text-center text-xl">Logged in as {session?.user?.email}</p>
      <Link href={'/api/auth/signout'}>
        <Button>
          <FaArrowRightToBracket size={24} color="ffffff" className="text-white" />
          Sign Out
        </Button>
      </Link>
    </main>
  );
}
