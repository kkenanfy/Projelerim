"use client";

import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  count?: number;
  variant?: "card" | "banner" | "detail";
}

// Yükleme Taslağı (Skeleton) Bileşeni
export function YuklemeTaslagi({
  count = 6,
  variant = "card",
}: LoadingSkeletonProps) {
  if (variant === "banner") {
    return (
      <div className="relative w-full h-[85vh] min-h-[560px] bg-[#0d0d0d]">
        <div className="skeleton absolute inset-0" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom pt-16 space-y-4">
            <div className="skeleton h-5 w-32 rounded-full" />
            <div className="skeleton h-14 w-96 rounded" />
            <div className="skeleton h-14 w-64 rounded" />
            <div className="skeleton h-4 w-full max-w-lg rounded" />
            <div className="skeleton h-4 w-80 rounded" />
            <div className="flex gap-3 mt-6">
              <div className="skeleton h-12 w-32 rounded-lg" />
              <div className="skeleton h-12 w-36 rounded-lg" />
              <div className="skeleton h-12 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div className="min-h-screen bg-[#060606]">
        <div className="skeleton h-[55vh] w-full" />
        <div className="container-custom py-8 space-y-6">
          <div className="flex gap-6">
            <div className="skeleton w-44 h-64 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-4">
              <div className="skeleton h-8 w-64 rounded" />
              <div className="skeleton h-5 w-48 rounded" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton h-6 w-20 rounded-full" />
                ))}
              </div>
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-5/6 rounded" />
              <div className="skeleton h-4 w-4/6 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.06 }}
          className="flex-shrink-0 w-44 md:w-52 space-y-3"
        >
          <div className="skeleton aspect-[2/3] rounded-xl" />
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </motion.div>
      ))}
    </div>
  );
}
