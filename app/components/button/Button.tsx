export default function Button({
  children,
  onClick,
  submit,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  submit?: boolean;
}) {
  return (
    <button
      className="flex min-w-32 items-center justify-center gap-2 rounded-xl bg-blue-800 p-2.5 font-medium text-white hover:bg-blue-600 active:bg-blue-500"
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}
