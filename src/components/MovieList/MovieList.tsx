import type { Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieList.module.css";

interface MovieListProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieList = ({
  movies,
  onSelect,
}: MovieListProps) => {
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};

export default MovieList;
