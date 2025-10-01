// Special words that appear untitled (first letter lowercase) in station names
const doNotTitleCase = [
  'en',
  'le',
  'on',
  'under',
  'in',
  'upon',
  'y',
  'by',
  'super',
  'over',
  'the',
  'bach',
  'at',
  'gron',
  'for',
];

export default function toTitleCase(str: string) {
  return str.replace(/\b\w+/g, (text, i) =>
    doNotTitleCase.includes(text) && i > 0
      ? text
      : text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}
