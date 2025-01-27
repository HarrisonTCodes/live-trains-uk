export default function Button({
  children,
  onClick,
  submit,
  width,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  submit?: boolean;
  width?: string;
}) {
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg bg-blue-800 p-2 font-medium text-white hover:bg-blue-600 active:bg-blue-500 ${width}`}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}
