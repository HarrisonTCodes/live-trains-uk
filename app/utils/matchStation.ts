import stations from './stations';

export default function matchStation(station: string, prompt: string) {
  // Catch exact matches
  if (station.startsWith(prompt)) return true;

  // Allow searching of CRS for power users
  const crs = stations[station as keyof typeof stations];
  if (crs.toLowerCase() === prompt) return true;

  // Check each word of prompt against each word of station
  const stationWords = station.replaceAll('-', ' ').split(' ');
  const promptWords = prompt.replaceAll('-', ' ').split(' ');
  for (const promptWord of promptWords) {
    for (const stationWord of stationWords) {
      if (stationWord.startsWith(promptWord)) return true;
    }
  }

  // If no cases above match, return false
  return false;
}
