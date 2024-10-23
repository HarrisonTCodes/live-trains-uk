import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { options } from '../../auth/[...nextauth]/options';
import prisma from '@/app/utils/prisma';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(options);
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
