import { NextRequest } from 'next/server';

export async function GET() {
  const alertsResponse = await fetch(
    'https://www.nationalrail.co.uk/nreapi/incidents/alerts/',
  ).then((response) => response.json());

  return Response.json(
    alertsResponse.map((response: { name: string; summary: string }) => ({
      station: response.name,
      description: response.summary,
    })),
  );
}
