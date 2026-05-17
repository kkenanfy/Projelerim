"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FilmKarti } from "@/bilesenler/FilmKarti";
import { YuklemeTaslagi } from "@/bilesenler/YuklemeTaslagi";
import type { TMDBMovie, TMDBTVShow, MediaType } from "@/tipler/tmdb";

interface MovieRowProps {
  title: string;
  items: (TMDBMovie | TMDBTVShow)[];
  mediaType?: MediaType;
  isLoading?: boolean;
  viewAllHref?: string;
  size?: "sm" | "md" | "lg";
  showRank?: boolean;
}

// Film/Dizi Satırı (Yatay Kaydırılabilir)
export function FilmSatiri({
  title,
  items,
  mediaType,
  isLoading = false,
  viewAllHref,
  size = "md",
  showRank = false,
}: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="container-custom">
          <div className="skeleton h-7 w-48 rounded mb-6" />
          <YuklemeTaslagi count={6} />
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <section className="mb-12 group/section">
      <div className="container-custom">
        {/* Bölüm Başlığı */}
        <div className="flex items-center justify-between mb-5">
          <motion.h2
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="section-title text-lg md:text-xl"
          >
            {title}
          </motion.h2>
          {viewAllHref && (
            <Link href={viewAllHref}>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#e50914] transition-colors font-medium"
              >
                Tümünü Gör
                <ArrowRight size={15} />
              </motion.div>
            </Link>
          )}
        </div>

        {/* Kaydırma Çubuğu Kapsayıcısı */}
        <div className="relative">
          {/* Sol Ok */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[#0d0d0d]/90 border border-white/10 text-white hover:bg-[#e50914] hover:border-[#e50914] transition-all opacity-0 group-hover/section:opacity-100 shadow-xl"
            aria-label="Sola kaydır"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Sağ Ok */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[#0d0d0d]/90 border border-white/10 text-white hover:bg-[#e50914] hover:border-[#e50914] transition-all opacity-0 group-hover/section:opacity-100 shadow-xl"
            aria-label="Sağa kaydır"
          >
            <ChevronRight size={20} />
          </button>

          {/* Kenar Gölgeleri */}
          <div className="absolute left-0 top-0 bottom-8 w-8 bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-8 w-8 bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none" />

          {/* Kaydırılabilir Liste */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-row"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} style={{ scrollSnapAlign: "start" }}>
                <FilmKarti
                  item={item}
                  mediaType={mediaType}
                  size={size}
                  index={showRank ? index : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
