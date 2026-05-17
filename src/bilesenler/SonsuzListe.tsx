"use client";

import { useEffect, useState, useCallback } from "react";
import { FilmKarti } from "@/bilesenler/FilmKarti";
import { YuklemeTaslagi } from "@/bilesenler/YuklemeTaslagi";
import { useInfiniteScroll } from "@/kancalar/useInfiniteScroll";
import type { TMDBMovie, TMDBTVShow, MediaType, TMDBPaginatedResponse } from "@/tipler/tmdb";

interface InfiniteGridProps {
  initialItems: (TMDBMovie | TMDBTVShow)[];
  mediaType: MediaType;
  fetchFunction: (page: number) => Promise<TMDBPaginatedResponse<any>>;
}

// Sonsuz Kaydırma Liste Bileşeni
export function SonsuzListe({ initialItems, mediaType, fetchFunction }: InfiniteGridProps) {
  const [items, setItems] = useState<(TMDBMovie | TMDBTVShow)[]>(initialItems);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = useCallback(async () => {
    try {
      const data = await fetchFunction(page);
      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
        if (page >= data.total_pages) setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more items:", error);
      setHasMore(false);
    }
  }, [page, fetchFunction]);

  const { sentinelRef, isLoading } = useInfiniteScroll(fetchMore, hasMore);

  return (
    <div className="container-custom py-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {items.map((item, index) => (
          <FilmKarti 
            key={`${item.id}-${index}`} 
            item={item} 
            mediaType={mediaType} 
            index={index % 20} 
          />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="py-20 flex justify-center">
          {isLoading && <YuklemeTaslagi count={6} />}
        </div>
      )}
      
      {!hasMore && items.length > 0 && (
        <p className="text-center text-gray-500 py-10 text-sm italic">
          Tüm içerikleri gördünüz.
        </p>
      )}
    </div>
  );
}
