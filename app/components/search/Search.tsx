import { ChangeEvent } from 'react';

export default function Search({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
    // TODO make request to API and get matching station options here
  };

  return (
    <div className="flex w-[80vw] max-w-96 flex-col md:w-[40vw]">
      <input
        type="search"
        className="w-full rounded-lg border-2 border-gray-400 bg-gray-100 p-2 text-xl focus:border-blue-800 focus:outline-none"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      {/* TODO menu with options matching search here */}
    </div>
  );
}
