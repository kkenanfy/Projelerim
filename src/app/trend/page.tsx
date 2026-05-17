import { Suspense } from "react";
import type { Metadata } from "next";
import { getTrendingMovies, getTrendingAll } from "@/servisler/tmdbService";
import { FilmSatiri } from "@/bilesenler/FilmSatiri";
import { AnaSlider } from "@/bilesenler/AnaSlider";
import { YuklemeTaslagi } from "@/bilesenler/YuklemeTaslagi";
import { ApiKeyBildirimi } from "@/bilesenler/ApiKeyBildirimi";
import type { TMDBMovie, TMDBTVShow } from "@/tipler/tmdb";

export const metadata: Metadata = {
  title: "Trend İçerikler",
  description: "Bu haftanın en çok izlenen film ve dizileri",
};

export const revalidate = 1800;

async function safeCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

async function TrendingContent() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const hasValidKey = apiKey && apiKey !== "your_tmdb_api_key_here";
  if (!hasValidKey) return <ApiKeyBildirimi />;

  const [trendingMovies, trendingAll] = await Promise.all([
    safeCall(() => getTrendingMovies("week"), [] as TMDBMovie[]),
    safeCall(() => getTrendingAll("week"), [] as (TMDBMovie | TMDBTVShow)[]),
  ]);

  const trendingTV = trendingAll.filter(
    (item: TMDBMovie | TMDBTVShow) => !("title" in item)
  ) as TMDBTVShow[];

  return (
    <>
      <AnaSlider items={trendingMovies} />
      <div className="py-10 space-y-2 relative z-20 -mt-20">
        <FilmSatiri
          title="🔥 Bu Hafta Trend Filmler"
          items={trendingMovies}
          mediaType="movie"
          showRank
        />
        <FilmSatiri
          title="📺 Bu Hafta Trend Diziler"
          items={trendingTV}
          mediaType="tv"
          showRank
        />
      </div>
    </>
  );
}

export default function TrendingPage() {
  return (
    <Suspense fallback={<YuklemeTaslagi variant="banner" />}>
      <TrendingContent />
    </Suspense>
  );
}
