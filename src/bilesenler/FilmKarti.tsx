"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Eye } from "lucide-react";
import { getImageUrl } from "@/kutuphane/tmdb";
import { getTitle, getReleaseDate, formatYear, truncateText } from "@/araclar/helpers";
import { useAppStore } from "@/depo/useAppStore";
import type { TMDBMovie, TMDBTVShow, MediaType } from "@/tipler/tmdb";

interface MovieCardProps {
  item: TMDBMovie | TMDBTVShow;
  mediaType?: MediaType;
  size?: "sm" | "md" | "lg";
  index?: number;
}

// Film/Dizi Kartı Bileşeni
export function FilmKarti({ item, mediaType, size = "md", index }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);


  const inferredMediaType: MediaType = mediaType || ("title" in item ? "movie" : "tv");
  const title = getTitle(item);
  const releaseDate = getReleaseDate(item);
  const rating = item.vote_average;

  const sizeClasses = {
    sm: "w-36 md:w-40",
    md: "w-44 md:w-52",
    lg: "w-52 md:w-64",
  };

  const heightClasses = {
    sm: "aspect-[2/3]",
    md: "aspect-[2/3]",
    lg: "aspect-[2/3]",
  };


  const getRatingColor = (r: number) => {
    if (r >= 8) return "text-green-400";
    if (r >= 6) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index || 0) * 0.05, ease: "easeOut" }}
      className={`${sizeClasses[size]} flex-shrink-0`}
    >
      <Link href={`/${inferredMediaType === "movie" ? "film" : "dizi"}/${item.id}`}>
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Kart Görseli */}
          <motion.div
            animate={{
              scale: isHovered ? 1.04 : 1,
              y: isHovered ? -6 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`relative ${heightClasses[size]} rounded-xl overflow-hidden bg-[#1a1a1a] shadow-lg`}
          >
            {/* Sıralama Numarası (Sadece Trendlerde) */}
            {index !== undefined && index < 10 && (
              <div className="absolute top-2 left-2 z-20 w-7 h-7 bg-[#e50914] rounded-lg flex items-center justify-center text-xs font-black shadow-lg">
                {index + 1}
              </div>
            )}

            {/* Afiş Görseli */}
            {!imgError && item.poster_path ? (
              <Image
                src={getImageUrl(item.poster_path, "w342")}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 144px, 208px"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#111] gap-2">
                <span className="text-4xl">🎬</span>
                <span className="text-xs text-gray-600 text-center px-2">{title}</span>
              </div>
            )}

            {/* Üzerine Gelince Çıkan Panel */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-[#060606]/95 backdrop-blur-md flex flex-col justify-center p-6 z-30"
                >
                  <div className="mb-4">
                    <span className="px-2 py-1 bg-[#e50914] text-white text-[9px] font-black rounded uppercase tracking-widest mb-3 inline-block">
                      {inferredMediaType === "movie" ? "Film" : "Dizi"}
                    </span>
                    <h4 className="text-sm font-bold text-white line-clamp-1 mb-2">{title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 opacity-90">
                      {truncateText(item.overview, 120) || "Bu içerik için açıklama bulunmuyor."}
                    </p>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* Puan Rozeti */}
            {rating > 0 && (
              <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                <Star size={10} className="text-yellow-400 fill-yellow-400" />
                <span className={`text-xs font-bold ${getRatingColor(rating)}`}>
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </motion.div>

          {/* Alt Bilgiler */}
          <motion.div
            animate={{ 
              opacity: isHovered ? 0 : 1,
              y: isHovered ? 10 : 0 
            }}
            transition={{ duration: 0.2 }}
            className="mt-3 px-1"
          >
            <h3 className="text-sm font-semibold text-white truncate leading-tight">
              {title}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">{formatYear(releaseDate)}</span>
              {rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-400">{rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
