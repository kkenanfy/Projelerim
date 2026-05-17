"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = (
  fetchMore: () => Promise<void>,
  hasMore: boolean,
  options: UseInfiniteScrollOptions = {}
) => {
  const { threshold = 0.1, rootMargin = "200px" } = options;
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleFetch = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      await fetchMore();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, fetchMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          handleFetch();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleFetch, hasMore, isLoading, threshold, rootMargin]);

  return { sentinelRef, isLoading };
};
