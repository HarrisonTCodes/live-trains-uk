import { auth, signOut } from '@/auth';
import Button from '../components/button/Button';
import { LogOutIcon } from 'lucide-react';

export default async function SignOutPage() {
  const session = await auth();

  return (
    <main className="flex flex-grow flex-col items-center gap-6 py-8">
      {/* Sign Out form */}
      <div className="flex w-[90vw] max-w-[500px] flex-col items-center gap-6 rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
        <section className="flex flex-col items-center gap-2">
          <h1 className="text-center text-2xl font-bold text-blue-900">Sign Out</h1>
          <h2 className="text-center text-stone-600">
            Are you sure you want to sign out of {session?.user?.email ?? 'your account'}?
          </h2>
        </section>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
          className="w-full"
        >
          <Button width="w-full" submit>
            <LogOutIcon /> Sign Out
          </Button>
        </form>
      </div>
    </main>
  );
}
