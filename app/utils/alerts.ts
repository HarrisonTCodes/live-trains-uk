import type { Alert } from '../types/app';
import type { DisruptionResponse } from '../types/api';
import unescape from 'lodash.unescape';
import axios from 'axios';
import { stations } from './stations';

export function toAlertText(xhtml: string): string {
  const text = unescape(
    xhtml
      // Keep words separated when the API wraps them in block or break tags.
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/(?:p|div|li|h[1-6]|tr)\s*>/gi, ' ')
      .replace(/<[^>]*>/g, ' '),
  )
    // lodash.unescape doesn't cover nbsp or numeric character references.
    .replace(/&nbsp;|&#0*160;|&#x0*a0;/gi, ' ')
    .replace(/&#(\d+);/g, (_, decimal: string) => {
      const codePoint = Number(decimal);
      return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : '\ufffd';
    })
    .replace(/&#x([\da-f]+);/gi, (_, hexadecimal: string) => {
      const codePoint = Number.parseInt(hexadecimal, 16);
      return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : '\ufffd';
    });

  return text
    .split(/\s+(?:More details|Latest information) can be found in\b/i)[0]
    .replace(/\s+/g, ' ')
    .trim();
}

export async function getAlerts(station: string): Promise<Alert[]> {
  // Get station CRS
  const stationCrs = stations[station as keyof typeof stations];

  // If invalid or missing stations provided
  if (!stationCrs) {
    throw Error(`Invalid station provided: '${station}'`);
  }

  // Get alerts
  const response = await axios
    .get(`${process.env.DISRUPTIONS_BASE_URL}/${stationCrs}`, {
      headers: {
        'x-apikey': process.env.DISRUPTIONS_API_KEY!,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error({
        event: 'error_getting_alerts',
        stationCrs,
        error: err,
      });

      throw err;
    });

  // If the response has a fault attribute, something has necessarily gone fatally wrong
  if (response.fault) {
    console.error({
      event: 'fault_getting_alerts',
      stationCrs,
      fault: response.fault,
    });

    throw Error('Failed to access disruptions API');
  }

  return response[0].disruptions.map((disruption: DisruptionResponse) => ({
    message: toAlertText(disruption.xhtmlMessage),
    severity: disruption.severity.toUpperCase(),
  }));
}
