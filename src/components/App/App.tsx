import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { searchMovies } from "../../services/movieService";
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
        {isLoading && <Loader />}
        {isError && (
          <ErrorMessage
            message={
              (error as Error).message
            }
          />
        )}
        {!isLoading &&
          !isError &&
          query &&
          movies.length === 0 && (
            <p className={css.empty}>
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
          <MovieGrid movies={movies} />
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
