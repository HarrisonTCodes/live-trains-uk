'use client';
import { Station } from '@/app/interfaces';
import toTitleCase from '@/app/utils/toTitleCase';
import { ChangeEvent, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import Tag from '../tag/Tag';
import { motion, AnimatePresence } from 'framer-motion';

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

  const getRecentOptions = () => {
    try {
      // Get recent stations from local storage
      const retrievedRecentOptions = JSON.parse(localStorage.getItem('recentStations')!);

      // Check all relevant (first 3) entries are valid
      if (
        !retrievedRecentOptions
          .slice(0, 3)
          .every((recentOption: Station) => !!recentOption.name && !!recentOption.crs)
      ) {
        throw Error('Local storage recentStations invalid!');
      }

      // Return first 3 items
      return retrievedRecentOptions.slice(0, 3);
    } catch {
      setRecentOptions([]);
      return [];
    }
  };

  const setRecentOptions = (newRecentOptions: Station[]) => {
    localStorage.setItem('recentStations', JSON.stringify(newRecentOptions));
  };

  const getStations = useCallback(
    debounce((input: string) => {
      if (input.length < 2) return;
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
      setOptions(getRecentOptions());
      return;
    }

    // Fetch matching stations
    getStations(event.target.value);
  };

  return (
    <div className="relative flex w-full flex-col">
      {/* Search bar */}
      <input
        type="search"
        className="rounded-lg border border-gray-400 bg-white p-2 text-lg transition focus:border-blue-800 focus:outline-none"
        placeholder={label}
        value={value}
        onChange={onChange}
        onFocus={() => {
          setFocused(true);
          if (!value) {
            setOptions(getRecentOptions());
          }
        }}
        onBlur={() => setFocused(false)}
        spellCheck={false}
      />

      {/* Matching options dropdown */}
      <AnimatePresence>
        {(loading || options.length > 0) && focused && (
          <motion.ul
            className="absolute z-10 max-h-40 w-full translate-y-14 cursor-pointer divide-y divide-gray-300 overflow-y-scroll rounded-lg border border-gray-300 bg-white md:max-h-96"
            initial={{ opacity: 0, y: '14' }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            {loading && options.length === 0 && (
              <li className="p-2 text-center text-lg text-gray-500">Loading stations...</li>
            )}
            {options.map((option) => (
              <li
                key={option.crs}
                onMouseDown={() => {
                  setValue(toTitleCase(option.name));

                  // Update recent stations
                  const newRecentOptions = getRecentOptions();
                  const index = newRecentOptions.findIndex(
                    (recentStation: Station) => recentStation.name === option.name,
                  );

                  if (index > -1) {
                    newRecentOptions.splice(index, 1);
                  } else if (newRecentOptions.length >= 3) {
                    newRecentOptions.pop();
                  }

                  newRecentOptions.unshift(option);
                  setRecentOptions(newRecentOptions);
                }}
                className="flex items-center justify-between p-2 transition hover:bg-stone-100"
              >
                {toTitleCase(option.name)}
                <Tag>{option.crs}</Tag>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
