import Link from "next/link";
import { Film, Heart, ExternalLink, Globe, Rss, MessageCircle } from "lucide-react";

const footerLinks = {
  Keşfet: [
    { label: "Filmler", href: "/filmler" },
    { label: "Diziler", href: "/dizi" },
    { label: "Trend", href: "/trend" },
  ],
  Kategoriler: [
    { label: "Aksiyon", href: "/filmler?genre=28" },
    { label: "Bilim Kurgu", href: "/filmler?genre=878" },
    { label: "Korku", href: "/filmler?genre=27" },
    { label: "Komedi", href: "/filmler?genre=35" },
  ],
  Hakkında: [
    { label: "TMDB", href: "https://www.themoviedb.org", external: true },
    { label: "Gizlilik", href: "#" },
    { label: "Kullanım Şartları", href: "#" },
    { label: "İletişim", href: "#" },
  ],
};

// Alt Bilgi (Footer) Bileşeni
export function AltBilgi() {
  return (
    <footer className="border-t border-white/5 bg-[#060606] mt-20 pb-20 md:pb-0">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Marka ve Açıklama */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-11 h-11 bg-[#e50914] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.2)]">
                <Film size={24} className="text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter">
                Sine<span className="text-[#e50914]">Fix</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              Binlerce film ve dizi tek platformda. En sevdiğin içerikleri keşfet ve keyfini çıkar.
            </p>
            {/* Sosyal Medya Bağlantıları */}
            <div className="flex gap-3">
              {[
                { icon: Globe, href: "#" },
                { icon: Rss, href: "#" },
                { icon: MessageCircle, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:bg-[#e50914]/20 hover:border-[#e50914]/40 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Bağlantılar */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className="text-gray-500 hover:text-white text-sm transition-colors flex items-center gap-1.5 group"
                    >
                      {link.label}
                      {"external" in link && link.external && (
                        <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Alt Çubuk */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2026 SineFix. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-1.5 text-gray-600 text-xs">
            <span>TMDB API ile güçlendirilmiştir</span>
            <Heart size={12} className="text-[#e50914] fill-[#e50914]" />
          </div>
          <p className="text-gray-700 text-xs">
            Bu platform TMDB tarafından onaylanmamıştır.
          </p>
        </div>
      </div>
    </footer>
  );
}
