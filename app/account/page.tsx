import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function AccountPage() {
  const session = await getServerSession(options);

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <h1 className="text-3xl font-medium text-blue-900">Account</h1>
      <p className="text-lg">Logged in as {session?.user?.email}</p>
    </main>
  );
}
