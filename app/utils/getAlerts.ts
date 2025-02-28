import { AlertResponse, DisruptionResponse } from '../interfaces';
import unescape from 'lodash.unescape';
import stations from './stations';

export default async function getAlerts(station: string) {
  // Get station CRS
  const stationCrs = stations[station as keyof typeof stations];

  // If invalid or missing stations provided
  if (!stationCrs) {
    throw Error(`Invalid station provided: '${station}'`);
  }

  // Set API key in headers
  const headers = new Headers();
  headers.set('x-apikey', process.env.DISRUPTIONS_API_KEY!);

  // Get alerts
  const response = (await fetch(
    `https://api1.raildata.org.uk/1010-disruption-list1_0/LDBSVWS/api/20220120/GetDisruptionList/${stationCrs}`,
    { headers, cache: 'no-store' },
  ).then((response) => response.json())) as AlertResponse[];

  return response[0].disruptions.map((disruption: DisruptionResponse) => ({
    message: unescape(
      disruption.xhtmlMessage
        .split(' More details can be found in')[0]
        .split(' Latest information can be found in')[0]
        .replace(/<[^>]*>/g, ''),
    ),
    severity: disruption.severity,
  }));
}
