import type { Metadata } from "next";
import "./globals.css";
import { Navigasyon } from "@/bilesenler/Navigasyon";
import { AltBilgi } from "@/bilesenler/AltBilgi";
import { SorguSaglayici } from "@/bilesenler/providers/SorguSaglayici";

export const metadata: Metadata = {
  title: {
    default: "SineFix — Film & Dizi Platformu",
    template: "%s | SineFix",
  },
  description:
    "Binlerce film ve dizi tek platformda. En sevdiğin içerikleri keşfet ve keyfini çıkar.",
  keywords: ["film", "dizi", "sinema", "streaming", "TMDB", "SineFix"],
  authors: [{ name: "SineFix" }],
  creator: "SineFix",
  metadataBase: new URL("https://sinefix.app"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://sinefix.app",
    siteName: "SineFix",
    title: "SineFix — Film & Dizi Platformu",
    description: "Binlerce film ve dizi tek platformda.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SineFix",
    description: "Binlerce film ve dizi tek platformda.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="antialiased">
        <SorguSaglayici>
          <Navigasyon />
          <main className="min-h-screen">{children}</main>
          <AltBilgi />
        </SorguSaglayici>
      </body>
    </html>
  );
}
