"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Film, Tv2, Sparkles } from "lucide-react";
import { getMovieGenres, getTVGenres } from "@/servisler/tmdbService";
import type { TMDBGenre } from "@/tipler/tmdb";

// Kategori Menüsü Bileşeni
export function KategoriMenusu() {
  const [isOpen, setIsOpen] = useState(false);
  const [movieGenres, setMovieGenres] = useState<TMDBGenre[]>([]);
  const [tvGenres, setTvGenres] = useState<TMDBGenre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieData, tvData] = await Promise.all([
          getMovieGenres(),
          getTVGenres()
        ]);
        setMovieGenres(movieData.slice(0, 15)); // Show more genres
        setTvGenres(tvData.slice(0, 15));
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div 
      className="relative group py-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-[0.15em] text-gray-400 group-hover:text-white transition-colors duration-300">
        Kategoriler
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Hareketli Alt Çizgi */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#e50914] rounded-full"
        initial={false}
        animate={{ width: isOpen ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Açılır Menü İçeriği */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
          >
            <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-[500px] grid grid-cols-2 gap-10">
              {/* Film Kategorileri */}
              <div className="border-r border-white/5 pr-5">
                <div className="flex items-center gap-2 mb-6 text-[#e50914] border-b border-[#e50914]/20 pb-2">
                  <Film size={18} />
                  <h3 className="text-sm font-black uppercase tracking-widest">Film Türleri</h3>
                </div>
                <div className="grid grid-cols-1 gap-y-2.5 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                  {movieGenres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/movies?genre=${genre.id}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center justify-between group/item"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/10 group-hover/item:bg-[#e50914] transition-colors" />
                        {genre.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Dizi Kategorileri */}
              <div className="pl-5">
                <div className="flex items-center gap-2 mb-6 text-[#e50914] border-b border-[#e50914]/20 pb-2">
                  <Tv2 size={18} />
                  <h3 className="text-sm font-black uppercase tracking-widest">Dizi Türleri</h3>
                </div>
                <div className="grid grid-cols-1 gap-y-2.5 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                  {tvGenres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/tv?genre=${genre.id}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center justify-between group/item"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/10 group-hover/item:bg-[#e50914] transition-colors" />
                        {genre.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Alt Bilgi / Tüm Kategoriler */}
              <div className="col-span-2 pt-6 mt-2 border-t border-white/5 flex justify-between items-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  Trend Türleri Keşfet
                </p>
                <Link 
                  href="/filmler"
                  className="flex items-center gap-1.5 text-[10px] text-[#e50914] font-black uppercase tracking-widest hover:text-white transition-colors"
                >
                  Tümünü Gör <Sparkles size={10} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
