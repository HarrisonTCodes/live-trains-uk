import { signOut } from '@/auth';
import Button from '../components/button/Button';
import PageHeading from '../components/page-heading/PageHeading';
import { FaArrowRightToBracket } from 'react-icons/fa6';

export default function SignOutPage() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading
        heading="Sign Out"
        subHeading="Are you sure you want to sign out of your account?"
        href="/account"
      />
      {/* Sign Out button */}
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <Button submit>
          <FaArrowRightToBracket /> Sign Out
        </Button>
      </form>
    </main>
  );
}
