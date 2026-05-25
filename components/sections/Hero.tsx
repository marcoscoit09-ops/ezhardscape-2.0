"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Paperclip, ShieldCheck, ArrowUpRight, X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useLang } from "@/contexts/LanguageContext";

/* ─── Service cards data ─────────────────────────────────────── */
const SERVICE_CARDS = [
  {
    id: "pavers",
    labelKey:       "service.pavers.label",
    descriptionKey: "service.pavers.desc",
    tagKey:         "service.pavers.tag",
    href: "/services/pavers",
    photo: "/images/pavers/gen-5.jpg",
    tint: "from-stone-900/70",
  },
  {
    id: "travertine",
    labelKey:       "service.travertine.label",
    descriptionKey: "service.travertine.desc",
    tagKey:         "service.travertine.tag",
    href: "/services/travertine",
    photo: "/images/travertine/p2-3.jpg",
    tint: "from-amber-900/65",
  },
  {
    id: "turf",
    labelKey:       "service.turf.label",
    descriptionKey: "service.turf.desc",
    tagKey:         "service.turf.tag",
    href: "/services/turf",
    photo: "/images/turf/p2-2.jpg",
    tint: "from-green-900/68",
  },
  {
    id: "bbq",
    labelKey:       "service.bbq.label",
    descriptionKey: "service.bbq.desc",
    tagKey:         "service.bbq.tag",
    href: "/services/bbq",
    photo: "/images/bbq/bbq-3.jpg",
    tint: "from-orange-900/68",
  },
];

/* ═══════════════════════════════════════════════════════════════ */

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      className="relative w-full min-h-screen"
      style={{ background: "linear-gradient(150deg, #DDD7CA 0%, #E8E2D6 40%, #F5F0E8 100%)" }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-5 sm:px-10 md:px-20">
        <div className="flex flex-col items-center w-full gap-4 md:gap-[26px] -mt-4 md:-mt-[50px]">

          <Badge newLabel="New" text={t("hero.badge")} />

          {/* Headline + Subtitle */}
          <div className="flex flex-col items-center gap-3 md:gap-[14px]">
            <h1
              className="text-black leading-none text-[36px] sm:text-[54px] md:text-[80px]"
              style={{
                fontFamily:    "var(--font-fustat)",
                fontWeight:    800,
                letterSpacing: "clamp(-2px, -0.06em, -4.8px)",
              }}
            >
              {t("hero.headline")}
            </h1>
            <p
              className="text-center text-[14px] sm:text-[16px] md:text-[20px]"
              style={{
                fontFamily:    "var(--font-fustat)",
                fontWeight:    500,
                letterSpacing: "-0.3px",
                color:         "#505050",
                maxWidth:      "560px",
              }}
            >
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Service Cards */}
          <ServiceCards />

          {/* Lead Capture Box */}
          <LeadCaptureBox />

        </div>
      </div>
    </section>
  );
}

/* ─── Service Cards ───────────────────────────────────────────── */

function ServiceCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-[14px] w-full max-w-[1120px]">
      {SERVICE_CARDS.map((card) => (
        <ServiceCard key={card.id} {...card} />
      ))}
    </div>
  );
}

function ServiceCard({
  labelKey, descriptionKey, tagKey, href, photo, tint,
}: {
  labelKey: string; descriptionKey: string; tagKey: string;
  href: string; photo: string; tint: string;
}) {
  const { t } = useLang();
  return (
    <Link href={href} className="block">
      <div
        className="group relative overflow-hidden cursor-pointer w-full h-[138px] sm:h-[160px] md:h-[190px]"
        style={{
          borderRadius: "18px",
          border:       "1px solid rgba(255,255,255,0.22)",
          boxShadow:    "0 6px 32px rgba(0,0,0,0.28), 0 1px 0 rgba(255,255,255,0.1) inset",
          transition:   "transform 320ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 320ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "scale(1.04) translateY(-5px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 20px 50px rgba(0,0,0,0.38), 0 1px 0 rgba(255,255,255,0.14) inset";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "scale(1) translateY(0px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 6px 32px rgba(0,0,0,0.28), 0 1px 0 rgba(255,255,255,0.1) inset";
        }}
      >
        <Image
          src={photo}
          alt={t(labelKey)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) calc(50vw - 24px), (max-width: 1024px) calc(25vw - 18px), 270px"
          priority={false}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${tint} to-transparent`} />

        {/* Top: tag + arrow */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span
            className="px-2 py-0.5 rounded-full text-white/90"
            style={{
              backgroundColor:      "rgba(255,255,255,0.15)",
              backdropFilter:       "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              fontFamily:           "var(--font-schibsted)",
              fontSize:             "9px",
              fontWeight:           500,
              letterSpacing:        "0.2px",
              border:               "1px solid rgba(255,255,255,0.22)",
            }}
          >
            {t(tagKey)}
          </span>
          <div
            className="hidden sm:flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{
              width:                "24px",
              height:               "24px",
              backgroundColor:      "rgba(255,255,255,0.22)",
              backdropFilter:       "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border:               "1px solid rgba(255,255,255,0.22)",
            }}
          >
            <ArrowUpRight className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Bottom: label + description */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
          <p
            className="text-white leading-tight text-[13px] md:text-[15px]"
            style={{
              fontFamily:   "var(--font-schibsted)",
              fontWeight:   700,
              letterSpacing: "-0.3px",
              textShadow:   "0 1px 6px rgba(0,0,0,0.5)",
            }}
          >
            {t(labelKey)}
          </p>
          <p
            className="text-white/60 mt-0.5 text-[11px] hidden sm:block"
            style={{ fontFamily: "var(--font-schibsted)" }}
          >
            {t(descriptionKey)}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ─── Lead Capture Box ────────────────────────────────────────── */

function LeadCaptureBox() {
  const { t } = useLang();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl,   setPreviewUrl]   = useState<string | null>(null);
  const [description,  setDescription]  = useState("");

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setUploadedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, []);

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedFile(null);
    setPreviewUrl(null);
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
    <div
      className="w-full"
      style={{
        maxWidth:             "760px",
        borderRadius:         "20px",
        backgroundColor:      "rgba(14,19,17,0.88)",
        backdropFilter:       "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        padding:              "14px",
        border:               "1px solid rgba(255,255,255,0.10)",
        boxShadow:            "0 8px 40px rgba(14,19,17,0.18)",
      }}
    >
      {/* Top row */}
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

      {/* Input row */}
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
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={
            uploadedFile
              ? `${t("hero.photoAttached")}: ${uploadedFile.name}`
              : t("hero.placeholder")
          }
          className="flex-1 bg-transparent outline-none placeholder:text-black/35 min-w-0"
          style={{
            fontFamily: "var(--font-schibsted)",
            fontSize:   "16px", /* ≥16px prevents iOS auto-zoom */
            color:      "rgba(0,0,0,0.9)",
          }}
        />

        <button
          onClick={handleSubmit}
          className="flex items-center justify-center bg-[#0e1311] text-white rounded-full hover:bg-black/90 active:scale-95 transition-all duration-200 flex-shrink-0"
          style={{ width: "36px", height: "36px" }}
          aria-label="Submit project request"
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

      {/* Bottom row */}
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

        <span className="hidden sm:inline" style={{ fontFamily: "var(--font-schibsted)", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
          {t("hero.response")}
        </span>
      </div>
    </div>
  );
}
