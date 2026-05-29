import type { Metadata } from "next";
import { Schibsted_Grotesk, Inter, Noto_Sans, Fustat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import FloatingContact from "@/components/ui/FloatingContact";
import SmoothScroll from "@/components/providers/SmoothScroll";

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
      <body
        className={`
          ${schibstedGrotesk.variable} ${inter.variable}
          ${notoSans.variable} ${fustat.variable}
          antialiased bg-[#F5F0E8] text-black
        `}
      >
        <SmoothScroll>
          <LanguageProvider>
            {children}
            <FloatingContact />
          </LanguageProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
