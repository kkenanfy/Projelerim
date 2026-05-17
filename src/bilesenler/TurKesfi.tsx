"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TurFiltresi } from "@/bilesenler/TurFiltresi";
import { SonsuzListe } from "@/bilesenler/SonsuzListe";
import { getMovieGenres, getTVGenres, getMoviesByGenre, getTVShowsByGenre, getPopularMovies, getPopularTVShows } from "@/servisler/tmdbService";
import type { TMDBGenre, MediaType } from "@/tipler/tmdb";

interface GenreExplorerProps {
  mediaType: MediaType;
}

// Tür Keşfi Bileşeni
export function TurKesfi({ mediaType }: GenreExplorerProps) {
  const searchParams = useSearchParams();
  const genreParam = searchParams.get("genre");

  const [genres, setGenres] = useState<TMDBGenre[]>([]);
  const [activeGenre, setActiveGenre] = useState<number | null>(
    genreParam ? parseInt(genreParam) : null
  );
  const [initialItems, setInitialItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // URL parametresindeki türe göre aktif türü güncelle
  useEffect(() => {
    if (genreParam) {
      setActiveGenre(parseInt(genreParam));
    } else {
      setActiveGenre(null);
    }
  }, [genreParam]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = mediaType === "movie" ? await getMovieGenres() : await getTVGenres();
        setGenres(data);
      } catch (err) {
        console.error("Genres load error:", err);
      }
    };
    loadGenres();
  }, [mediaType]);

  useEffect(() => {
    const loadInitial = async () => {
      setIsLoading(true);
      try {
        const data = activeGenre 
          ? (mediaType === "movie" ? await getMoviesByGenre(activeGenre, 1) : await getTVShowsByGenre(activeGenre, 1))
          : (mediaType === "movie" ? await getPopularMovies(1) : await getPopularTVShows(1));
        setInitialItems(data.results);
      } catch (err) {
        console.error("Initial items load error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitial();
  }, [mediaType, activeGenre]);

  const fetchFunction = (page: number) => {
    if (activeGenre) {
      return mediaType === "movie" ? getMoviesByGenre(activeGenre, page) : getTVShowsByGenre(activeGenre, page);
    }
    return mediaType === "movie" ? getPopularMovies(page) : getPopularTVShows(page);
  };

  return (
    <div className="space-y-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="section-title text-xl whitespace-nowrap">
            {activeGenre 
              ? `${genres.find(g => g.id === activeGenre)?.name || ""} ${mediaType === "movie" ? "Filmleri" : "Dizileri"}` 
              : (mediaType === "movie" ? "Filmleri Keşfet" : "Dizileri Keşfet")}
          </h2>
          <div className="max-w-3xl flex-1">
            <TurFiltresi 
              genres={genres} 
              activeGenre={activeGenre} 
              onGenreChange={setActiveGenre} 
            />
          </div>
        </div>
      </div>

      {!isLoading ? (
        <SonsuzListe 
          key={`${mediaType}-${activeGenre}`} // Tür değiştiğinde listeyi sıfırla
          initialItems={initialItems} 
          mediaType={mediaType} 
          fetchFunction={fetchFunction} 
        />
      ) : (
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] skeleton rounded-xl" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
