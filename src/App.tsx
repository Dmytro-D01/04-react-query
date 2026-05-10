import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieList from "./components/MovieList/MovieList";
import { searchMovies } from "./api";
import css from "./App.module.css";

const App = () => {
  const [query, setQuery] =
    useState<string>("");
  const [page, setPage] =
    useState<number>(1);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () =>
      searchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: (prev) => prev,
  });

  const handleSearch = (
    newQuery: string,
  ): void => {
    setQuery(newQuery);
    setPage(1);
  };

  const movies = data?.results ?? [];
  const totalPages =
    data?.total_pages ?? 0;

  return (
    <div className={css.app}>
      <SearchBar
        onSearch={handleSearch}
      />

      <main className={css.main}>
        {isLoading && (
          <div
            className={
              css.statusWrapper
            }
          >
            <div
              className={css.spinner}
            />
            <p
              className={css.statusText}
            >
              Шукаємо фільми…
            </p>
          </div>
        )}

        {isError && (
          <p className={css.errorText}>
            Помилка:{" "}
            {(error as Error).message}
          </p>
        )}

        {!isLoading &&
          !isError &&
          query &&
          movies.length === 0 && (
            <p
              className={css.statusText}
            >
              За запитом «{query}»
              нічого не знайдено.
            </p>
          )}

        {!query && (
          <div className={css.welcome}>
            <span
              className={
                css.welcomeIcon
              }
            >
              🎥
            </span>
            <p>
              Введіть назву фільму, щоб
              розпочати пошук
            </p>
          </div>
        )}

        {movies.length > 0 && (
          <MovieList movies={movies} />
        )}

        {totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({
              selected,
            }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={
              css.pagination
            }
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
      </main>
    </div>
  );
};

export default App;
