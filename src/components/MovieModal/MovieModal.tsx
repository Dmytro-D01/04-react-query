import { useEffect } from "react";
import type { Movie } from "../../types/movie";
import { IMAGE_BASE_URL } from "../../services/movieService";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const FALLBACK_IMG =
  "https://placehold.co/300x450/1a1a1a/f0c040?text=No+Image";

const MovieModal = ({
  movie,
  onClose,
}: MovieModalProps) => {
  const imgSrc = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : FALLBACK_IMG;

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent,
    ): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener(
      "keydown",
      handleKeyDown,
    );
    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
  }, [onClose]);

  return (
    <div
      className={css.backdrop}
      onClick={onClose}
    >
      <div
        className={css.modal}
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className={css.closeBtn}
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={imgSrc}
          alt={movie.title}
          className={css.poster}
        />
        <div className={css.info}>
          <h2 className={css.title}>
            {movie.title}
          </h2>
          <p className={css.year}>
            {movie.release_date?.slice(
              0,
              4,
            )}
          </p>
          <p className={css.rating}>
            ★{" "}
            {movie.vote_average.toFixed(
              1,
            )}
          </p>
          {movie.overview && (
            <p className={css.overview}>
              {movie.overview}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
