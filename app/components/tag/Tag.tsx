const statusStyles = {
  neutral: 'border-stone-300 bg-white',
  success: 'border-green-700 bg-green-50 text-green-900',
  fail: 'border-red-700 bg-red-50 text-red-900',
};

export default function Tag({
  children,
  status = 'neutral',
  overrideStyle,
}: {
  children: React.ReactNode;
  status?: 'success' | 'fail' | 'neutral';
  overrideStyle?: string;
}) {
  return (
    <div
      className={`flex h-8 w-fit items-center gap-1 whitespace-nowrap rounded-full border px-2 py-1 text-sm font-medium ${overrideStyle ?? statusStyles[status]}`}
    >
      {children}
    </div>
  );
}
