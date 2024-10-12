'use client';
import { ChangeEvent, useState } from 'react';

export default function Search({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  const [options, setOptions] = useState<string[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setValue(input);

    if (!input) {
      setOptions([]);
    }

    // Get stations
    if (input.length % 2 != 0 && input.length < 8) {
      fetch(`/api/stations?prompt=${event.target.value}`)
        .then((response) => response.json())
        .then((stations) => setOptions(stations));
    }
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
      <ul>
        {options.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
    </div>
  );
}
