import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';
import prisma from '@/app/utils/prisma';
import { NextRequest } from 'next/server';
import stations from '../shared/stations';

export async function GET() {
  const session = await getServerSession(options);
  if (!session) {
    return new Response('Not authenticated', {
      status: 401,
    });
  }

  const userWithJourneys = await prisma.user.findUnique({
    where: {
      email: session!.user!.email!,
    },
    include: {
      journeys: true,
    },
  });
  const journeys = userWithJourneys?.journeys ?? [];

  return Response.json(
    journeys.map((journey) => ({
      firstStation: journey.firstStation,
      firstCrs: stations[journey.firstStation as keyof typeof stations],
      secondStation: journey.secondStation,
      secondCrs: stations[journey.secondStation as keyof typeof stations],
      name: journey.name,
      id: journey.id,
    })),
  );
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);
  if (!session) {
    return new Response('Not authenticated', {
      status: 401,
    });
  }

  const data = await request.json();
  const user = await prisma.user.findUnique({
    where: {
      email: session!.user!.email!,
    },
  });

  if (!user) {
    return new Response('User not found', {
      status: 400,
    });
  }

  await prisma.journey.create({
    data: {
      firstStation: data.firstStation.toLowerCase(),
      secondStation: data.secondStation.toLowerCase(),
      name: data.name,
      authorId: user.id,
    },
  });

  return Response.json(data, {
    status: 201,
  });
}
