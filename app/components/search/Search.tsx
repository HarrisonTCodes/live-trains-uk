'use client';
import { Station } from '@/app/interfaces';
import toTitleCase from '@/app/utils/toTitleCase';
import { ChangeEvent, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const getStations = useCallback(
    debounce((input: string) => {
      if (!input) return;
      setLoading(true);
      fetch(`/api/stations?prompt=${input}`)
        .then((response) => response.json())
        .then((stations) => {
          setLoading(false);
          setOptions(stations);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error fetching stations:', error);
        });
    }, 250),
    [],
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update state
    const input = event.target.value;
    setValue(input);

    // Show recently searched stations if input is empty
    if (!input) {
      setOptions(JSON.parse(localStorage.getItem('recentStations') ?? '[]'));
      return;
    }

    // Fetch matching stations
    getStations(event.target.value);
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
        onFocus={() => {
          setFocused(true);
          if (!value) {
            setOptions(JSON.parse(localStorage.getItem('recentStations') ?? '[]'));
          }
        }}
        onBlur={() => setFocused(false)}
      />
      {/* Matching options dropdown */}
      {(loading || options.length > 0) && focused && (
        <ul className="absolute max-h-40 w-[80vw] max-w-96 translate-y-14 cursor-pointer divide-y-2 divide-gray-300 overflow-y-scroll rounded-lg border-2 border-gray-300 bg-white md:max-h-96 md:w-[40vw]">
          {loading && options.length === 0 && (
            <li className="p-2 text-center text-lg text-gray-500">Loading stations...</li>
          )}
          {options.map((option) => (
            <li
              key={option.crs}
              onMouseDown={() => {
                setValue(toTitleCase(option.name));

                // Update recent stations
                const recentStations = JSON.parse(localStorage.getItem('recentStations') ?? '[]');
                const index = recentStations.findIndex(
                  (recentStation: Station) => recentStation.name === option.name,
                );

                if (index > -1) {
                  recentStations.splice(index, 1);
                } else if (recentStations.length >= 3) {
                  recentStations.pop();
                }

                recentStations.unshift(option);
                localStorage.setItem('recentStations', JSON.stringify(recentStations));
              }}
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
