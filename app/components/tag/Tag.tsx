export default function Tag({
  children,
  status = 'neutral',
}: {
  children: React.ReactNode;
  status?: 'success' | 'fail' | 'neutral';
}) {
  return (
    <div
      className={`flex h-8 w-fit items-center gap-1 whitespace-nowrap rounded-full border px-2 py-1 text-sm font-medium ${status === 'neutral' && 'border-stone-300 bg-white'} ${status === 'success' && 'border-green-700 bg-green-50 text-green-900'} ${status === 'fail' && 'border-red-700 bg-red-50 text-red-900'}`}
    >
      {children}
    </div>
  );
}
