export default function getDuration(departureTime: string, arrivalTime: string) {
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
