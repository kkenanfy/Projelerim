import Link from "next/link";
import { Film } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="relative mb-8">
        <div className="text-[120px] font-black text-[#e50914]/20 select-none leading-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Film size={64} className="text-[#e50914]" />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-3">İçerik Bulunamadı</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        Aradığınız sayfa veya içerik mevcut değil ya da kaldırılmış olabilir.
      </p>
      <Link href="/">
        <button className="btn-primary">Ana Sayfaya Dön</button>
      </Link>
    </div>
  );
}
