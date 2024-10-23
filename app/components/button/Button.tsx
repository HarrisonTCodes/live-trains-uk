export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="flex min-w-36 justify-center gap-2 rounded-xl bg-blue-800 p-2.5 font-medium text-white hover:bg-blue-600 active:bg-blue-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
