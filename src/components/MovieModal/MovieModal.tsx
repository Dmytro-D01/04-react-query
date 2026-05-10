import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import { IMAGE_BASE_URL } from "../../services/movieService";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const FALLBACK_IMG =
  "https://placehold.co/1280x720/1a1a1a/f0c040?text=No+Image";

const MovieModal = ({
  movie,
  onClose,
}: MovieModalProps) => {
  const imgSrc = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : FALLBACK_IMG;

  useEffect(() => {
    document.body.style.overflow =
      "hidden";
    const handleKeyDown = (
      e: KeyboardEvent,
    ): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener(
      "keydown",
      handleKeyDown,
    );
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [onClose]);

  return createPortal(
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
          className={css.backdrop_img}
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
    </div>,
    document.body,
  );
};

export default MovieModal;
