import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMovieDetails } from "@/servisler/tmdbService";
import { FilmDetayIstemcisi } from "@/bilesenler/FilmDetayIstemcisi";
import { YuklemeTaslagi } from "@/bilesenler/YuklemeTaslagi";
import { getBackdropUrl, getImageUrl } from "@/kutuphane/tmdb";
import { getTitle } from "@/araclar/helpers";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await getMovieDetails(Number(id));
    const title = getTitle(movie);
    return {
      title,
      description: movie.overview?.slice(0, 160),
      openGraph: {
        title,
        description: movie.overview?.slice(0, 160),
        images: movie.backdrop_path
          ? [{ url: getBackdropUrl(movie.backdrop_path, "w1280") }]
          : [],
      },
    };
  } catch {
    return { title: "Film Bulunamadı" };
  }
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) notFound();

  try {
    const movie = await getMovieDetails(movieId);
    return (
      <Suspense fallback={<YuklemeTaslagi variant="detail" />}>
        <FilmDetayIstemcisi movie={movie} />
      </Suspense>
    );
  } catch {
    notFound();
  }
}
