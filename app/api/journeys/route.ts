import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';
import prisma from '@/app/utils/prisma';
import { NextRequest } from 'next/server';
import stations from '../../utils/stations';

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

  // If the user is not logged in (or not found)
  if (!user) {
    return new Response('User not found', {
      status: 400,
    });
  }

  // If any of the required attributes are not provided
  if (!data.name || !data.firstStation || !data.secondStation) {
    return new Response('Malformed syntax', {
      status: 400,
    });
  }

  // If the provided name is too long
  if (data.name.length > 30) {
    return new Response('Name too long', {
      status: 400,
    });
  }

  const firstCrs = stations[data.firstStation.toLowerCase() as keyof typeof stations];
  const secondCrs = stations[data.secondStation.toLowerCase() as keyof typeof stations];
  // If the provided stations are invalid
  if (!firstCrs || !secondCrs) {
    return new Response('Invalid station(s) provided', {
      status: 400,
    });
  }

  await prisma.journey.create({
    data: {
      name: data.name,
      firstStation: data.firstStation.toLowerCase(),
      secondStation: data.secondStation.toLowerCase(),
      authorId: user.id,
    },
  });

  return new Response('Journey created', {
    status: 201,
  });
}
