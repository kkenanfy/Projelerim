// TMDB API Types

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
  media_type?: string;
}

export interface TMDBTVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  media_type?: string;
}

export type TMDBMediaItem = TMDBMovie | TMDBTVShow;

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TMDBProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface TMDBSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDBMovieDetails extends TMDBMovie {
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: TMDBGenre[];
  homepage: string;
  imdb_id: string;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: TMDBSpokenLanguage[];
  status: string;
  tagline: string;
  videos?: { results: TMDBVideo[] };
  credits?: TMDBCredits;
  similar?: TMDBPaginatedResponse<TMDBMovie>;
  watch_providers?: TMDBWatchProvidersResponse;
}

export interface TMDBTVShowDetails extends TMDBTVShow {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  genres: TMDBGenre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TMDBEpisode;
  next_episode_to_air: TMDBEpisode | null;
  networks: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  seasons: TMDBSeason[];
  spoken_languages: TMDBSpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  videos?: { results: TMDBVideo[] };
  credits?: TMDBCredits;
  similar?: TMDBPaginatedResponse<TMDBTVShow>;
  watch_providers?: TMDBWatchProvidersResponse;
}

export interface TMDBSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface TMDBEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  credit_id: string;
  order: number;
  profile_path: string | null;
  popularity: number;
  gender: number;
  known_for_department: string;
  adult: boolean;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  original_name: string;
  department: string;
  job: string;
  credit_id: string;
  profile_path: string | null;
  popularity: number;
  gender: number;
  known_for_department: string;
  adult: boolean;
}

export interface TMDBCredits {
  id: number;
  cast: TMDBCastMember[];
  crew: TMDBCrewMember[];
}

export interface TMDBVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface TMDBWatchProvider {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface TMDBWatchProviderResult {
  link: string;
  flatrate?: TMDBWatchProvider[];
  rent?: TMDBWatchProvider[];
  buy?: TMDBWatchProvider[];
}

export interface TMDBWatchProvidersResponse {
  id: number;
  results: Record<string, TMDBWatchProviderResult>;
}

export interface TMDBSearchResult {
  page: number;
  results: (TMDBMovie | TMDBTVShow | TMDBPerson)[];
  total_pages: number;
  total_results: number;
}

export interface TMDBPerson {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  popularity: number;
  gender: number;
  known_for_department: string;
  known_for: (TMDBMovie | TMDBTVShow)[];
  adult: boolean;
  media_type?: string;
}

export type MediaType = "movie" | "tv";

export interface HomePageData {
  trendingMovies: TMDBMovie[];
  popularMovies: TMDBMovie[];
  popularTVShows: TMDBTVShow[];
  topRatedMovies: TMDBMovie[];
  upcomingMovies: TMDBMovie[];
  actionMovies: TMDBMovie[];
  scifiMovies: TMDBMovie[];
  horrorMovies: TMDBMovie[];
  comedyMovies: TMDBMovie[];
  movieGenres: TMDBGenre[];
  tvGenres: TMDBGenre[];
}
