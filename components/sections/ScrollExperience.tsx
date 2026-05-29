"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Paperclip,
  ShieldCheck,
  X,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useLang } from "@/contexts/LanguageContext";

/* ─── Config ─────────────────────────────────────────────────────── */
const TOTAL_SLIDES = 6; // 0=hero  1-4=services  5=estimates
const FADE = 0.038;     // cross-fade buffer as fraction of total scroll

const SERVICE_CARDS = [
  {
    id: "pavers",
    labelKey:       "service.pavers.label",
    descriptionKey: "service.pavers.desc",
    tagKey:         "service.pavers.tag",
    href: "/services/pavers",
    photo: "/images/pavers/gen-5.jpg",
    tint: "from-stone-900/80",
  },
  {
    id: "travertine",
    labelKey:       "service.travertine.label",
    descriptionKey: "service.travertine.desc",
    tagKey:         "service.travertine.tag",
    href: "/services/travertine",
    photo: "/images/travertine/p2-3.jpg",
    tint: "from-amber-900/80",
  },
  {
    id: "turf",
    labelKey:       "service.turf.label",
    descriptionKey: "service.turf.desc",
    tagKey:         "service.turf.tag",
    href: "/services/turf",
    photo: "/images/turf/p2-2.jpg",
    tint: "from-green-900/80",
  },
  {
    id: "bbq",
    labelKey:       "service.bbq.label",
    descriptionKey: "service.bbq.desc",
    tagKey:         "service.bbq.tag",
    href: "/services/bbq",
    photo: "/images/bbq/bbq-3.jpg",
    tint: "from-orange-900/80",
  },
] as const;

/* ─── SlideLayer ─────────────────────────────────────────────────── */
function SlideLayer({
  scrollYProgress,
  index,
  children,
}: {
  scrollYProgress: MotionValue<number>;
  index: number;
  children: React.ReactNode;
}) {
  const N = TOTAL_SLIDES;
  const s = index / N;
  const e = (index + 1) / N;

  const inputRange  = [Math.max(0, s - FADE), s, Math.max(s, e - FADE), e] as const;
  const outputRange = [
    index === 0     ? 1 : 0,
    1,
    1,
    index === N - 1 ? 1 : 0,
  ] as const;

  const opacity = useTransform(scrollYProgress, [...inputRange], [...outputRange]);
  const y       = useTransform(
    scrollYProgress,
    [Math.max(0, s - FADE), s],
    [index === 0 ? 0 : 28, 0],
  );

  return (
    <motion.div
      style={{ opacity, y, pointerEvents: "none" }}
      className="absolute inset-0 flex flex-col items-center justify-center px-5 sm:px-10"
    >
      <div style={{ pointerEvents: "auto" }} className="w-full flex flex-col items-center">
        {children}
      </div>
    </motion.div>
  );
}

/* ─── Progress Dots ──────────────────────────────────────────────── */
function ProgressDots({ activeSlide }: { activeSlide: number }) {
  return (
    <div className="fixed right-5 sm:right-7 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-[10px]">
      {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-500"
          style={{
            width:           i === activeSlide ? "8px"  : "5px",
            height:          i === activeSlide ? "8px"  : "5px",
            backgroundColor: i === activeSlide
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0.32)",
            boxShadow: i === activeSlide ? "0 0 8px rgba(255,255,255,0.5)" : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Hero Slide ─────────────────────────────────────────────────── */
function HeroContent() {
  const { t } = useLang();

  return (
    <div className="flex flex-col items-center text-center gap-4 md:gap-6 -mt-10">
      <Badge newLabel="New" text={t("hero.badge")} />

      <h1
        className="text-white leading-none"
        style={{
          fontFamily:    "var(--font-fustat)",
          fontWeight:    800,
          fontSize:      "clamp(28px, 7.5vw, 80px)",
          letterSpacing: "-1px",
        }}
      >
        {t("hero.headline")}
      </h1>

      <p
        className="text-[14px] sm:text-[16px] md:text-[20px]"
        style={{
          fontFamily:    "var(--font-fustat)",
          fontWeight:    500,
          letterSpacing: "-0.3px",
          color:         "rgba(255,255,255,0.75)",
          maxWidth:      "560px",
        }}
      >
        {t("hero.subtitle")}
      </p>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
        className="mt-2 flex flex-col items-center gap-1"
      >
        <span
          style={{
            fontFamily:    "var(--font-schibsted)",
            fontSize:      "10px",
            color:         "rgba(255,255,255,0.38)",
            letterSpacing: "0.14em",
          }}
        >
          SCROLL
        </span>
        <ChevronDown className="w-4 h-4 text-white/35" />
      </motion.div>
    </div>
  );
}

/* ─── Service Slide ──────────────────────────────────────────────── */
function ServiceSlide({ card }: { card: typeof SERVICE_CARDS[number] }) {
  const { t, lang } = useLang();

  return (
    <div className="flex flex-col items-center gap-4 w-full" style={{ maxWidth: "460px" }}>

      {/* Eyebrow */}
      <p
        style={{
          fontFamily:    "var(--font-schibsted)",
          fontSize:      "10px",
          letterSpacing: "0.18em",
          color:         "rgba(255,255,255,0.45)",
          textTransform: "uppercase",
        }}
      >
        {lang === "es" ? "Nuestros Servicios" : "Our Services"}
      </p>

      {/* Card */}
      <Link href={card.href} className="block w-full group">
        <div
          className="relative w-full overflow-hidden"
          style={{
            borderRadius: "22px",
            height:       "clamp(280px, 48vh, 420px)",
            border:       "1px solid rgba(255,255,255,0.13)",
            boxShadow:    "0 28px 80px rgba(0,0,0,0.60)",
          }}
        >
          <Image
            src={card.photo}
            alt={t(card.labelKey)}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) calc(100vw - 48px), 460px"
            priority={card.id === "pavers"}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${card.tint} to-transparent`} />

          {/* Top row inside card */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span
              className="px-3 py-1 rounded-full text-white/90"
              style={{
                backgroundColor:      "rgba(255,255,255,0.14)",
                backdropFilter:       "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                fontFamily:           "var(--font-schibsted)",
                fontSize:             "10px",
                fontWeight:           500,
                letterSpacing:        "0.12px",
                border:               "1px solid rgba(255,255,255,0.22)",
              }}
            >
              {t(card.tagKey)}
            </span>
            <div
              className="flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                width:                "32px",
                height:               "32px",
                backgroundColor:      "rgba(255,255,255,0.18)",
                backdropFilter:       "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border:               "1px solid rgba(255,255,255,0.22)",
              }}
            >
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Bottom text inside card */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
            <h2
              className="text-white leading-tight"
              style={{
                fontFamily:    "var(--font-fustat)",
                fontWeight:    800,
                fontSize:      "clamp(22px, 5vw, 30px)",
                letterSpacing: "-0.5px",
                textShadow:    "0 2px 14px rgba(0,0,0,0.5)",
              }}
            >
              {t(card.labelKey)}
            </h2>
            <p
              className="mt-1"
              style={{
                fontFamily: "var(--font-schibsted)",
                fontSize:   "13px",
                color:      "rgba(255,255,255,0.65)",
              }}
            >
              {t(card.descriptionKey)}
            </p>
          </div>
        </div>
      </Link>

      {/* CTA link */}
      <Link
        href={card.href}
        className="flex items-center gap-2 hover:gap-3 transition-all duration-200 group/cta"
        style={{
          fontFamily:    "var(--font-schibsted)",
          fontSize:      "13px",
          fontWeight:    500,
          color:         "rgba(255,255,255,0.65)",
        }}
      >
        {lang === "es" ? "Ver servicio" : "View service"}
        <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover/cta:text-white/80 transition-colors" />
      </Link>
    </div>
  );
}

/* ─── Estimates Slide ────────────────────────────────────────────── */
function EstimatesSlide() {
  const { t, lang } = useLang();
  const fileInputRef               = useRef<HTMLInputElement>(null);
  const [uploadedFile, setFile]    = useState<File | null>(null);
  const [previewUrl,   setPreview] = useState<string | null>(null);
  const [description,  setDesc]    = useState("");

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [previewUrl]);

  const handleSubmit = () => {
    if (!description.trim() && !uploadedFile) return;
    const params = new URLSearchParams();
    if (description)  params.set("desc", description);
    if (uploadedFile) params.set("hasPhoto", "1");
    window.location.href = `/quote?${params.toString()}`;
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full" style={{ maxWidth: "640px" }}>

      {/* Heading */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span
          className="px-3 py-1 rounded-full"
          style={{
            backgroundColor:      "rgba(255,255,255,0.10)",
            backdropFilter:       "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border:               "1px solid rgba(255,255,255,0.15)",
            fontFamily:           "var(--font-schibsted)",
            fontSize:             "10px",
            letterSpacing:        "0.18em",
            color:                "rgba(255,255,255,0.65)",
            textTransform:        "uppercase" as const,
          }}
        >
          {t("hero.freeEstimates")}
        </span>

        <h2
          className="text-white"
          style={{
            fontFamily:    "var(--font-fustat)",
            fontWeight:    800,
            fontSize:      "clamp(26px, 5vw, 48px)",
            letterSpacing: "-1px",
          }}
        >
          {lang === "es" ? "¿Listo para empezar?" : "Ready to Start?"}
        </h2>

        <p
          style={{
            fontFamily: "var(--font-schibsted)",
            fontSize:   "13px",
            color:      "rgba(255,255,255,0.45)",
          }}
        >
          {lang === "es"
            ? "Sin compromiso · Respuesta en 24h · Mesa, Phoenix & Scottsdale"
            : "No commitment · Reply within 24h · Mesa, Phoenix & Scottsdale"}
        </p>
      </div>

      {/* Lead capture box */}
      <div
        className="w-full"
        style={{
          borderRadius:         "20px",
          backgroundColor:      "rgba(14,19,17,0.88)",
          backdropFilter:       "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          padding:              "14px",
          border:               "1px solid rgba(255,255,255,0.10)",
          boxShadow:            "0 8px 40px rgba(14,19,17,0.25)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] flex-shrink-0" />
            <span style={{ fontFamily: "var(--font-schibsted)", fontWeight: 500, fontSize: "12px", color: "white" }}>
              {t("hero.freeEstimates")}
            </span>
            <span className="hidden sm:inline" style={{ fontFamily: "var(--font-schibsted)", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
              · {t("hero.availableNow")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-white/70 flex-shrink-0" />
            <span style={{ fontFamily: "var(--font-schibsted)", fontWeight: 500, fontSize: "12px", color: "white" }}>
              {t("hero.licensed")}
            </span>
          </div>
        </div>

        <div
          className="flex items-center gap-2 sm:gap-3"
          style={{
            backgroundColor: "white",
            borderRadius:    "12px",
            padding:         "9px 9px 9px 14px",
            boxShadow:       "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          {previewUrl && (
            <div className="relative flex-shrink-0">
              <Image
                src={previewUrl}
                alt="Your yard"
                width={36}
                height={36}
                className="rounded-lg object-cover w-[36px] h-[36px]"
                unoptimized
              />
              <button
                onClick={clearFile}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Remove photo"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          )}

          <input
            type="text"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder={
              uploadedFile
                ? `${t("hero.photoAttached")}: ${uploadedFile.name}`
                : t("hero.placeholder")
            }
            className="flex-1 bg-transparent outline-none placeholder:text-black/35 min-w-0"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "16px", color: "rgba(0,0,0,0.9)" }}
          />

          <button
            onClick={handleSubmit}
            className="flex items-center justify-center bg-[#0e1311] text-white rounded-full hover:bg-black/90 active:scale-95 transition-all duration-200 flex-shrink-0"
            style={{ width: "36px", height: "36px" }}
            aria-label="Submit"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          aria-label="Upload yard photo"
        />

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-white/70 hover:text-white hover:bg-white/15 transition-all duration-200 active:scale-95"
            style={{
              backgroundColor: uploadedFile ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
              borderRadius:    "6px",
              padding:         "5px 10px",
              fontFamily:      "var(--font-schibsted)",
              fontSize:        "12px",
              fontWeight:      500,
              border:          uploadedFile ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
            }}
          >
            <Paperclip className="w-3.5 h-3.5" />
            {uploadedFile ? `${t("hero.photoAttached")} ✓` : t("hero.uploadPhoto")}
          </button>

          <span
            className="hidden sm:inline"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}
          >
            {t("hero.response")}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────── */
export default function ScrollExperience() {
  const containerRef     = useRef<HTMLDivElement>(null);
  const scrollYProgress  = useMotionValue(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function update() {
      if (!container) return;
      const rect           = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      scrollYProgress.set(progress);
      setActiveSlide(Math.min(Math.floor(progress * TOTAL_SLIDES), TOTAL_SLIDES - 1));
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} style={{ height: `${TOTAL_SLIDES * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Video background */}
        <video
          autoPlay muted loop playsInline preload="metadata"
          poster="/images/hero-bg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4"  type="video/mp4"  />
        </video>
        <div className="absolute inset-0 bg-black/52" />

        {/* Slide 0 — Hero */}
        <SlideLayer scrollYProgress={scrollYProgress} index={0}>
          <HeroContent />
        </SlideLayer>

        {/* Slides 1–4 — Services */}
        {SERVICE_CARDS.map((card, i) => (
          <SlideLayer key={card.id} scrollYProgress={scrollYProgress} index={i + 1}>
            <ServiceSlide card={card} />
          </SlideLayer>
        ))}

        {/* Slide 5 — Free Estimates */}
        <SlideLayer scrollYProgress={scrollYProgress} index={5}>
          <EstimatesSlide />
        </SlideLayer>

        {/* Navigation dots */}
        <ProgressDots activeSlide={activeSlide} />
      </div>
    </div>
  );
}
