'use client';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

export default function PageHeading({
  heading,
  subHeading,
  href,
  backEnabled = true,
}: {
  heading: string;
  subHeading?: string;
  href?: string;
  backEnabled?: boolean;
}) {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center gap-1 text-center">
      {/* Main heading */}
      <h1 className="text-3xl font-medium text-blue-900">{heading}</h1>
      {/* Sub heading */}
      {subHeading ? (
        <h2 className="px-2 text-lg font-medium text-blue-900">{subHeading}</h2>
      ) : (
        <></>
      )}
      {/* Go back button */}
      {backEnabled ? (
        <h2
          className="flex cursor-pointer items-center gap-2 text-lg font-medium text-blue-900"
          onClick={() => (href ? router.push(href) : router.back())}
        >
          <FaArrowLeft size={24} />
          Go Back
        </h2>
      ) : (
        <></>
      )}
    </section>
  );
}
