"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TMDBGenre } from "@/tipler/tmdb";

interface GenreFilterProps {
  genres: TMDBGenre[];
  activeGenre: number | null;
  onGenreChange: (id: number | null) => void;
}

// Tür Filtresi Bileşeni
export function TurFiltresi({ genres, activeGenre, onGenreChange }: GenreFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group/genres">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#060606]/90 border border-white/10 text-white hover:text-[#e50914] opacity-0 group-hover/genres:opacity-100 transition-all"
      >
        <ChevronLeft size={16} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-row py-1 px-1 no-scrollbar"
      >
        {/* All */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onGenreChange(null)}
          className={`genre-chip flex-shrink-0 ${activeGenre === null ? "active" : ""}`}
        >
          Tümü
        </motion.button>

        {genres.map((genre) => (
          <motion.button
            key={genre.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onGenreChange(genre.id)}
            className={`genre-chip flex-shrink-0 ${activeGenre === genre.id ? "active" : ""}`}
          >
            {genre.name}
          </motion.button>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#060606]/90 border border-white/10 text-white hover:text-[#e50914] opacity-0 group-hover/genres:opacity-100 transition-all"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
