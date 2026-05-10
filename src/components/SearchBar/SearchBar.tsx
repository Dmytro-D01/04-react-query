import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({
  onSubmit,
}: SearchBarProps) => {
  const handleSubmit = (
    formData: FormData,
  ): void => {
    const query = (
      formData.get("query") as string
    ).trim();
    if (!query) {
      toast.error(
        "Введіть пошуковий запит!",
      );
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={css.header}>
      <div className={css.inner}>
        <span className={css.logo}>
          🎬 CineSearch
        </span>
        <form
          action={handleSubmit}
          className={css.form}
        >
          <input
            type="text"
            name="query"
            className={css.input}
            placeholder="Пошук фільмів..."
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
