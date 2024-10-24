'use client';
import { Station } from '@/app/interfaces';
import toTitleCase from '@/app/utils/toTitleCase';
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
  const [options, setOptions] = useState<Station[]>([]);
  const [focused, setFocused] = useState<boolean>(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setValue(input);

    if (!input) {
      setOptions([]);
    }

    // Get stations
    if (input.length % 2 != 0 && input.length < 10) {
      fetch(`/api/stations?prompt=${event.target.value}`)
        .then((response) => response.json())
        .then((stations) => setOptions(stations));
    }
  };

  return (
    <div className="flex w-[80vw] max-w-96 flex-col md:w-[40vw]">
      {/* Search bar */}
      <input
        type="search"
        className="w-full rounded-lg border-2 border-gray-400 bg-gray-100 p-2 text-xl focus:border-blue-800 focus:outline-none"
        placeholder={label}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {/* Matching options dropdown */}
      {options.length > 0 && focused && (
        <ul className="absolute max-h-40 w-[80vw] max-w-96 translate-y-14 cursor-pointer divide-y-2 divide-gray-300 overflow-y-scroll rounded-lg border-2 border-gray-300 bg-white md:max-h-96 md:w-[40vw]">
          {options.map((option) => (
            <li
              key={option.crs}
              onMouseDown={() => setValue(toTitleCase(option.name))}
              className="p-2 text-lg"
            >
              {toTitleCase(option.name)} <span className="text-gray-500">({option.crs})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
