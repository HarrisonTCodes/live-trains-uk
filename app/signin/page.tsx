import { signIn, providerMap } from '@/auth';
import Button from '../components/button/Button';
import { FaGoogle } from 'react-icons/fa6';
import PageHeading from '../components/page-heading/PageHeading';

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
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
      {/* Sign In button for each auth provider */}
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.name}
          action={async () => {
            'use server';
            await signIn(provider.id, {
              redirectTo: searchParams?.callbackUrl ?? '',
            });
          }}
        >
          <Button submit>
            {icons[provider.name as keyof typeof icons]} Sign In with {provider.name}
          </Button>
        </form>
      ))}
    </main>
  );
}
