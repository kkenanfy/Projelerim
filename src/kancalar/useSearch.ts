"use client";

import { useState, useEffect, useCallback } from "react";
import { debounce } from "@/araclar/helpers";
import { searchMulti } from "@/servisler/tmdbService";
import type { TMDBSearchResult } from "@/tipler/tmdb";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim() || searchQuery.length < 2) {
        setResults(null);
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await searchMulti(searchQuery);
        setResults(data);
        setError(null);
      } catch {
        setError("Arama başarısız oldu");
      } finally {
        setIsLoading(false);
      }
    }, 400),
    []
  );

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      performSearch(query);
    } else {
      setResults(null);
      setIsLoading(false);
    }
  }, [query, performSearch]);

  const clearSearch = () => {
    setQuery("");
    setResults(null);
    setError(null);
  };

  return { query, setQuery, results, isLoading, error, clearSearch };
};
