import { NextRequest } from 'next/server';

async function getServiceIds(from: string, to: string) {
  // Get services between stations from huxley
  const huxleyResponse = await fetch(
    `https://huxley2.azurewebsites.net/departures/${from}/to/${to}/?accessToken=${process.env.ACCESS_TOKEN}`,
  ).then((response) => response.json());

  const services = huxleyResponse.trainServices ?? [];
  return services.map(({ serviceID }: { serviceID: string }) => serviceID);
}

export async function GET(request: NextRequest) {
  // Get query parameters
  const from = request.nextUrl.searchParams.get('from')?.toUpperCase();
  const to = request.nextUrl.searchParams.get('to')?.toUpperCase();

  // If a 'from' or 'to' station argument isn't provided in the query parameters, error
  if (!from || !to) {
    return new Response('Missing URL parameters - must have a from and to value', {
      status: 400,
    });
  }

  // Get IDs of services running between stations
  let serviceIds;
  try {
    serviceIds = await getServiceIds(from, to);
  } catch (error) {
    console.error(error);
    return new Response('Invalid stations provided', { status: 400 });
  }

  // Get info on each service
  const services = serviceIds.map(async (id: string) => {
    const huxleyResponse = await fetch(
      `https://huxley2.azurewebsites.net/service/${id}/?accessToken=${process.env.ACCESS_TOKEN}`,
    ).then((response) => response.json());

    // Get information on the calling point that lines up with the user-specified "to" station
    const arrivalData = huxleyResponse.subsequentCallingPoints[0].callingPoint.find(
      ({ crs }: { crs: string }) => crs === to,
    );

    // Return relevant information
    return {
      platform: huxleyResponse.platform,
      departTime: huxleyResponse.std ?? huxleyResponse.sta,
      estimatedDepartTime: huxleyResponse.etd,
      arrivalTime: arrivalData.st,
      estimatedArrivalTime: arrivalData.et,
    };
  });

  return Response.json(await Promise.all(services));
}
