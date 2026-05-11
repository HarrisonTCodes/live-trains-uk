export default function CircleStepGraphic({
  isFirstStep,
  isLastStep,
  lineColor = '#d6d3d1',
  circleColor = '#1e40af',
  length = 110,
}: {
  isFirstStep?: boolean;
  isLastStep?: boolean;
  lineColor?: string;
  circleColor?: string;
  length?: number;
}) {
  const radius = 8;
  const centerY = length / 2;

  return (
    <svg width="25" height={length} xmlns="http://www.w3.org/2000/svg">
      {!isFirstStep && (
        <line x1="12" y1="0" x2="12" y2={centerY - radius} strokeWidth="3" stroke={lineColor} />
      )}
      {!isLastStep && (
        <line
          x1="12"
          y1={centerY + radius}
          x2="12"
          y2={length}
          strokeWidth="3"
          stroke={lineColor}
        />
      )}
      <circle cx="12" cy={centerY} r={radius} stroke={circleColor} strokeWidth="3" fill="none" />
    </svg>
  );
}
