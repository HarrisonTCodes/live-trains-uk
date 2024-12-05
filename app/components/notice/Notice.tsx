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
    <section className="flex flex-col items-center">
      <h2
        className={`flex items-center gap-2 text-center text-2xl font-medium text-${color ?? 'gray-500'}`}
      >
        {icon} {notice}
      </h2>
      <p className={`px-2 text-center text-lg text-${color ?? 'gray-500'}`}>{description}</p>
    </section>
  );
}
