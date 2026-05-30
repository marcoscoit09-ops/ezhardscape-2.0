import type { Metadata } from "next";
import { Schibsted_Grotesk, Inter, Noto_Sans, Fustat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import FloatingContact from "@/components/ui/FloatingContact";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/providers/Preloader";

/* ─── Fonts ──────────────────────────────────────────────────── */

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"], weight: ["400", "500", "600", "700"],
  variable: "--font-schibsted", display: "swap",
});
const inter = Inter({
  subsets: ["latin"], weight: ["400", "500", "600", "700"],
  variable: "--font-inter", display: "swap",
});
const notoSans = Noto_Sans({
  subsets: ["latin"], weight: ["400", "500", "600", "700"],
  variable: "--font-noto", display: "swap",
});
const fustat = Fustat({
  subsets: ["latin"], weight: ["400", "500", "600", "700", "800"],
  variable: "--font-fustat", display: "swap",
});

/* ─── SEO ─────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "EZ HARDSCAPE | Premium Outdoor Living in Arizona",
  description:
    "Expert installation of pavers, travertine, premium turf, and custom BBQs in Mesa, Phoenix & Scottsdale. Transform your backyard with EZ HARDSCAPE.",
  keywords: [
    "hardscape Arizona", "pavers Mesa AZ", "travertine patio Phoenix",
    "artificial turf Scottsdale", "custom BBQ outdoor kitchen",
    "backyard design Arizona", "hardscape contractor",
  ],
  openGraph: {
    title: "EZ HARDSCAPE | Premium Outdoor Living in Arizona",
    description: "Expert installation of pavers, travertine, premium turf, and custom BBQs. Elevate your home value with modern hardscape designs.",
    type: "website", locale: "en_US",
  },
};

/* ─── Root Layout ─────────────────────────────────────────────── */

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/*
          Auto-recuperación de caché: si el navegador tiene un HTML antiguo en
          caché que apunta a chunks de JS que ya no existen (tras un nuevo
          deploy), esos scripts dan 404 y la página se quedaría congelada. Este
          script detecta ese fallo y recarga una sola vez con un parámetro que
          fuerza obtener el HTML fresco del servidor.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){window.addEventListener('error',function(e){var t=e.target;if(t&&(t.tagName==='SCRIPT'||t.tagName==='LINK')){var u=t.src||t.href||'';if(/_next\\/static/.test(u)&&!sessionStorage.getItem('__cb')){sessionStorage.setItem('__cb','1');var n=new URL(location.href);n.searchParams.set('cb',Date.now());location.replace(n.toString());}}},true);})();`,
          }}
        />
      </head>
      <body
        className={`
          ${schibstedGrotesk.variable} ${inter.variable}
          ${notoSans.variable} ${fustat.variable}
          antialiased bg-[#F5F0E8] text-black
        `}
      >
        <SmoothScroll>
          <LanguageProvider>
            <Preloader />
            {children}
            <FloatingContact />
          </LanguageProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
