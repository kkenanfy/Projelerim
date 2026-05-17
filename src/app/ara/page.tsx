"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Film, Tv2, X } from "lucide-react";
import { searchMulti } from "@/servisler/tmdbService";
import { FilmKarti } from "@/bilesenler/FilmKarti";
import { YuklemeTaslagi } from "@/bilesenler/YuklemeTaslagi";
import type { TMDBMovie, TMDBTVShow, MediaType } from "@/tipler/tmdb";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<(TMDBMovie | TMDBTVShow)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "movie" | "tv">("all");

  useEffect(() => {
    if (!query) return;
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await searchMulti(query);
        const filtered = data.results.filter(
          (r: { media_type?: string }) => r.media_type === "movie" || r.media_type === "tv"
        ) as (TMDBMovie | TMDBTVShow)[];
        setResults(filtered);
      } catch {
        setError("Arama başarısız oldu. Lütfen tekrar deneyin.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  const filteredResults = results.filter((r) => {
    if (filter === "all") return true;
    if (filter === "movie") return "title" in r;
    return !("title" in r);
  });

  return (
    <div className="min-h-screen pt-24 pb-24 md:pb-10">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Search size={28} className="text-[#e50914]" />
            <h1 className="text-3xl font-black">
              {query ? `"${query}" için sonuçlar` : "Arama"}
            </h1>
          </div>
          {results.length > 0 && (
            <p className="text-gray-500">{results.length} içerik bulundu</p>
          )}
        </motion.div>

        {/* Filters */}
        {!isLoading && results.length > 0 && (
          <div className="flex gap-2 mb-8">
            {(["all", "movie", "tv"] as const).map((f) => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(f)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-[#e50914] text-white"
                    : "bg-white/7 text-gray-400 hover:text-white hover:bg-white/12 border border-white/8"
                }`}
              >
                {f === "all" && "Tümü"}
                {f === "movie" && <><Film size={14} /> Filmler</>}
                {f === "tv" && <><Tv2 size={14} /> Diziler</>}
              </motion.button>
            ))}
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <YuklemeTaslagi count={12} />
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
              <Search size={36} className="text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-400 mb-2">
              {query ? "Sonuç bulunamadı" : "Aramaya başlayın"}
            </h2>
            <p className="text-gray-600 text-sm">
              {query
                ? `"${query}" için herhangi bir içerik bulunamadı`
                : "Film veya dizi adı girerek arama yapın"}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredResults.map((item, index) => {
                const mediaType: MediaType = "title" in item ? "movie" : "tv";
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <FilmKarti item={item} mediaType={mediaType} index={index} />
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<YuklemeTaslagi count={12} />}>
      <SearchContent />
    </Suspense>
  );
}
