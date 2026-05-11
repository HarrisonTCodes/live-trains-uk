export default function CircleStepGraphic({
  isFirstStep,
  isLastStep,
  lineColor = '#d6d3d1',
  circleColor = '#1e40af',
}: {
  isFirstStep?: boolean;
  isLastStep?: boolean;
  lineColor?: string;
  circleColor?: string;
}) {
  return (
    <svg width="25" height="110" xmlns="http://www.w3.org/2000/svg">
      {!isFirstStep && <line x1="12" y1="0" x2="12" y2="43" strokeWidth="3" stroke={lineColor} />}
      {!isLastStep && <line x1="12" y1="67" x2="12" y2="110" strokeWidth="3" stroke={lineColor} />}
      <circle cx="12" cy="55" r="8" stroke={circleColor} strokeWidth="3" fill="none" />
    </svg>
  );
}
