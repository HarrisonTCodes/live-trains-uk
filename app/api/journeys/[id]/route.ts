import { NextRequest } from 'next/server';
import prisma from '@/app/utils/prisma';
import { auth } from '@/auth';

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();
  if (!session) {
    return new Response('Not authenticated', {
      status: 401,
    });
  }

  const journey = await prisma.journey.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      author: true,
    },
  });

  if (!journey) {
    return new Response('Journey not found', {
      status: 404,
    });
  }

  if (journey.author.email !== session.user?.email) {
    return new Response('Unauthorised', {
      status: 403,
    });
  }

  await prisma.journey.delete({
    where: { id: parseInt(params.id) },
  });

  return new Response('Journey deleted');
}
