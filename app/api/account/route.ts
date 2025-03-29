import prisma from '@/app/utils/prisma';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session) {
    return new Response('Not authenticated', {
      status: 401,
    });
  }

  const { accountCreatedAt, journeyCount } = await prisma.user
    .findUnique({
      where: { email: session!.user!.email! },
      select: { createdAt: true, _count: { select: { journeys: true } } },
    })
    .then((response) => ({
      accountCreatedAt: response!.createdAt,
      journeyCount: response!._count.journeys,
    }));

  return Response.json({
    email: session.user!.email,
    name: session.user!.name,
    dateCreated: accountCreatedAt.toDateString(),
    journeyCount,
  });
}

export async function DELETE() {
  const session = await auth();
  if (!session) {
    return new Response('Not authenticated', {
      status: 401,
    });
  }

  // Delete account and all associated journeys (in one transaction)
  await prisma.$transaction(async (tx) => {
    // Get user from session email
    const user = await tx.user.findUnique({
      where: { email: session.user!.email! },
      select: { id: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Delete all journeys linked to the user
    await tx.journey.deleteMany({ where: { authorId: user.id } });

    // Delete the user itself
    await tx.user.delete({ where: { email: session.user!.email! } });
  });

  return new Response('User deleted');
}
