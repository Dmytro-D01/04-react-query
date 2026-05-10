import type { Movie } from "../../types/movie";
import { IMAGE_BASE_URL } from "../../api";
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

const FALLBACK_IMG =
  "https://placehold.co/300x450/1a1a1a/f0c040?text=No+Image";

const MovieCard = ({
  movie,
}: MovieCardProps) => {
  const {
    title,
    poster_path,
    release_date,
    vote_average,
    overview,
  } = movie;
  const year = release_date
    ? release_date.slice(0, 4)
    : "—";
  const rating =
    vote_average.toFixed(1);
  const imgSrc = poster_path
    ? `${IMAGE_BASE_URL}${poster_path}`
    : FALLBACK_IMG;

  const ratingClass =
    vote_average >= 7
      ? css.ratingHigh
      : vote_average >= 5
        ? css.ratingMid
        : css.ratingLow;

  return (
    <li className={css.card}>
      <div
        className={css.posterWrapper}
      >
        <img
          src={imgSrc}
          alt={title}
          className={css.poster}
          loading="lazy"
        />
        <span
          className={`${css.rating} ${ratingClass}`}
        >
          ★ {rating}
        </span>
      </div>
      <div className={css.info}>
        <h3 className={css.title}>
          {title}
        </h3>
        <p className={css.year}>
          {year}
        </p>
        {overview && (
          <p className={css.overview}>
            {overview}
          </p>
        )}
      </div>
    </li>
  );
};

export default MovieCard;
