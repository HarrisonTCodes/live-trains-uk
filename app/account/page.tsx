import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function AccountPage() {
  const session = await getServerSession(options);

  return (
    <main>
      <h1>{session?.user?.email ?? 'No user'}</h1>
    </main>
  );
}
