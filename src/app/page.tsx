import { Suspense } from "react";
import { AnaSlider } from "@/bilesenler/AnaSlider";
import { FilmSatiri } from "@/bilesenler/FilmSatiri";
import { TurKesfi } from "@/bilesenler/TurKesfi";
import { YuklemeTaslagi } from "@/bilesenler/YuklemeTaslagi";
import { ApiKeyBildirimi } from "@/bilesenler/ApiKeyBildirimi";
import {
  getTrendingMovies,
  getPopularMovies,
  getPopularTVShows,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/servisler/tmdbService";
import type { TMDBMovie, TMDBTVShow } from "@/tipler/tmdb";

export const revalidate = 3600;

const empty = { results: [] as TMDBMovie[] };
const emptyTV = { results: [] as TMDBTVShow[] };

async function safeCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

async function HomeContent() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const hasValidKey = apiKey && apiKey !== "your_tmdb_api_key_here";

  if (!hasValidKey) {
    return <ApiKeyBildirimi />;
  }

  const [
    trending,
    popularMovies,
    popularTV,
    topRated,
    upcoming,
  ] = await Promise.all([
    safeCall(() => getTrendingMovies("week"), [] as TMDBMovie[]),
    safeCall(() => getPopularMovies(1), empty),
    safeCall(() => getPopularTVShows(1), emptyTV),
    safeCall(() => getTopRatedMovies(1), empty),
    safeCall(() => getUpcomingMovies(1), empty),
  ]);

  return (
    <>
      <AnaSlider items={trending} />

      <div className="py-10 space-y-2 relative z-20 -mt-20">
        <FilmSatiri
          title="🔥 Bu Hafta Trend"
          items={trending}
          mediaType="movie"
          viewAllHref="/trend"
          showRank
        />

        <FilmSatiri
          title="🎬 Popüler Filmler"
          items={popularMovies.results}
          mediaType="movie"
          viewAllHref="/filmler"
        />

        <FilmSatiri
          title="📺 Popüler Diziler"
          items={popularTV.results}
          mediaType="tv"
          viewAllHref="/dizi"
        />

        <div className="pt-20">
          <TurKesfi mediaType="movie" />
        </div>

        <FilmSatiri
          title="⭐ En Çok Beğenilenler"
          items={topRated.results}
          mediaType="movie"
          viewAllHref="/filmler?sort=top_rated"
          showRank
        />

        <FilmSatiri
          title="🚀 Yakında Geliyor"
          items={upcoming.results}
          mediaType="movie"
          viewAllHref="/filmler?sort=upcoming"
        />
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<YuklemeTaslagi variant="banner" />}>
      <HomeContent />
    </Suspense>
  );
}
