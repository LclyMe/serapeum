import { useState } from "react";

const MAX_ENTRIES = 40;

export function useLatestStored(
  key: string,
  id: string
): [boolean, () => void] {
  // Get the entries from local storage on initial render
  const value = localStorage?.getItem(key);
  const initialEntries = value ? JSON.parse(value) : [];

  // State to hold the current list of entries
  const [entries, setEntries] = useState<string[]>(initialEntries);

  // Function to check if an ID is in the list of entries
  const isAnEntry = entries.includes(id);

  // Function to toggle the presence of the ID in the list of entries
  const toggle = () => {
    const updatedEntries = isAnEntry
      ? entries.filter((entry) => entry !== id)
      : [...entries.filter((entry) => entry !== id), id];

    // Ensure the list size is within the maximum limit
    const newEntries =
      updatedEntries.length > MAX_ENTRIES
        ? updatedEntries.slice(1)
        : updatedEntries;

    setEntries(newEntries);
    localStorage.setItem(key, JSON.stringify(newEntries));
  };

  return [isAnEntry, toggle];
}
