"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star, Clock, Calendar, Globe,
  Tv2, Users
} from "lucide-react";
import { getBackdropUrl, getImageUrl, getProfileUrl } from "@/kutuphane/tmdb";
import { formatYear, formatRuntime, truncateText } from "@/araclar/helpers";
import { useAppStore } from "@/depo/useAppStore";
import { FilmSatiri } from "@/bilesenler/FilmSatiri";
import { PuanRozeti } from "@/bilesenler/PuanRozeti";
import type { TMDBMovieDetails } from "@/tipler/tmdb";

// Film Detay Sayfası İstemci Bileşeni
export function FilmDetayIstemcisi({ movie }: { movie: TMDBMovieDetails }) {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const { setTrailerKey, setIsTrailerOpen } = useAppStore();


  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const cast = movie.credits?.cast?.slice(0, 12) || [];
  const watchProvidersTR = movie.watch_providers?.results?.["TR"];

  return (
    <div className="min-h-screen">
      {/* Arka Plan Görseli (Backdrop) */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={getBackdropUrl(movie.backdrop_path, "original")}
          alt={movie.title}
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/60 to-transparent" />
      </div>

      {/* Ana İçerik */}
      <div className="container-custom -mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Afiş */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="w-48 md:w-56 mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5">
              <Image
                src={getImageUrl(movie.poster_path, "w342")}
                alt={movie.title}
                width={224}
                height={336}
                className="w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Bilgiler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 pt-4 md:pt-16"
          >
            {/* Kategoriler */}
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-[#e50914]/15 text-[#e50914] border border-[#e50914]/20"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Başlık */}
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-2">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-gray-400 italic text-sm mb-4">"{movie.tagline}"</p>
            )}

            {/* Meta Bilgiler */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <PuanRozeti rating={movie.vote_average} showStars />
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={14} />
                <span>{formatYear(movie.release_date)}</span>
              </div>
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Clock size={14} />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
              {movie.original_language && (
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Globe size={14} />
                  <span className="uppercase">{movie.original_language}</span>
                </div>
              )}
            </div>

            {/* Açıklama (Özet) */}
            <div className="mb-8 max-w-4xl">
              <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
                {showFullOverview
                  ? movie.overview
                  : truncateText(movie.overview, 250)}
              </p>
              {movie.overview?.length > 250 && (
                <button
                  onClick={() => setShowFullOverview(!showFullOverview)}
                  className="text-[#e50914] text-base mt-2 hover:underline font-medium"
                >
                  {showFullOverview ? "Daha az göster" : "Daha fazla göster"}
                </button>
              )}
            </div>


            {/* Yönetmen */}
            {director && (
              <div className="text-sm text-gray-400">
                <span className="text-gray-600">Yönetmen: </span>
                <span className="text-white font-medium">{director.name}</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* İzleme Platformları */}
        {watchProvidersTR && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 p-5 rounded-2xl bg-white/4 border border-white/8"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Tv2 size={18} className="text-[#e50914]" />
              Nerede İzlenir (TR)
            </h3>
            {watchProvidersTR.flatrate && (
              <div className="flex flex-wrap gap-3">
                {watchProvidersTR.flatrate.map((provider) => (
                  <div key={provider.provider_id} className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt={provider.provider_name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-500 text-center max-w-12 truncate">
                      {provider.provider_name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Oyuncu Kadrosu */}
        {cast.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-10"
          >
            <h3 className="section-title text-xl mb-5">
              <Users size={18} className="text-[#e50914]" />
              Oyuncular
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scroll-row">
              {cast.map((actor) => (
                <div key={actor.id} className="flex-shrink-0 w-24 text-center group">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#e50914]/50 transition-all mb-2">
                    <Image
                      src={getProfileUrl(actor.profile_path)}
                      alt={actor.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-xs font-medium text-white truncate">{actor.name}</p>
                  <p className="text-xs text-gray-500 truncate">{actor.character}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Benzer Filmler */}
        {movie.similar && movie.similar.results.length > 0 && (
          <div className="mt-10 mb-10">
            <FilmSatiri
              title="Benzer İçerikler"
              items={movie.similar.results}
              mediaType="movie"
            />
          </div>
        )}

      </div>
    </div>
  );
}
