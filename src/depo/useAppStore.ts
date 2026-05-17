"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TMDBMovie, TMDBTVShow, MediaType } from "@/tipler/tmdb";

type WatchlistItem = (TMDBMovie | TMDBTVShow) & { media_type: MediaType };

interface AppStore {
  // Watchlist
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: number, mediaType: MediaType) => void;
  isInWatchlist: (id: number, mediaType: MediaType) => boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Trailer Modal
  trailerKey: string | null;
  setTrailerKey: (key: string | null) => void;
  isTrailerOpen: boolean;
  setIsTrailerOpen: (open: boolean) => void;

  // Active Genre Filter
  activeGenre: number | null;
  setActiveGenre: (id: number | null) => void;

  // Mobile Menu
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Watchlist
      watchlist: [],
      addToWatchlist: (item) =>
        set((state) => ({
          watchlist: state.watchlist.some(
            (w) => w.id === item.id && w.media_type === item.media_type
          )
            ? state.watchlist
            : [...state.watchlist, item],
        })),
      removeFromWatchlist: (id, mediaType) =>
        set((state) => ({
          watchlist: state.watchlist.filter(
            (w) => !(w.id === id && w.media_type === mediaType)
          ),
        })),
      isInWatchlist: (id, mediaType) =>
        get().watchlist.some((w) => w.id === id && w.media_type === mediaType),

      // Search
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      isSearchOpen: false,
      setIsSearchOpen: (open) => set({ isSearchOpen: open }),

      // Trailer Modal
      trailerKey: null,
      setTrailerKey: (key) => set({ trailerKey: key }),
      isTrailerOpen: false,
      setIsTrailerOpen: (open) => set({ isTrailerOpen: open }),

      // Active Genre Filter
      activeGenre: null,
      setActiveGenre: (id) => set({ activeGenre: id }),

      // Mobile Menu
      isMobileMenuOpen: false,
      setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    }),
    {
      name: "sinefix-store",
      partialize: (state) => ({ watchlist: state.watchlist }),
    }
  )
);
