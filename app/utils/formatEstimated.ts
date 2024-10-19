export default function formatEstimated(expected?: string) {
  if (!expected) return '';

  const knownStatuses = ['On time', 'Delayed', 'Cancelled'];
  return knownStatuses.includes(expected) ? ` (${expected})` : ` (Expected ${expected})`;
}
