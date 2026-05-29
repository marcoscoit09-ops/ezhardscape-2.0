"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import { CheckCircle2, Star, MapPin, Award, Clock, Users } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import ParallaxImage from "@/components/ui/ParallaxImage";

const CITIES = ["Mesa", "Phoenix", "Scottsdale", "Tempe", "Chandler", "Gilbert"];

export default function AboutPage() {
  const { t } = useLang();

  const STATS = [
    { icon: Clock,  value: "8+",    labelKey: "about.stat1" },
    { icon: Award,  value: "500+",  labelKey: "about.stat2" },
    { icon: Users,  value: "98%",   labelKey: "about.stat3" },
    { icon: MapPin, value: "3",     labelKey: "about.stat4" },
  ];

  const VALUES = [
    { titleKey: "about.val1.title", bodyKey: "about.val1.body" },
    { titleKey: "about.val2.title", bodyKey: "about.val2.body" },
    { titleKey: "about.val3.title", bodyKey: "about.val3.body" },
    { titleKey: "about.val4.title", bodyKey: "about.val4.body" },
    { titleKey: "about.val5.title", bodyKey: "about.val5.body" },
    { titleKey: "about.val6.title", bodyKey: "about.val6.body" },
  ];

  const TESTIMONIALS = [
    { name: "Maria & Carlos T.", location: "Mesa, AZ",      stars: 5, textKey: "about.t1.text", serviceKey: "about.t1.service" },
    { name: "James R.",          location: "Scottsdale, AZ", stars: 5, textKey: "about.t2.text", serviceKey: "about.t2.service" },
    { name: "The Henderson Family", location: "Phoenix, AZ", stars: 5, textKey: "about.t3.text", serviceKey: "about.t3.service" },
    { name: "David & Pam K.",    location: "Tempe, AZ",     stars: 5, textKey: "about.t4.text", serviceKey: "about.t4.service" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Navbar dark />

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&h=900&fit=crop&q=90"
          alt="EZ Hardscape team at work"
          className="absolute inset-0"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 px-[120px] pb-14">
          <div
            className="inline-block px-3 py-1 rounded-full mb-4 text-white text-xs font-medium"
            style={{ backgroundColor: "#0e1311", fontFamily: "var(--font-schibsted)", letterSpacing: "0.5px" }}
          >
            {t("about.badge")}
          </div>
          <h1
            className="text-white leading-none"
            style={{
              fontFamily: "var(--font-fustat)",
              fontWeight: 800,
              fontSize: "68px",
              letterSpacing: "-3px",
            }}
          >
            {t("about.h1a")}<br />{t("about.h1b")}
          </h1>
        </div>
      </section>

      {/* ── Stats Row ───────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0e1311 0%, #1a2e2a 100%)",
          padding: "48px 120px",
        }}
      >
        <div className="grid grid-cols-4 gap-8">
          {STATS.map(({ icon: Icon, value, labelKey }) => (
            <div key={labelKey} className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-white/50" />
              </div>
              <p
                className="text-white leading-none mb-2"
                style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, fontSize: "52px", letterSpacing: "-2px" }}
              >
                {value}
              </p>
              <p
                className="text-white/50"
                style={{ fontFamily: "var(--font-schibsted)", fontSize: "14px" }}
              >
                {t(labelKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Main Content ────────────────────────────────────── */}
      <main className="px-[120px] py-20 max-w-[1440px] mx-auto">

        {/* Story */}
        <section className="grid grid-cols-[1fr_480px] gap-16 mb-24 items-center">
          <div>
            <RevealText
              as="h2"
              className="mb-6"
              style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, fontSize: "48px", letterSpacing: "-2.5px" }}
            >
              {t("about.story.h2")}
            </RevealText>
            <Reveal
              stagger={0.15}
              className="space-y-5"
              style={{ fontFamily: "var(--font-schibsted)", fontSize: "17px", color: "#3a3a3a", lineHeight: 1.75 }}
            >
              <p>{t("about.story.p1")}</p>
              <p>{t("about.story.p2")}</p>
              <p>{t("about.story.p3")}</p>
            </Reveal>
          </div>

          <Reveal stagger={0.12} className="grid grid-cols-2 gap-4">
            {[
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80",
              "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop&q=80",
              "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop&q=80",
              "https://images.unsplash.com/photo-1534790088668-b7a6a748ca37?w=400&h=300&fit=crop&q=80",
            ].map((src, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden" style={{ height: "160px" }}>
                <Image src={src} alt="Project" fill className="object-cover" sizes="220px" />
              </div>
            ))}
          </Reveal>
        </section>

        {/* Values */}
        <section className="mb-24">
          <RevealText
            as="h2"
            className="mb-3"
            style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, fontSize: "44px", letterSpacing: "-2px" }}
          >
            {t("about.values.h2")}
          </RevealText>
          <p
            className="mb-12"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "16px", color: "#666" }}
          >
            {t("about.values.sub")}
          </p>

          <Reveal stagger={0.08} className="grid grid-cols-3 gap-6">
            {VALUES.map(({ titleKey, bodyKey }) => (
              <div
                key={titleKey}
                className="p-6 rounded-2xl bg-white"
                style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              >
                <CheckCircle2 className="w-5 h-5 text-[#0e1311] mb-4" />
                <h4
                  className="mb-2"
                  style={{ fontFamily: "var(--font-fustat)", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.5px" }}
                >
                  {t(titleKey)}
                </h4>
                <p style={{ fontFamily: "var(--font-schibsted)", fontSize: "14px", color: "#666", lineHeight: 1.6 }}>
                  {t(bodyKey)}
                </p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Testimonials */}
        <section className="mb-24">
          <RevealText
            as="h2"
            className="mb-3"
            style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, fontSize: "44px", letterSpacing: "-2px" }}
          >
            {t("about.test.h2")}
          </RevealText>
          <p
            className="mb-12"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "16px", color: "#666" }}
          >
            {t("about.test.sub")}
          </p>

          <Reveal stagger={0.1} className="grid grid-cols-2 gap-6">
            {TESTIMONIALS.map(({ name, location, stars, textKey, serviceKey }) => (
              <div
                key={name}
                className="p-7 rounded-2xl bg-white"
                style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p
                  className="mb-5 italic"
                  style={{ fontFamily: "var(--font-schibsted)", fontSize: "15px", color: "#333", lineHeight: 1.65 }}
                >
                  &ldquo;{t(textKey)}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontFamily: "var(--font-schibsted)", fontWeight: 700, fontSize: "14px" }}>
                      {name}
                    </p>
                    <p style={{ fontFamily: "var(--font-schibsted)", fontSize: "12px", color: "#999" }}>
                      {location}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: "rgba(14,19,17,0.06)",
                      fontFamily: "var(--font-schibsted)",
                      color: "#333",
                    }}
                  >
                    {t(serviceKey)}
                  </span>
                </div>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Service areas */}
        <section className="mb-24">
          <RevealText
            as="h2"
            className="mb-3"
            style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, fontSize: "44px", letterSpacing: "-2px" }}
          >
            {t("about.areas.h2")}
          </RevealText>
          <p
            className="mb-10"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "16px", color: "#666" }}
          >
            {t("about.areas.sub")}
          </p>
          <Reveal stagger={0.06} className="grid grid-cols-3 gap-4">
            {CITIES.map((city) => (
              <div
                key={city}
                className="flex items-center gap-3 p-4 rounded-xl bg-white"
                style={{ border: "1px solid rgba(0,0,0,0.07)" }}
              >
                <MapPin className="w-4 h-4 text-[#0e1311]" />
                <span style={{ fontFamily: "var(--font-schibsted)", fontWeight: 600, fontSize: "15px" }}>
                  {city}, AZ
                </span>
              </div>
            ))}
          </Reveal>
        </section>

        {/* CTA */}
        <Reveal
          as="section"
          className="rounded-3xl p-16 text-center"
          style={{ background: "linear-gradient(135deg, #0e1311 0%, #1e2d2a 100%)" }}
        >
          <RevealText
            as="h2"
            className="text-white mb-4"
            style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, fontSize: "48px", letterSpacing: "-2.5px" }}
          >
            {t("about.cta.h2")}
          </RevealText>
          <p
            className="text-white/60 mb-8 mx-auto"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "17px", maxWidth: "440px" }}
          >
            {t("about.cta.desc")}
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-black font-semibold hover:scale-105 active:scale-[0.98] transition-all bg-white"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "16px" }}
          >
            {t("about.cta.btn")}
          </Link>
        </Reveal>
      </main>
    </div>
  );
}
