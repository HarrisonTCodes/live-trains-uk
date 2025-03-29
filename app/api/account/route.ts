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
