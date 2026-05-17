import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTVShowDetails } from "@/servisler/tmdbService";
import { DiziDetayIstemcisi } from "@/bilesenler/DiziDetayIstemcisi";
import { YuklemeTaslagi } from "@/bilesenler/YuklemeTaslagi";
import { getBackdropUrl } from "@/kutuphane/tmdb";
import { getTitle } from "@/araclar/helpers";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const show = await getTVShowDetails(Number(id));
    const title = getTitle(show);
    return {
      title,
      description: show.overview?.slice(0, 160),
      openGraph: {
        title,
        description: show.overview?.slice(0, 160),
        images: show.backdrop_path
          ? [{ url: getBackdropUrl(show.backdrop_path, "w1280") }]
          : [],
      },
    };
  } catch {
    return { title: "Dizi Bulunamadı" };
  }
}

export default async function TVDetailPage({ params }: PageProps) {
  const { id } = await params;
  const tvId = Number(id);

  if (isNaN(tvId)) notFound();

  try {
    const show = await getTVShowDetails(tvId);
    return (
      <Suspense fallback={<YuklemeTaslagi variant="detail" />}>
        <DiziDetayIstemcisi show={show} />
      </Suspense>
    );
  } catch {
    notFound();
  }
}
