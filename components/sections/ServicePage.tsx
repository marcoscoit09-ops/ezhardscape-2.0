"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import { useLang } from "@/contexts/LanguageContext";

/* ─── Types ───────────────────────────────────────────────────── */

export interface Spec {
  label: string;
  value: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  span?: "wide" | "tall" | "normal";
}

export interface ServicePageProps {
  accentColor:    string;
  title:          string;
  titleEs?:       string;
  tagline:        string;
  taglineEs?:     string;
  description:    string;
  descriptionEs?: string;
  heroImage:      string;
  benefits:       string[];
  benefitsEs?:    string[];
  specs:          Spec[];
  specsEs?:       Spec[];
  variants:       { name: string; nameEs?: string; img: string; desc: string; descEs?: string }[];
  gallery:        GalleryImage[];
  priceRange:     string;
}

/* ─── ServicePage Component ───────────────────────────────────── */

export default function ServicePage({
  accentColor,
  title,
  titleEs,
  tagline,
  taglineEs,
  description,
  descriptionEs,
  heroImage,
  benefits,
  benefitsEs,
  specs,
  specsEs,
  variants,
  gallery,
  priceRange,
}: ServicePageProps) {
  const { lang, t } = useLang();

  const displayTitle       = lang === "es" && titleEs       ? titleEs       : title;
  const displayTagline     = lang === "es" && taglineEs     ? taglineEs     : tagline;
  const displayDescription = lang === "es" && descriptionEs ? descriptionEs : description;
  const displayBenefits    = lang === "es" && benefitsEs    ? benefitsEs    : benefits;
  const displaySpecs       = lang === "es" && specsEs       ? specsEs       : specs;

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Navbar dark />

      {/* ── Hero Banner ────────────────────────────────────── */}
      <section className="relative w-full h-[55vh] sm:h-[65vh] md:h-[70vh] overflow-hidden">
        <Image
          src={heroImage}
          alt={displayTitle}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

        {/* Back breadcrumb */}
        <div className="absolute top-20 sm:top-24 md:top-28 left-0 right-0 px-5 sm:px-10 md:px-[120px]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors duration-200"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "14px", fontWeight: 500 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("sp.back")}
          </Link>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-10 md:px-[120px] pb-8 sm:pb-12 md:pb-16">
          <div
            className="inline-block px-3 py-1 rounded-full mb-3 text-white text-xs font-medium"
            style={{
              backgroundColor: accentColor,
              fontFamily:      "var(--font-schibsted)",
              letterSpacing:   "0.5px",
            }}
          >
            {t("sp.badge")}
          </div>
          <h1
            className="text-white leading-none mb-2 sm:mb-3 text-[36px] sm:text-[52px] md:text-[72px]"
            style={{
              fontFamily:    "var(--font-fustat)",
              fontWeight:    800,
              letterSpacing: "clamp(-1.5px, -0.05em, -3.5px)",
            }}
          >
            {displayTitle}
          </h1>
          <p
            className="text-white/75 text-[14px] sm:text-[16px] md:text-[18px]"
            style={{ fontFamily: "var(--font-schibsted)", fontWeight: 400, maxWidth: "560px" }}
          >
            {displayTagline}
          </p>
        </div>
      </section>

      {/* ── Main Content ───────────────────────────────────── */}
      <main className="px-5 sm:px-10 md:px-[120px] py-10 sm:py-14 md:py-20 max-w-[1440px] mx-auto">

        {/* Overview + Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 mb-16 md:mb-24">

          {/* Left: description + benefits */}
          <div>
            <p
              className="mb-8 leading-relaxed text-[15px] sm:text-[16px] md:text-[18px]"
              style={{
                fontFamily: "var(--font-schibsted)",
                color:      "#3a3a3a",
                lineHeight: 1.75,
              }}
            >
              {displayDescription}
            </p>

            <h3
              className="mb-4 text-[18px] sm:text-[20px] md:text-[22px]"
              style={{ fontFamily: "var(--font-fustat)", fontWeight: 700, letterSpacing: "-0.8px" }}
            >
              {t("sp.whyChoose")}
            </h3>
            <ul className="space-y-3">
              {displayBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                  <span style={{ fontFamily: "var(--font-schibsted)", fontSize: "15px", color: "#2a2a2a" }}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: specs card */}
          <div
            className="rounded-2xl p-5 sm:p-7 self-start"
            style={{
              backgroundColor: "white",
              border:          "1px solid rgba(0,0,0,0.07)",
              boxShadow:       "0 4px 32px rgba(0,0,0,0.06)",
            }}
          >
            {/* Price range */}
            <div
              className="rounded-xl p-4 mb-6 text-center"
              style={{ backgroundColor: `${accentColor}14` }}
            >
              <p
                style={{
                  fontFamily:    "var(--font-schibsted)",
                  fontSize:      "11px",
                  fontWeight:    500,
                  color:         "#888",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {t("sp.startingFrom")}
              </p>
              <p
                className="mt-1 text-[28px] sm:text-[32px]"
                style={{
                  fontFamily:    "var(--font-fustat)",
                  fontWeight:    800,
                  letterSpacing: "-1.5px",
                  color:         accentColor,
                }}
              >
                {priceRange}
              </p>
              <p style={{ fontFamily: "var(--font-schibsted)", fontSize: "12px", color: "#999" }}>
                {t("sp.installedLic")}
              </p>
            </div>

            {/* Specs table */}
            <h4
              className="mb-4"
              style={{ fontFamily: "var(--font-fustat)", fontWeight: 700, fontSize: "16px", letterSpacing: "-0.5px" }}
            >
              {t("sp.specifications")}
            </h4>
            <div className="space-y-0">
              {displaySpecs.map((s, i) => (
                <div
                  key={s.label}
                  className="flex justify-between py-3"
                  style={{ borderBottom: i < displaySpecs.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}
                >
                  <span style={{ fontFamily: "var(--font-schibsted)", fontSize: "13px", color: "#888" }}>
                    {s.label}
                  </span>
                  <span
                    className="text-right"
                    style={{
                      fontFamily:  "var(--font-schibsted)",
                      fontSize:    "13px",
                      fontWeight:  600,
                      color:       "#111",
                      maxWidth:    "180px",
                    }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/quote"
              className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-medium transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{
                backgroundColor: accentColor,
                fontFamily:      "var(--font-schibsted)",
                fontSize:        "15px",
                fontWeight:      600,
              }}
            >
              {t("sp.getFreeEst")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Material Variants */}
        {variants.length > 0 && (
          <section className="mb-16 md:mb-24">
            <h2
              className="mb-2 text-[28px] sm:text-[34px] md:text-[40px]"
              style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, letterSpacing: "-2px" }}
            >
              {t("sp.availableStyles")}
            </h2>
            <p
              className="mb-8 md:mb-10"
              style={{ fontFamily: "var(--font-schibsted)", fontSize: "15px", color: "#666" }}
            >
              {t("sp.premiumMat")}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {variants.map((v) => (
                <div
                  key={v.name}
                  className="group rounded-2xl overflow-hidden bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
                >
                  <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden">
                    <Image
                      src={v.img}
                      alt={lang === "es" && v.nameEs ? v.nameEs : v.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) calc(50vw - 20px), (max-width: 1024px) calc(50vw - 24px), 25vw"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h4 style={{ fontFamily: "var(--font-schibsted)", fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>
                      {lang === "es" && v.nameEs ? v.nameEs : v.name}
                    </h4>
                    <p style={{ fontFamily: "var(--font-schibsted)", fontSize: "12px", color: "#777", lineHeight: 1.5 }}>
                      {lang === "es" && v.descEs ? v.descEs : v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Photo Gallery */}
        {gallery.length > 0 && (
          <section className="mb-16 md:mb-24">
            <h2
              className="mb-2 text-[28px] sm:text-[34px] md:text-[40px]"
              style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, letterSpacing: "-2px" }}
            >
              {t("sp.gallery")}
            </h2>
            <p
              className="mb-8 md:mb-10"
              style={{ fontFamily: "var(--font-schibsted)", fontSize: "15px", color: "#666" }}
            >
              {t("sp.realProjects")}
            </p>

            {/* Mobile: simple 1-col, Tablet: 2-col, Desktop: 3-col bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className={`group relative rounded-2xl overflow-hidden ${
                    img.span === "wide" ? "sm:col-span-2" : img.span === "tall" ? "md:row-span-2" : ""
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="px-3 py-1.5 rounded-lg text-white text-xs font-medium"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        backdropFilter:  "blur(8px)",
                        fontFamily:      "var(--font-schibsted)",
                      }}
                    >
                      {img.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <section
          className="rounded-2xl md:rounded-3xl p-8 sm:p-12 md:p-16 text-center"
          style={{ background: "linear-gradient(135deg, #0e1311 0%, #1e2d2a 100%)" }}
        >
          <h2
            className="text-white mb-3 md:mb-4 text-[28px] sm:text-[36px] md:text-[48px]"
            style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, letterSpacing: "-2px" }}
          >
            {t("sp.ctaTitle")}
          </h2>
          <p
            className="text-white/60 mb-6 md:mb-8 mx-auto text-[14px] sm:text-[16px] md:text-[17px]"
            style={{ fontFamily: "var(--font-schibsted)", maxWidth: "480px" }}
          >
            {t("sp.ctaDesc")}
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-black font-semibold transition-all hover:scale-105 active:scale-[0.98]"
            style={{ backgroundColor: "white", fontFamily: "var(--font-schibsted)", fontSize: "15px", fontWeight: 600 }}
          >
            {t("sp.ctaBtn")}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </section>
      </main>
    </div>
  );
}
