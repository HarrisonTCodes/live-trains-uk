export default function Form({
  children,
  onSubmit,
  heading,
}: {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  heading: string;
}) {
  return (
    <form
      className="flex flex-col items-center gap-6 rounded-xl border-2 border-gray-300 bg-white p-4 shadow-lg"
      onSubmit={(event) => {
        event.preventDefault();
        if (onSubmit) {
          onSubmit(event);
        }
      }}
    >
      <h1 className="text-2xl text-blue-900">{heading}</h1>
      {children}
    </form>
  );
}
