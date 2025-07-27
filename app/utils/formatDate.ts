export default function formatDate(date: string) {
  const dateObject = new Date(date);

  const day = dateObject.getDate().toString();
  const month = dateObject.toLocaleString('en-GB', { month: 'long' });
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  return `${day} ${month}, ${hours}:${minutes}`;
}
