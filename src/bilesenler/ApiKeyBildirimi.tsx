import Link from "next/link";
import { Key, ExternalLink, Film } from "lucide-react";

// API Key Bildirimi Bileşeni
export function ApiKeyBildirimi() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-[#e50914] rounded-2xl flex items-center justify-center">
          <Film size={24} className="text-white" />
        </div>
        <span className="text-3xl font-black">
          Sine<span className="text-[#e50914]">Fix</span>
        </span>
      </div>

      {/* Card */}
      <div className="glass-card max-w-lg w-full p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
          <Key size={28} className="text-yellow-400" />
        </div>
        <h1 className="text-2xl font-bold mb-3">TMDB API Key Gerekli</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          SineFix&apos;i kullanmak için geçerli bir TMDB API key&apos;i ayarlamanız gerekiyor.
          API key ücretsizdir ve birkaç dakikada alınabilir.
        </p>

        {/* Steps */}
        <div className="space-y-4 text-left mb-8">
          {[
            {
              step: "1",
              title: "TMDB hesabı oluştur",
              desc: "themoviedb.org adresine gidin ve ücretsiz kayıt olun",
            },
            {
              step: "2",
              title: "API Key al",
              desc: "Ayarlar → API bölümünden ücretsiz API key isteyin",
            },
            {
              step: "3",
              title: ".env.local dosyasını düzenle",
              desc: "Proje klasöründeki .env.local dosyasında API key'i güncelleyin",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4 items-start">
              <div className="w-7 h-7 rounded-full bg-[#e50914] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {step}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* .env.local example */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-6 text-left font-mono text-xs">
          <p className="text-gray-600 mb-1"># .env.local</p>
          <p className="text-green-400">
            NEXT_PUBLIC_TMDB_API_KEY=
            <span className="text-yellow-400">buraya_api_keyini_yaz</span>
          </p>
        </div>

        <a
          href="https://www.themoviedb.org/settings/api"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full justify-center"
        >
          TMDB API Key Al
          <ExternalLink size={16} />
        </a>

        <p className="text-xs text-gray-600 mt-4">
          API key aldıktan sonra sunucuyu yeniden başlatın: <code className="text-gray-400">npm run dev</code>
        </p>
      </div>
    </div>
  );
}
