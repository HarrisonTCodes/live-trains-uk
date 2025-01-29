import { signIn, providerMap } from '@/auth';
import Button from '../components/button/Button';
import { FaGoogle } from 'react-icons/fa6';

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const icons = {
    Google: <FaGoogle />,
  };

  return (
    <main className="flex flex-col items-center gap-6 py-8">
      {/* Sign In form */}
      <div className="flex w-[90vw] max-w-[500px] flex-col items-center gap-6 rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
        <section className="flex flex-col items-center gap-2">
          <h1 className="text-center text-2xl font-bold text-blue-900">Sign In</h1>
          <h2 className="text-center text-stone-600">
            Sign in using an authentication provider below to save journeys
          </h2>
        </section>
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.name}
            action={async () => {
              'use server';
              await signIn(provider.id, {
                redirectTo: searchParams?.callbackUrl ?? '',
              });
            }}
            className="w-full"
          >
            <Button width="w-full" submit>
              {icons[provider.name as keyof typeof icons]} Sign In with {provider.name}
            </Button>
          </form>
        ))}
      </div>
    </main>
  );
}
