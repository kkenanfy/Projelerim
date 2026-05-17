"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Menu,
  Film,
  Tv2,
  Flame,
  Home,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useAppStore } from "@/depo/useAppStore";
import { useSearch } from "@/kancalar/useSearch";
import { getImageUrl } from "@/kutuphane/tmdb";
import { getTitle, formatYear } from "@/araclar/helpers";
import Image from "next/image";
import { KategoriMenusu } from "./KategoriMenusu";
import { getMovieGenres, getTVGenres } from "@/servisler/tmdbService";
import type { TMDBGenre } from "@/tipler/tmdb";

// Navigasyon Bağlantıları
const navLinks = [
  { href: "/", label: "Ana Sayfa", icon: Home },
  { href: "/filmler", label: "Filmler", icon: Film },
  { href: "/dizi", label: "Diziler", icon: Tv2 },
  { href: "/trend", label: "Trend", icon: Flame },
];

export function Navigasyon() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = [useAppStore(state => state.isMobileMenuOpen), useAppStore(state => state.setIsMobileMenuOpen)];
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [movieGenres, setMovieGenres] = useState<TMDBGenre[]>([]);
  const [tvGenres, setTvGenres] = useState<TMDBGenre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [m, t] = await Promise.all([getMovieGenres(), getTVGenres()]);
        setMovieGenres(m.slice(0, 8));
        setTvGenres(t.slice(0, 8));
      } catch (err) { console.error(err); }
    };
    fetchGenres();
  }, []);
  const { query, setQuery, results, isLoading, clearSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchActive(false);
        clearSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clearSearch]);

  const handleSearchOpen = () => {
    setIsSearchActive(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const filteredResults = results?.results?.filter(
    (r: any) => r.media_type === "movie" || r.media_type === "tv"
  ).slice(0, 6);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#060606]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "navbar-gradient"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo - SineFix */}
            <Link href="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 bg-[#e50914] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.3)]">
                  <Film size={22} className="text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter">
                  Sine<span className="text-[#e50914]">Fix</span>
                </span>
              </motion.div>
            </Link>

            {/* Masaüstü Menü Bağlantıları */}
            <div className="hidden md:flex items-center gap-10 lg:gap-14">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} className="relative group py-2">
                    <span className={`text-[14px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    }`}>
                      {link.label}
                    </span>
                    {/* Animated Underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-[#e50914] rounded-full"
                      initial={false}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </Link>
                );
              })}
              
              <KategoriMenusu />
            </div>

            {/* Sağ Taraftaki İşlemler (Arama) */}
            <div className="flex items-center gap-10">
              {/* Arama Çubuğu */}
              <div ref={searchRef} className="relative">
                <AnimatePresence mode="wait">
                  {isSearchActive ? (
                    <motion.div
                      key="search-input"
                      initial={{ width: 40, opacity: 0 }}
                      animate={{ width: 260, opacity: 1 }}
                      exit={{ width: 40, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2"
                    >
                      <Search size={16} className="text-gray-400 flex-shrink-0" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Film, dizi ara..."
                        className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full"
                      />
                      {query && (
                        <button
                          onClick={() => { clearSearch(); }}
                          className="text-gray-400 hover:text-white flex-shrink-0"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </motion.div>
                  ) : (
                    <motion.button
                      key="search-btn"
                      onClick={handleSearchOpen}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/15 text-gray-300 hover:text-white transition-all"
                    >
                      <Search size={17} />
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Arama Sonuçları Açılır Menüsü */}
                <AnimatePresence>
                  {isSearchActive && (query.length > 1) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-12 right-0 w-80 bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                      {isLoading ? (
                        <div className="p-4 space-y-3">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-3 items-center">
                              <div className="skeleton w-10 h-14 rounded flex-shrink-0" />
                              <div className="flex-1 space-y-2">
                                <div className="skeleton h-4 w-3/4 rounded" />
                                <div className="skeleton h-3 w-1/2 rounded" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : filteredResults && filteredResults.length > 0 ? (
                        <div>
                          {filteredResults.map((item) => {
                            const typedItem = item as { id: number; media_type?: string; poster_path?: string | null; title?: string; name?: string; release_date?: string; first_air_date?: string; vote_average?: number };
                            return (
                                <Link
                                  key={typedItem.id}
                                  href={`/${typedItem.media_type === "movie" ? "film" : "dizi"}/${typedItem.id}`}
                                  onClick={() => { setIsSearchActive(false); clearSearch(); }}
                                >
                                <motion.div
                                  whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                                  className="flex items-center gap-3 p-3 transition-colors"
                                >
                                  <div className="w-10 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                                    {typedItem.poster_path ? (
                                      <Image
                                        src={getImageUrl(typedItem.poster_path, "w92")}
                                        alt={getTitle(typedItem)}
                                        width={40}
                                        height={56}
                                        className="object-cover w-full h-full"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-white/5">
                                        <Film size={14} className="text-gray-600" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                      {getTitle(typedItem)}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-xs text-[#e50914] font-medium uppercase">
                                        {typedItem.media_type === "movie" ? "Film" : "Dizi"}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {formatYear(typedItem.release_date || typedItem.first_air_date || "")}
                                      </span>
                                      {typedItem.vote_average && typedItem.vote_average > 0 && (
                                        <span className="text-xs text-yellow-400 font-medium">
                                          ⭐ {typedItem.vote_average.toFixed(1)}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              </Link>
                            );
                          })}
                          <Link
                            href={`/ara?q=${encodeURIComponent(query)}`}
                            onClick={() => { setIsSearchActive(false); clearSearch(); }}
                          >
                            <div className="p-3 border-t border-white/8 text-center">
                              <span className="text-sm text-[#e50914] hover:text-white transition-colors font-medium">
                                Tüm sonuçları gör →
                              </span>
                            </div>
                          </Link>
                        </div>
                      ) : query.length > 1 && !isLoading ? (
                        <div className="p-6 text-center text-gray-500 text-sm">
                          Sonuç bulunamadı
                        </div>
                      ) : null}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>


              {/* Mobil Menü Butonu */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/8 text-white"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={18} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobil Menü İçeriği */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#0a0a0a]/98 backdrop-blur-2xl border-l border-white/8 p-6 pt-20">
              <div className="space-y-2">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                            isActive
                              ? "bg-[#e50914]/15 text-white border border-[#e50914]/20"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <Icon size={18} />
                          <span className="font-medium">{link.label}</span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobil Kategoriler Bölümü */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <button
                    onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles size={18} />
                      <span className="font-medium">Kategoriler</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isMobileCategoriesOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isMobileCategoriesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white/5 rounded-xl mt-2 mx-2"
                      >
                        <div className="p-4 space-y-6">
                          <div>
                            <p className="text-[10px] font-black text-[#e50914] uppercase tracking-widest mb-3">Filmler</p>
                            <div className="grid grid-cols-2 gap-2">
                              {movieGenres.map(g => (
                                <Link key={g.id} href={`/filmler?genre=${g.id}`} onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-gray-400 py-1.5">{g.name}</Link>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-[#e50914] uppercase tracking-widest mb-3">Diziler</p>
                            <div className="grid grid-cols-2 gap-2">
                              {tvGenres.map(g => (
                                <Link key={g.id} href={`/dizi?genre=${g.id}`} onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-gray-400 py-1.5">{g.name}</Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobil Alt Navigasyon (Tab Bar) */}
      <div className="bottom-nav md:hidden">
        <div className="flex justify-around items-center px-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <div className={`flex flex-col items-center gap-1 py-2 px-3 transition-all ${
                  isActive ? "text-[#e50914]" : "text-gray-500"
                }`}>
                  <Icon size={20} />
                  <span className="text-[10px] font-medium">{link.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
