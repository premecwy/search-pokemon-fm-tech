"use client";

import styles from "./SearchBar.module.css";

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  onSearch: (value: string) => void;
};

export default function SearchBar({ value, onValueChange, onSearch }: Props) {
  const handleSubmit = () => {
    const trimmed = value.trim().toLowerCase();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Pokémon name..."
        aria-label="Search Pokémon"
      />
      <button
        type="button"
        className={styles.button}
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
}
