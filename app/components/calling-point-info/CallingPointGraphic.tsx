export default function CallingPointGraphic({
  isFirstPoint,
  isLastPoint,
}: {
  isFirstPoint?: boolean;
  isLastPoint?: boolean;
}) {
  return (
    <svg width="25" height="110" xmlns="http://www.w3.org/2000/svg">
      {!isFirstPoint && <line x1="12" y1="0" x2="12" y2="49" strokeWidth="6" stroke="#1e40af" />}
      <circle cx="12" cy="55" r="8" stroke="#1e40af" strokeWidth="4" fill="none" />
      {!isLastPoint && <line x1="12" y1="61" x2="12" y2="110" strokeWidth="6" stroke="#1e40af" />}
    </svg>
  );
}
