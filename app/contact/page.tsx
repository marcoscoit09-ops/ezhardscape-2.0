"use client";

import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import React from "react";

export default function ContactPage() {
  const { t } = useLang();

  const CONTACTS = [
    {
      id: "whatsapp",
      labelKey: "contact.wa.label",
      subKey: "contact.wa.sub",
      ctaKey: "contact.wa.cta",
      href: "https://wa.me/4916025961949",
      icon: ({ style }: { style?: React.CSSProperties }) => <WhatsAppIcon className="w-5 h-5" style={style} />,
      bg: "#25D366",
      text: "white",
    },
    {
      id: "instagram",
      labelKey: "contact.ig.label",
      subKey: "contact.ig.sub",
      ctaKey: "contact.ig.cta",
      href: "https://www.instagram.com/ez__hardscapinganddesign?igsh=MTg4djlvcmxjcWJiMg%3D%3D&utm_source=qr",
      icon: ({ style }: { style?: React.CSSProperties }) => <InstagramIcon className="w-5 h-5" style={style} />,
      bg: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
      text: "white",
    },
    {
      id: "facebook",
      labelKey: "contact.fb.label",
      subKey: "contact.fb.sub",
      ctaKey: "contact.fb.cta",
      href: "https://www.facebook.com/share/17mhpdV5F2/?mibextid=wwXIfr",
      icon: ({ style }: { style?: React.CSSProperties }) => <FacebookIcon className="w-5 h-5" style={style} />,
      bg: "#1877F2",
      text: "white",
    },
    {
      id: "email",
      labelKey: "contact.email.label",
      subKey: "contact.email.sub",
      ctaKey: "contact.email.cta",
      href: "mailto:Ezhardscape.az@gmail.com",
      icon: ({ style }: { style?: React.CSSProperties }) => <Mail className="w-5 h-5" style={style} />,
      bg: "#0e1311",
      text: "white",
    },
    {
      id: "sms",
      labelKey: "contact.sms.label",
      subKey: "contact.sms.sub",
      ctaKey: "contact.sms.cta",
      href: "sms:+4916025961949",
      icon: ({ style }: { style?: React.CSSProperties }) => <Phone className="w-5 h-5" style={style} />,
      bg: "#f0f0f0",
      text: "#0e1311",
    },
    {
      id: "call",
      labelKey: "contact.call.label",
      subKey: "contact.call.sub",
      ctaKey: "contact.call.cta",
      href: "tel:+4916025961949",
      icon: ({ style }: { style?: React.CSSProperties }) => <Phone className="w-5 h-5" style={style} />,
      bg: "#F5F0E8",
      text: "#0e1311",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Navbar dark />

      {/* ── Header ──────────────────────────────────────────── */}
      <section
        className="flex flex-col items-center justify-center text-center"
        style={{
          paddingTop: "160px",
          paddingBottom: "80px",
          paddingLeft: "120px",
          paddingRight: "120px",
          background: "linear-gradient(180deg, #0e1311 0%, #1a2e2a 60%, #F5F0E8 100%)",
        }}
      >
        <div
          className="inline-block px-3 py-1 rounded-full mb-6 text-white/60 text-xs"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            fontFamily: "var(--font-schibsted)",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          {t("contact.badge")}
        </div>

        <h1
          className="text-white mb-5 leading-none"
          style={{
            fontFamily: "var(--font-fustat)",
            fontWeight: 800,
            fontSize: "72px",
            letterSpacing: "-3.5px",
          }}
        >
          {t("contact.h1")}
        </h1>

        <p
          className="text-white/55 max-w-[500px]"
          style={{ fontFamily: "var(--font-schibsted)", fontSize: "18px", lineHeight: 1.6 }}
        >
          {t("contact.sub")}
        </p>
      </section>

      {/* ── Contact Cards ───────────────────────────────────── */}
      <main className="px-[120px] pb-24 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-3 gap-5 mb-16">
          {CONTACTS.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.id}
                href={c.href}
                target={c.id !== "sms" && c.id !== "call" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: c.bg,
                  color: c.text,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{
                      width: "46px",
                      height: "46px",
                      backgroundColor:
                        c.text === "white"
                          ? "rgba(255,255,255,0.18)"
                          : "rgba(0,0,0,0.06)",
                    }}
                  >
                    <Icon style={{ color: c.text }} />
                  </div>
                  <div
                    className="flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor:
                        c.text === "white" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)",
                    }}
                  >
                    <ArrowUpRight className="w-4 h-4" style={{ color: c.text }} />
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-schibsted)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    opacity: c.text === "white" ? 0.55 : 0.45,
                    marginBottom: "6px",
                  }}
                >
                  {t(c.labelKey)}
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-schibsted)",
                    fontSize: "13px",
                    opacity: c.text === "white" ? 0.5 : 0.55,
                    marginBottom: "20px",
                    lineHeight: 1.4,
                  }}
                >
                  {t(c.subKey)}
                </p>

                <div
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
                  style={{
                    backgroundColor:
                      c.text === "white" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.07)",
                    color: c.text,
                    fontFamily: "var(--font-schibsted)",
                    fontSize: "13px",
                  }}
                >
                  {t(c.ctaKey)}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Quote form CTA */}
        <div
          className="rounded-3xl p-12 text-center"
          style={{ background: "linear-gradient(135deg, #0e1311 0%, #1e2d2a 100%)" }}
        >
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, fontSize: "40px", letterSpacing: "-2px" }}
          >
            {t("contact.form.h2")}
          </h2>
          <p
            className="text-white/55 mb-8 mx-auto"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "16px", maxWidth: "420px" }}
          >
            {t("contact.form.desc")}
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-black bg-white font-semibold hover:scale-105 active:scale-[0.98] transition-all"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "16px" }}
          >
            {t("contact.form.btn")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
