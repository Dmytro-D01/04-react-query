import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const BASE_URL =
  "https://api.themoviedb.org/3";
const API_KEY = import.meta.env
  .VITE_TMDB_API_KEY;

export const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p/w500";

export const searchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  const response =
    await axios.get<MoviesResponse>(
      `${BASE_URL}/search/movie`,
      {
        params: {
          api_key: API_KEY,
          query,
          page,
          language: "uk-UA",
        },
      },
    );
  return response.data;
};
