import axios from "axios";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";

export const tmdbAxios = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "tr-TR",
  },
});

// Image URL helpers
export const getImageUrl = (path: string | null, size: string = "w500"): string => {
  if (!path) return "/placeholder-poster.jpg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: string = "w1280"): string => {
  if (!path) return "/placeholder-backdrop.jpg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getProfileUrl = (path: string | null, size: string = "w185"): string => {
  if (!path) return "/placeholder-avatar.jpg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const IMAGE_SIZES = {
  poster: {
    small: "w154",
    medium: "w342",
    large: "w500",
    xlarge: "w780",
    original: "original",
  },
  backdrop: {
    small: "w300",
    medium: "w780",
    large: "w1280",
    original: "original",
  },
  profile: {
    small: "w45",
    medium: "w185",
    large: "h632",
    original: "original",
  },
};

export default tmdbAxios;
