export default function getTime() {
  const date = new Date();
  return `${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`;
}

function formatNumber(number: number) {
  return number.toString().padStart(2, '0');
}
