import { signIn, providerMap } from '@/auth';
import Button from '../components/button/Button';
import { FaGoogle } from 'react-icons/fa6';
import PageHeading from '../components/page-heading/PageHeading';

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  const icons = {
    Google: <FaGoogle />,
  };

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading
        heading="Sign In"
        subHeading="Sign in with any of the below providers"
        href="/"
      />
      {Object.values(providerMap).map((provider) => (
        <form
          action={async () => {
            'use server';
            await signIn(provider.id, {
              redirectTo: props.searchParams?.callbackUrl ?? '',
            });
          }}
        >
          <Button submit>
            {icons[provider.name as keyof typeof icons]} Sign in with {provider.name}
          </Button>
        </form>
      ))}
    </main>
  );
}
