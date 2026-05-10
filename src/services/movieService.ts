import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL =
  "https://api.themoviedb.org/3";
const TOKEN = import.meta.env
  .VITE_TMDB_TOKEN;

export const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/w500";

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export const searchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  const response =
    await axios.get<MoviesResponse>(
      `${BASE_URL}/search/movie`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        params: {
          query,
          page,
          language: "uk-UA",
        },
      },
    );
  return response.data;
};
