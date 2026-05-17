import { Suspense } from "react";
import type { Metadata } from "next";
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, getNowPlayingMovies } from "@/servisler/tmdbService";
import { AnaSlider } from "@/bilesenler/AnaSlider";
import { FilmSatiri } from "@/bilesenler/FilmSatiri";
import { TurKesfi } from "@/bilesenler/TurKesfi";
import { YuklemeTaslagi } from "@/bilesenler/YuklemeTaslagi";
import { ApiKeyBildirimi } from "@/bilesenler/ApiKeyBildirimi";
import type { TMDBMovie } from "@/tipler/tmdb";

export const metadata: Metadata = {
  title: "Filmler | SineFix",
  description: "En popüler filmler, en çok beğenilenler ve yakında gelecek yapımlar hakkında bilgi alın.",
};

export const revalidate = 3600;

const empty = { results: [] as TMDBMovie[] };
async function safeCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

async function MoviesContent() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const hasValidKey = apiKey && apiKey !== "your_tmdb_api_key_here";
  if (!hasValidKey) return <ApiKeyBildirimi />;

  const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
    safeCall(() => getPopularMovies(1), empty),
    safeCall(() => getTopRatedMovies(1), empty),
    safeCall(() => getUpcomingMovies(1), empty),
    safeCall(() => getNowPlayingMovies(1), empty),
  ]);

  return (
    <>
      <AnaSlider items={popular.results} />
      
      <div className="py-10 space-y-2 relative z-20 -mt-20">
        <FilmSatiri title="🎬 Şu An Gösterimde" items={nowPlaying.results} mediaType="movie" />
        <FilmSatiri title="⭐ En Çok Beğenilenler" items={topRated.results} mediaType="movie" showRank />
        <FilmSatiri title="🚀 Yakında Geliyor" items={upcoming.results} mediaType="movie" />

        <div className="pt-20">
          <TurKesfi mediaType="movie" />
        </div>
      </div>
    </>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<YuklemeTaslagi variant="banner" />}>
      <MoviesContent />
    </Suspense>
  );
}
