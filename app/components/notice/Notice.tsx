export default function Notice({
  notice,
  description,
  icon,
  color,
}: {
  notice: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      className={`min-h-24 w-11/12 max-w-[500px] rounded-xl border-2 border-${color ?? 'gray-400'} bg-white p-2`}
    >
      <h2 className={`flex items-center gap-2 text-xl font-medium text-${color ?? 'gray-600'}`}>
        {icon} {notice}
      </h2>
      <p className={`text-${color ?? 'gray-600'} brightness-[60%]`}>{description}</p>
    </div>
  );
}
