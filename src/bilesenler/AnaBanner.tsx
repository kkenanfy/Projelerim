"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { getBackdropUrl, getImageUrl } from "@/kutuphane/tmdb";
import { getTitle, getReleaseDate, formatYear, truncateText } from "@/araclar/helpers";
import { useAppStore } from "@/depo/useAppStore";
import type { TMDBMovie, TMDBTVShow, MediaType } from "@/tipler/tmdb";

interface HeroBannerProps {
  items: (TMDBMovie | TMDBTVShow)[];
  mediaType?: MediaType;
}

// Ana Sayfa Banner Bileşeni
export function AnaBanner({ items, mediaType = "movie" }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setTrailerKey, setIsTrailerOpen } = useAppStore();

  const validItems = items.filter((item) => item.backdrop_path).slice(0, 8);
  const currentItem = validItems[currentIndex];

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % validItems.length);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, validItems.length]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i - 1 + validItems.length) % validItems.length);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, validItems.length]);

  const goToIndex = (idx: number) => {
    if (isTransitioning || idx === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 6000);
    return () => clearInterval(timer);
  }, [goToNext]);

  if (!currentItem) return null;

  const title = getTitle(currentItem);
  const releaseDate = getReleaseDate(currentItem);
  const rating = currentItem.vote_average;
  const itemMediaType: MediaType = "title" in currentItem ? "movie" : "tv";


  return (
    <div className="relative w-full h-[85vh] min-h-[560px] overflow-hidden">
      {/* Arka Plan Görselleri */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={getBackdropUrl(currentItem.backdrop_path, "original")}
            alt={title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Karartma Katmanları (Gradients) */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060606] to-transparent" />

      {/* İçerik Bilgileri */}
      <div className="absolute inset-0 flex items-center">
        <div className="container-custom w-full pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {/* Kategori Rozeti */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="px-3 py-1 bg-[#e50914] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  {itemMediaType === "movie" ? "🎬 Film" : "📺 Dizi"}
                </span>
                {rating > 0 && (
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                    <Star size={13} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-400 text-sm font-bold">{rating.toFixed(1)}</span>
                    <span className="text-gray-400 text-xs">/10</span>
                  </div>
                )}
                {releaseDate && (
                  <span className="text-gray-400 text-sm">{formatYear(releaseDate)}</span>
                )}
              </motion.div>

              {/* Başlık */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-4xl md:text-6xl font-black leading-none tracking-tight mb-4"
              >
                {title.length > 30 ? (
                  <>
                    <span className="block">{title.split(" ").slice(0, Math.ceil(title.split(" ").length / 2)).join(" ")}</span>
                    <span className="block text-[#e50914]">{title.split(" ").slice(Math.ceil(title.split(" ").length / 2)).join(" ")}</span>
                  </>
                ) : (
                  <>
                    <span>{title.split(" ").slice(0, -1).join(" ")} </span>
                    <span className="text-[#e50914]">{title.split(" ").slice(-1)}</span>
                  </>
                )}
              </motion.h1>

              {/* Açıklama (Özet) */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl line-clamp-3"
              >
                {truncateText(currentItem.overview, 180) || "Açıklama bulunamadı."}
              </motion.p>

              {/* İşlem Butonları */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-3"
              >

                <Link href={`/${itemMediaType === "movie" ? "film" : "dizi"}/${currentItem.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-secondary text-base px-6 py-3"
                  >
                    <Info size={18} />
                    Detaylar
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigasyon Okları */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15 transition-all z-10"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15 transition-all z-10"
      >
        <ChevronRight size={22} />
      </button>

      {/* Sayfa Noktaları (Dots) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {validItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "w-6 h-2 bg-[#e50914]"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Küçük Resim Şeridi (Thumbnail Strip) */}
      <div className="absolute bottom-16 right-8 hidden lg:flex gap-2">
        {validItems.slice(0, 4).map((item, idx) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => goToIndex(idx)}
            className={`relative w-16 h-10 rounded-lg overflow-hidden transition-all ${
              idx === currentIndex
                ? "ring-2 ring-[#e50914]"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <Image
              src={getImageUrl(item.poster_path || item.backdrop_path, "w92")}
              alt={getTitle(item)}
              fill
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
