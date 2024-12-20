export default function CallingPointGraphic({
  isFirstPoint,
  isLastPoint,
}: {
  isFirstPoint?: boolean;
  isLastPoint?: boolean;
}) {
  return (
    <svg width="25" height="100" xmlns="http://www.w3.org/2000/svg">
      {!isFirstPoint && <rect x="9" width="6" height="40" fill="#1e40af" />}
      <circle cx="12" cy="50" y="30" r="8" stroke="#1e40af" strokeWidth="4" fill="none" />
      {!isLastPoint && <rect x="9" y="60" width="6" height="40" fill="#1e40af" />}
    </svg>
  );
}
