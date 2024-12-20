export default function CallingPointGraphic({
  isFirstPoint,
  isLastPoint,
}: {
  isFirstPoint?: boolean;
  isLastPoint?: boolean;
}) {
  return (
    <svg width="25" height="110" xmlns="http://www.w3.org/2000/svg">
      {!isFirstPoint && <rect x="9" width="6" height="45" fill="#1e40af" />}
      <circle cx="12" cy="55" r="8" stroke="#1e40af" strokeWidth="4" fill="none" />
      {!isLastPoint && <rect x="9" y="65" width="6" height="45" fill="#1e40af" />}
    </svg>
  );
}
