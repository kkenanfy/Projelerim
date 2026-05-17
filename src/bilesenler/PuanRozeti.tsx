"use client";

import { Star, StarHalf } from "lucide-react";
import { cn } from "@/araclar/helpers";

interface RatingBadgeProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showStars?: boolean;
  className?: string;
}

// Puan Rozeti Bileşeni
export function PuanRozeti({
  rating,
  size = "md",
  showStars = false,
  className,
}: RatingBadgeProps) {
  const starCount = Math.round(rating / 2);

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  const getColor = (r: number) => {
    if (r >= 8) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (r >= 6) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (r >= 4) return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* IMDB-style Badge */}
      <div className="rating-badge">
        <span>⭐</span>
        <span>{rating.toFixed(1)}</span>
      </div>

      {showStars && (
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => {
            const filled = i < Math.floor(rating / 2);
            const half = !filled && i < Math.ceil(rating / 2);
            return (
              <span key={i}>
                {filled ? (
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                ) : half ? (
                  <StarHalf size={12} className="text-yellow-400 fill-yellow-400" />
                ) : (
                  <Star size={12} className="text-gray-600" />
                )}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
