import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatYear = (dateString: string): string => {
  if (!dateString) return "N/A";
  return new Date(dateString).getFullYear().toString();
};

export const formatRuntime = (minutes: number): string => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}dk`;
  if (mins === 0) return `${hours}s`;
  return `${hours}s ${mins}dk`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

export const getTitle = (item: { title?: string; name?: string }): string => {
  return item.title || item.name || "Bilinmeyen";
};

export const getReleaseDate = (item: {
  release_date?: string;
  first_air_date?: string;
}): string => {
  return item.release_date || item.first_air_date || "";
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return "text-green-400";
  if (rating >= 6) return "text-yellow-400";
  if (rating >= 4) return "text-orange-400";
  return "text-red-400";
};

export const getRatingBgColor = (rating: number): string => {
  if (rating >= 8) return "bg-green-500";
  if (rating >= 6) return "bg-yellow-500";
  if (rating >= 4) return "bg-orange-500";
  return "bg-red-500";
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const getYouTubeTrailer = (
  videos: { key: string; site: string; type: string }[]
): string | null => {
  const trailer = videos?.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );
  return trailer?.key || null;
};
