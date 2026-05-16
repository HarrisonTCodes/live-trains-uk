import { LegResponse, UndergroundInfo } from '../interfaces';

export default function inferUndergroundInfo(leg: LegResponse): UndergroundInfo | undefined {
  if (leg.mode !== 'UNDERGROUND') return undefined;

  const messages = leg.undergroundTravelInformation?.messages;
  if (!messages?.length) return undefined;

  const message = messages[0];

  const lineMatch = message.match(/the\s+([\w\s]+?)\s+Line\b/i);
  const directionMatch = message.match(/\b(Northbound|Southbound|Eastbound|Westbound)\b/i);
  const directMatch = message.match(/\bwhich\sis\sa\sdirect\sservice\b/i);

  if (!lineMatch || !directionMatch || !directMatch) return undefined;

  return {
    line: lineMatch[1].toLowerCase(),
    direction: directionMatch?.[1]?.toLowerCase() as UndergroundInfo['direction'],
  };
}
