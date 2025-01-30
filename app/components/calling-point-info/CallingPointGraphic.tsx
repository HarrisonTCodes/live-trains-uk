export default function CallingPointGraphic({
  isFirstPoint,
  isLastPoint,
  departed,
}: {
  isFirstPoint?: boolean;
  isLastPoint?: boolean;
  departed?: boolean;
}) {
  return (
    <svg width="25" height="110" xmlns="http://www.w3.org/2000/svg">
      {!isFirstPoint && <line x1="12" y1="0" x2="12" y2="43" strokeWidth="3" stroke="#d6d3d1" />}
      {!isLastPoint && <line x1="12" y1="67" x2="12" y2="110" strokeWidth="3" stroke="#d6d3d1" />}
      <circle
        cx="12"
        cy="55"
        r="8"
        stroke={departed ? '#d6d3d1' : '#1e40af'}
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}
