'use client';
import Notice from '@/app/components/notice/Notice';
import PageHeading from '@/app/components/page-heading/PageHeading';
import { FaTriangleExclamation } from 'react-icons/fa6';

export default function Error() {
  return (
    <main className="flex flex-col items-center gap-6 py-8">
      <PageHeading heading="Service details" />
      <Notice
        notice="Error"
        description="There was an error trying to retrieve the service. This service may no longer exist"
        icon={<FaTriangleExclamation />}
        color="red-700"
      />
    </main>
  );
}
