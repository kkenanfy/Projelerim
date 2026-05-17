import { Suspense } from "react";
import type { Metadata } from "next";
import { getPopularTVShows, getTopRatedTVShows, getAiringTodayTVShows } from "@/servisler/tmdbService";
import { AnaSlider } from "@/bilesenler/AnaSlider";
import { FilmSatiri } from "@/bilesenler/FilmSatiri";
import { TurKesfi } from "@/bilesenler/TurKesfi";
import { YuklemeTaslagi } from "@/bilesenler/YuklemeTaslagi";
import { ApiKeyBildirimi } from "@/bilesenler/ApiKeyBildirimi";
import type { TMDBTVShow } from "@/tipler/tmdb";

export const metadata: Metadata = {
  title: "Diziler | SineFix",
  description: "En popüler ve en çok beğenilen diziler hakkında detaylı bilgi edinin.",
};

export const revalidate = 3600;

const emptyTV = { results: [] as TMDBTVShow[] };
async function safeCall<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

async function TVContent() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const hasValidKey = apiKey && apiKey !== "your_tmdb_api_key_here";
  if (!hasValidKey) return <ApiKeyBildirimi />;

  const [popular, topRated, airingToday] = await Promise.all([
    safeCall(() => getPopularTVShows(1), emptyTV),
    safeCall(() => getTopRatedTVShows(1), emptyTV),
    safeCall(() => getAiringTodayTVShows(1), emptyTV),
  ]);

  return (
    <>
      <AnaSlider items={popular.results} />
      
      <div className="py-10 space-y-2 relative z-20 -mt-20">
        <FilmSatiri title="📺 Bugün Yayınlananlar" items={airingToday.results} mediaType="tv" />
        <FilmSatiri title="⭐ En Çok Beğenilenler" items={topRated.results} mediaType="tv" showRank />

        <div className="pt-20">
          <TurKesfi mediaType="tv" />
        </div>
      </div>
    </>
  );
}

export default function TVPage() {
  return (
    <Suspense fallback={<YuklemeTaslagi variant="banner" />}>
      <TVContent />
    </Suspense>
  );
}
