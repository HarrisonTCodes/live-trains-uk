import { NextRequest } from 'next/server';

async function getServiceIds(from: string, to: string) {
  // Get services between stations from huxley
  const huxleyResponse = await fetch(
    `https://huxley2.azurewebsites.net/departures/${from}/to/${to}/?accessToken=${process.env.ACCESS_TOKEN}`,
  ).then((response) => response.json());

  const services = huxleyResponse.trainServices;
  return services.map(({ serviceID }: { serviceID: string }) => serviceID);
}

export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get('from');
  const to = request.nextUrl.searchParams.get('to');

  // If a 'from' or 'to' station argument isn't provided in the query parameters, error
  if (!from || !to) {
    return new Response('Missing URL parameters - must have a from and to value', {
      status: 400,
    });
  }

  const serviceIds = await getServiceIds(from, to);

  // TODO get info about each service using ids

  return Response.json(serviceIds);
}
