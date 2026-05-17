"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Info } from "lucide-react";
import { getBackdropUrl } from "@/kutuphane/tmdb";
import { getTitle, getReleaseDate, formatYear, truncateText } from "@/araclar/helpers";
import { useAppStore } from "@/depo/useAppStore";
import type { TMDBMovie, TMDBTVShow, MediaType } from "@/tipler/tmdb";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface HeroSliderProps {
  items: (TMDBMovie | TMDBTVShow)[];
}

// Ana Sayfa Slider Bileşeni
export function AnaSlider({ items }: HeroSliderProps) {
  const { setTrailerKey, setIsTrailerOpen } = useAppStore();

  const validItems = items.filter((item) => item.backdrop_path).slice(0, 10);

  if (validItems.length === 0) return null;

  return (
    <div className="relative w-full h-[80vh] min-h-[600px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-full"
      >
        {validItems.map((item) => {
          const title = getTitle(item);
          const releaseDate = getReleaseDate(item);
          const rating = item.vote_average;
          const mediaType: MediaType = "title" in item ? "movie" : "tv";


          return (
            <SwiperSlide key={item.id}>
              <div className="relative w-full h-full overflow-hidden">
                {/* Arka Plan Görseli */}
                <Image
                  src={getBackdropUrl(item.backdrop_path, "original")}
                  alt={title}
                  fill
                  priority
                  className="object-cover object-center scale-105"
                  sizes="100vw"
                />
                
                {/* Karartma Katmanları (Gradients) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-[#060606]/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent z-10" />

                {/* İçerik Bilgileri */}
                <div className="absolute inset-0 flex items-center z-20">
                  <div className="container-custom">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="max-w-2xl"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-[#e50914] text-white text-[10px] font-black rounded uppercase tracking-widest">
                          {mediaType === "movie" ? "Film" : "Dizi"}
                        </span>
                        {rating > 0 && (
                          <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                            <Star size={14} className="fill-yellow-400" />
                            {rating.toFixed(1)}
                          </div>
                        )}
                        <span className="text-gray-400 text-sm font-medium">{formatYear(releaseDate)}</span>
                      </div>

                      <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[1] tracking-tighter uppercase cinematic-title drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                        {title}
                      </h2>

                      <p className="text-gray-200 text-base md:text-xl leading-[1.8] mb-24 line-clamp-3 md:line-clamp-4 max-w-2xl opacity-90 font-medium">
                        {item.overview}
                      </p>

                      <div className="flex flex-wrap gap-8 mt-16">

                        <Link href={`/${mediaType === "movie" ? "film" : "dizi"}/${item.id}`}>
                          <motion.button 
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-secondary px-10 py-5 text-lg"
                          >
                            <Info size={24} />
                            Daha Fazla Bilgi
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          transition: all 0.3s ease;
          opacity: 0;
        }
        .swiper:hover .swiper-button-next, .swiper:hover .swiper-button-prev {
          opacity: 1;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: #e50914;
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.4) !important;
          width: 12px !important;
          height: 4px !important;
          border-radius: 2px !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          background: #e50914 !important;
          width: 30px !important;
        }
      `}</style>
    </div>
  );
}
