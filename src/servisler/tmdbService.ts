import tmdbAxios from "@/kutuphane/tmdb";
import type {
  TMDBPaginatedResponse,
  TMDBMovie,
  TMDBTVShow,
  TMDBMovieDetails,
  TMDBTVShowDetails,
  TMDBCredits,
  TMDBVideo,
  TMDBGenre,
  TMDBSearchResult,
  TMDBWatchProvidersResponse,
} from "@/tipler/tmdb";

// ─── Trending ────────────────────────────────────────────────────────────────
export const getTrendingMovies = async (timeWindow: "day" | "week" = "week"): Promise<TMDBMovie[]> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBMovie>>(
    `/trending/movie/${timeWindow}`
  );
  return data.results;
};

export const getTrendingAll = async (timeWindow: "day" | "week" = "week") => {
  const { data } = await tmdbAxios.get(`/trending/all/${timeWindow}`);
  return data.results;
};

// ─── Movies ──────────────────────────────────────────────────────────────────
export const getPopularMovies = async (page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovie>> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBMovie>>("/movie/popular", {
    params: { page },
  });
  return data;
};

export const getTopRatedMovies = async (page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovie>> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBMovie>>("/movie/top_rated", {
    params: { page },
  });
  return data;
};

export const getUpcomingMovies = async (page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovie>> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBMovie>>("/movie/upcoming", {
    params: { page },
  });
  return data;
};

export const getNowPlayingMovies = async (page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovie>> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBMovie>>("/movie/now_playing", {
    params: { page },
  });
  return data;
};

export const getMovieDetails = async (movieId: number): Promise<TMDBMovieDetails> => {
  const { data } = await tmdbAxios.get<TMDBMovieDetails>(`/movie/${movieId}`, {
    params: {
      append_to_response: "videos,credits,similar,watch/providers",
    },
  });
  return data;
};

export const getMovieCredits = async (movieId: number): Promise<TMDBCredits> => {
  const { data } = await tmdbAxios.get<TMDBCredits>(`/movie/${movieId}/credits`);
  return data;
};

export const getMovieVideos = async (movieId: number): Promise<TMDBVideo[]> => {
  const { data } = await tmdbAxios.get<{ id: number; results: TMDBVideo[] }>(
    `/movie/${movieId}/videos`
  );
  return data.results;
};

export const getSimilarMovies = async (movieId: number): Promise<TMDBMovie[]> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBMovie>>(
    `/movie/${movieId}/similar`
  );
  return data.results;
};

export const getMovieWatchProviders = async (movieId: number): Promise<TMDBWatchProvidersResponse> => {
  const { data } = await tmdbAxios.get<TMDBWatchProvidersResponse>(
    `/movie/${movieId}/watch/providers`
  );
  return data;
};

export const getMoviesByGenre = async (genreId: number, page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovie>> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBMovie>>("/discover/movie", {
    params: {
      with_genres: genreId,
      sort_by: "popularity.desc",
      page,
    },
  });
  return data;
};

// ─── TV Shows ────────────────────────────────────────────────────────────────
export const getPopularTVShows = async (page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVShow>> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBTVShow>>("/tv/popular", {
    params: { page },
  });
  return data;
};

export const getTopRatedTVShows = async (page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVShow>> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBTVShow>>("/tv/top_rated", {
    params: { page },
  });
  return data;
};

export const getAiringTodayTVShows = async (page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVShow>> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBTVShow>>("/tv/airing_today", {
    params: { page },
  });
  return data;
};

export const getTVShowDetails = async (tvId: number): Promise<TMDBTVShowDetails> => {
  const { data } = await tmdbAxios.get<TMDBTVShowDetails>(`/tv/${tvId}`, {
    params: {
      append_to_response: "videos,credits,similar,watch/providers",
    },
  });
  return data;
};

export const getTVShowCredits = async (tvId: number): Promise<TMDBCredits> => {
  const { data } = await tmdbAxios.get<TMDBCredits>(`/tv/${tvId}/credits`);
  return data;
};

export const getTVShowVideos = async (tvId: number): Promise<TMDBVideo[]> => {
  const { data } = await tmdbAxios.get<{ id: number; results: TMDBVideo[] }>(
    `/tv/${tvId}/videos`
  );
  return data.results;
};

export const getSimilarTVShows = async (tvId: number): Promise<TMDBTVShow[]> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBTVShow>>(
    `/tv/${tvId}/similar`
  );
  return data.results;
};

export const getTVShowsByGenre = async (genreId: number, page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVShow>> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBTVShow>>("/discover/tv", {
    params: {
      with_genres: genreId,
      sort_by: "popularity.desc",
      page,
    },
  });
  return data;
};

// ─── Genres ──────────────────────────────────────────────────────────────────
export const getMovieGenres = async (): Promise<TMDBGenre[]> => {
  const { data } = await tmdbAxios.get<{ genres: TMDBGenre[] }>("/genre/movie/list");
  return data.genres;
};

export const getTVGenres = async (): Promise<TMDBGenre[]> => {
  const { data } = await tmdbAxios.get<{ genres: TMDBGenre[] }>("/genre/tv/list");
  return data.genres;
};

// ─── Search ──────────────────────────────────────────────────────────────────
export const searchMulti = async (query: string, page: number = 1): Promise<TMDBSearchResult> => {
  const { data } = await tmdbAxios.get<TMDBSearchResult>("/search/multi", {
    params: { query, page, include_adult: false },
  });
  return data;
};

export const searchMovies = async (query: string, page: number = 1): Promise<TMDBPaginatedResponse<TMDBMovie>> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBMovie>>("/search/movie", {
    params: { query, page, include_adult: false },
  });
  return data;
};

export const searchTVShows = async (query: string, page: number = 1): Promise<TMDBPaginatedResponse<TMDBTVShow>> => {
  const { data } = await tmdbAxios.get<TMDBPaginatedResponse<TMDBTVShow>>("/search/tv", {
    params: { query, page, include_adult: false },
  });
  return data;
};
