import { format, toZonedTime } from 'date-fns-tz';

export function getTime(): string {
  const date = new Date();
  const zonedDate = toZonedTime(date, 'Europe/London');
  return format(zonedDate, 'HH:mm');
}

export function getDuration(departureTime: string, arrivalTime: string): number {
  // Parse numbers from time strings
  const [departureHours, departureMinutes] = departureTime
    .split(':')
    .map((number) => parseInt(number));
  const [arrivalHours, arrivalMinutes] = arrivalTime.split(':').map((number) => parseInt(number));

  // Create dates for finding difference
  const departureDate = new Date(0, 0, 0, departureHours, departureMinutes);
  const arrivalDate = new Date(
    0,
    0,
    // Check if the times span across 2 days
    arrivalHours < departureHours ||
    (arrivalHours === departureHours && arrivalMinutes < departureMinutes)
      ? 1
      : 0,
    arrivalHours,
    arrivalMinutes,
  );

  const difference = (arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60); // Convert milliseconds to minutes
  return difference;
}

export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours > 0 ? hours + 'h' : ''}${hours > 0 && minutes > 0 ? ' ' : ''}${minutes > 0 ? minutes + 'm' : ''}`;
}
