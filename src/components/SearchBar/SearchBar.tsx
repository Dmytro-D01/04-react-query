import { useState } from "react";
import type { FormEvent } from "react";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({
  onSearch,
}: SearchBarProps) => {
  const [inputValue, setInputValue] =
    useState<string>("");

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <header className={css.header}>
      <div className={css.inner}>
        <span className={css.logo}>
          🎬 CineSearch
        </span>
        <form
          onSubmit={handleSubmit}
          className={css.form}
        >
          <input
            type="text"
            className={css.input}
            placeholder="Пошук фільмів..."
            value={inputValue}
            onChange={(e) =>
              setInputValue(
                e.target.value,
              )
            }
            aria-label="Пошук фільмів"
          />
          <button
            type="submit"
            className={css.button}
          >
            Знайти
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
