export default function Form({
  children,
  onSubmit,
  heading,
  subHeading,
}: {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  heading: string;
  subHeading?: string;
}) {
  return (
    <form
      className="flex w-[90vw] max-w-[500px] flex-col items-center gap-6 rounded-lg border border-gray-300 bg-white p-4 shadow-lg"
      onSubmit={(event) => {
        event.preventDefault();
        if (onSubmit) {
          onSubmit(event);
        }
      }}
    >
      <section className="flex flex-col items-center gap-2">
        <h1 className="text-center text-2xl font-bold text-blue-900">{heading}</h1>
        {subHeading && <h2 className="text-center text-stone-600">{subHeading}</h2>}
      </section>
      {children}
    </form>
  );
}
