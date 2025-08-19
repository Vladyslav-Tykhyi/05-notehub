import { useState, useEffect } from "react";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export default function SearchBox({
  onSearch,
  initialQuery = "",
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  let timerId: number | null = null;

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    timerId = window.setTimeout(() => {
      onSearch(query);
    }, 600);

    return () => {
      if (timerId !== null) {
        clearTimeout(timerId);
      }
    };
  }, [query, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search notes"
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button className={styles.clearButton} onClick={handleClear}>
          ×
        </button>
      )}
    </div>
  );
}
