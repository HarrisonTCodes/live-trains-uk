export default function Tag({
  children,
  status,
}: {
  children: React.ReactNode;
  status?: 'success' | 'fail';
}) {
  return (
    <div
      className={`flex h-8 w-fit items-center gap-1 rounded-full border px-2 py-1 text-sm font-medium ${status === 'success' && 'border-green-700 bg-green-50'} ${status === 'fail' && 'border-red-700 bg-red-50'}`}
    >
      {children}
    </div>
  );
}
