"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown, ArrowUpRight, Phone, Mail,
  Home, Clock, Star, Users, MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/SocialIcons";

/* ─── Phone / contact constants ──────────────────────────────── */
const PHONE_NUMBER   = "4916025961949";
const WHATSAPP_URL   = `https://wa.me/${PHONE_NUMBER}`;
const SMS_URL        = `sms:+${PHONE_NUMBER}`;
const CALL_URL       = `tel:+${PHONE_NUMBER}`;
const INSTAGRAM_URL  = "https://www.instagram.com/ez__hardscapinganddesign";
const EMAIL_ADDRESS  = "Ezhardscape.az@gmail.com";

/* ─── Services data ───────────────────────────────────────────── */
const SERVICES = [
  { labelKey: "service.pavers.label",     descKey: "service.pavers.desc",     href: "/services/pavers",     img: "/images/pavers/gen-3.jpg" },
  { labelKey: "service.travertine.label", descKey: "service.travertine.desc", href: "/services/travertine", img: "/images/travertine/p1-1.jpg" },
  { labelKey: "service.turf.label",       descKey: "service.turf.desc",       href: "/services/turf",       img: "/images/turf/p2-1.jpg" },
  { labelKey: "service.bbq.label",        descKey: "service.bbq.desc",        href: "/services/bbq",        img: "/images/bbq/bbq-1.jpg" },
];

/* ─── Dropdown variants ───────────────────────────────────────── */
const dropAnim = {
  initial:    { opacity: 0, y: -10, scale: 0.97 },
  animate:    { opacity: 1, y: 0,   scale: 1 },
  exit:       { opacity: 0, y: -6,  scale: 0.97 },
  transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const panelStyle: React.CSSProperties = {
  borderRadius: "20px",
  background: "rgba(10,12,11,0.92)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
};

/* ─── Navbar ──────────────────────────────────────────────────── */

type DropdownId = "services" | "contact" | "call" | null;

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const { lang, toggle, t } = useLang();
  const [open,       setOpen]       = useState<DropdownId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDrop  = useCallback((id: DropdownId) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(id);
  }, []);
  const closeDrop = useCallback(() => {
    timerRef.current = setTimeout(() => setOpen(null), 130);
  }, []);
  const keepOpen  = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  /* helper to bind hover props */
  const hov = (id: DropdownId) => ({
    onMouseEnter: () => openDrop(id),
    onMouseLeave: closeDrop,
  });

  const navLinkStyle: React.CSSProperties = {
    fontFamily: "var(--font-schibsted)", fontWeight: 500, fontSize: "15px",
    letterSpacing: "-0.2px", color: "rgba(255,255,255,0.85)",
    padding: "8px 12px", borderRadius: "12px",
    display: "flex", alignItems: "center",
    transition: "background 0.15s, color 0.15s",
    textDecoration: "none",
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Background */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
          dark ? "bg-black/50 backdrop-blur-md" : "bg-gradient-to-b from-black/30 to-transparent"
        }`}
      />

      <nav className="relative flex items-center justify-between px-5 md:px-[100px] py-3.5">

        {/* ── Logo ───────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Image src="/images/logo.png" alt="EZ HARDSCAPE" width={36} height={36} className="rounded-lg object-contain" />
          <span
            className="text-white font-semibold"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "20px", letterSpacing: "-1.1px" }}
          >
            EZ HARDSCAPE
          </span>
        </Link>

        {/* ── Nav items (desktop only) ───────────────────────── */}
        <ul className="hidden md:flex items-center gap-1">

          {/* Inicio — link directo, sin dropdown */}
          <li>
            <Link
              href="/"
              className="hover:bg-white/10"
              style={navLinkStyle}
            >
              <NavLabel label={t("nav.home")} />
            </Link>
          </li>

          {/* Servicios — con dropdown */}
          <li className="relative" {...hov("services")}>
            <button
              className="group flex items-center gap-1 hover:bg-white/10 focus:outline-none transition-colors duration-150"
              style={{
                fontFamily: "var(--font-schibsted)", fontWeight: 500, fontSize: "15px",
                letterSpacing: "-0.2px", color: open === "services" ? "white" : "rgba(255,255,255,0.85)",
                background: "none", border: "none", cursor: "pointer", padding: "8px 12px", borderRadius: "12px",
              }}
            >
              <NavLabel label={t("nav.services")} />
              <motion.span animate={{ rotate: open === "services" ? 180 : 0 }} transition={{ duration: 0.18 }}>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </motion.span>
            </button>

            <AnimatePresence>
              {open === "services" && (
                <motion.div
                  {...dropAnim}
                  className="absolute top-full"
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                  onMouseEnter={keepOpen}
                  onMouseLeave={closeDrop}
                >
                  <div style={{ ...panelStyle, marginTop: "8px", padding: "20px" }}>
                    <ServicesDropdown t={t} onClose={() => setOpen(null)} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Nosotros — link directo, sin dropdown */}
          <li>
            <Link
              href="/about"
              className="hover:bg-white/10"
              style={navLinkStyle}
            >
              <NavLabel label={t("nav.about")} />
            </Link>
          </li>

          {/* Contacto — dropdown posicionado relativo al nav item */}
          <li className="relative" {...hov("contact")}>
            <button
              className="group flex items-center gap-1 hover:bg-white/10 focus:outline-none transition-colors duration-150"
              style={{
                fontFamily: "var(--font-schibsted)", fontWeight: 500, fontSize: "15px",
                letterSpacing: "-0.2px", color: open === "contact" ? "white" : "rgba(255,255,255,0.85)",
                background: "none", border: "none", cursor: "pointer", padding: "8px 12px", borderRadius: "12px",
              }}
            >
              <NavLabel label={t("nav.contact")} />
              <motion.span animate={{ rotate: open === "contact" ? 180 : 0 }} transition={{ duration: 0.18 }}>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </motion.span>
            </button>

            <AnimatePresence>
              {open === "contact" && (
                <motion.div
                  {...dropAnim}
                  className="absolute top-full"
                  style={{ left: "50%", transform: "translateX(-50%)", marginTop: "8px" }}
                  onMouseEnter={keepOpen}
                  onMouseLeave={closeDrop}
                >
                  <div style={{ ...panelStyle, padding: "20px" }}>
                    <ContactDropdown t={t} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

        </ul>

        {/* ── Right CTAs (desktop only) ──────────────────────── */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          {/* Language Toggle */}
          <button
            onClick={toggle}
            style={{
              fontFamily: "var(--font-schibsted)", fontWeight: 600, fontSize: "12px",
              padding: "6px 11px", borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.07)", cursor: "pointer",
              letterSpacing: "0.4px", color: "white",
            }}
          >
            <span style={{ opacity: lang === "en" ? 1 : 0.4 }}>EN</span>
            <span style={{ opacity: 0.3, margin: "0 3px" }}>|</span>
            <span style={{ opacity: lang === "es" ? 1 : 0.4 }}>ES</span>
          </button>

          {/* Call / SMS / WhatsApp dropdown */}
          <div className="relative" {...hov("call")}>
            <button
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-200"
              style={{
                fontFamily: "var(--font-schibsted)", fontWeight: 500, fontSize: "14px",
                padding: "8px 13px", borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.06)", cursor: "pointer",
              }}
            >
              <Phone className="w-3.5 h-3.5" />
              {t("nav.callNow")}
              <motion.span animate={{ rotate: open === "call" ? 180 : 0 }} transition={{ duration: 0.18 }}>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </motion.span>
            </button>

            <AnimatePresence>
              {open === "call" && (
                <motion.div
                  {...dropAnim}
                  className="absolute right-0 top-full mt-2"
                  style={{ ...panelStyle, padding: "12px", minWidth: "220px" }}
                  onMouseEnter={keepOpen} onMouseLeave={closeDrop}
                >
                  <CallDropdown t={t} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Get a Quote */}
          <Link
            href="/quote"
            className="flex items-center justify-center bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all duration-200 rounded-full"
            style={{ fontFamily: "var(--font-schibsted)", fontWeight: 600, fontSize: "14px", padding: "9px 20px" }}
          >
            {t("nav.getQuote")}
          </Link>
        </div>

        {/* ── Mobile: Quote + Hamburger ───────────────────────── */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/quote"
            className="flex items-center justify-center bg-white text-black rounded-full active:scale-[0.98] transition-all duration-200"
            style={{ fontFamily: "var(--font-schibsted)", fontWeight: 600, fontSize: "13px", padding: "7px 16px" }}
          >
            {t("nav.getQuote")}
          </Link>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? "rotate(45deg) translate(0px, 5px)" : "none" }}
            />
            <span
              className="block w-5 h-[1.5px] bg-white transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? "scaleX(0)" : "none" }}
            />
            <span
              className="block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? "rotate(-45deg) translate(0px, -5px)" : "none" }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full left-0 right-0"
            style={{
              background:           "rgba(10,12,11,0.97)",
              backdropFilter:       "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderTop:            "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="px-5 py-6 space-y-1">

              {/* Home */}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-3.5 rounded-xl hover:bg-white/08 active:bg-white/10 transition-colors"
                style={{ fontFamily: "var(--font-schibsted)", fontWeight: 500, fontSize: "16px", color: "rgba(255,255,255,0.85)" }}
              >
                {t("nav.home")}
              </Link>

              {/* Services — expandable */}
              <div>
                <button
                  onClick={() => setMobileServices((v) => !v)}
                  className="w-full flex items-center justify-between px-3 py-3.5 rounded-xl hover:bg-white/08 active:bg-white/10 transition-colors"
                  style={{ fontFamily: "var(--font-schibsted)", fontWeight: 500, fontSize: "16px", color: "rgba(255,255,255,0.85)", background: "none", border: "none", cursor: "pointer" }}
                >
                  {t("nav.services")}
                  <motion.span animate={{ rotate: mobileServices ? 180 : 0 }} transition={{ duration: 0.18 }}>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileServices && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-2 space-y-0.5">
                        {SERVICES.map((s) => (
                          <Link
                            key={s.labelKey}
                            href={s.href}
                            onClick={() => { setMobileOpen(false); setMobileServices(false); }}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/08 transition-colors"
                          >
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                              <Image src={s.img} alt="" fill className="object-cover" sizes="32px" />
                            </div>
                            <span style={{ fontFamily: "var(--font-schibsted)", fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
                              {t(s.labelKey)}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About */}
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-3.5 rounded-xl hover:bg-white/08 active:bg-white/10 transition-colors"
                style={{ fontFamily: "var(--font-schibsted)", fontWeight: 500, fontSize: "16px", color: "rgba(255,255,255,0.85)" }}
              >
                {t("nav.about")}
              </Link>

              {/* Divider */}
              <div className="h-px bg-white/10 my-2" />

              {/* Contact links */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/08 transition-colors"
              >
                <div className="flex items-center justify-center rounded-xl w-8 h-8" style={{ backgroundColor: "#25D36625" }}>
                  <WhatsAppIcon className="w-4 h-4" style={{ color: "#25D366" }} />
                </div>
                <span style={{ fontFamily: "var(--font-schibsted)", fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
                  WhatsApp
                </span>
              </a>

              <a
                href={CALL_URL}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/08 transition-colors"
              >
                <div className="flex items-center justify-center rounded-xl w-8 h-8" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <Phone className="w-4 h-4 text-white/70" />
                </div>
                <span style={{ fontFamily: "var(--font-schibsted)", fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
                  {t("nav.callDirect")}
                </span>
              </a>

              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/08 transition-colors"
              >
                <div className="flex items-center justify-center rounded-xl w-8 h-8" style={{ backgroundColor: "#f59e0b25" }}>
                  <Mail className="w-4 h-4" style={{ color: "#f59e0b" }} />
                </div>
                <span style={{ fontFamily: "var(--font-schibsted)", fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
                  {t("nav.email")}
                </span>
              </a>

              {/* Divider */}
              <div className="h-px bg-white/10 my-2" />

              {/* Language toggle */}
              <div className="flex items-center justify-between px-3 py-2">
                <span style={{ fontFamily: "var(--font-schibsted)", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  Language
                </span>
                <button
                  onClick={toggle}
                  style={{
                    fontFamily:  "var(--font-schibsted)",
                    fontWeight:  600,
                    fontSize:    "13px",
                    padding:     "6px 14px",
                    borderRadius: "8px",
                    border:      "1px solid rgba(255,255,255,0.18)",
                    background:  "rgba(255,255,255,0.07)",
                    cursor:      "pointer",
                    letterSpacing: "0.4px",
                    color:       "white",
                  }}
                >
                  <span style={{ opacity: lang === "en" ? 1 : 0.4 }}>EN</span>
                  <span style={{ opacity: 0.3, margin: "0 4px" }}>|</span>
                  <span style={{ opacity: lang === "es" ? 1 : 0.4 }}>ES</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Services Dropdown ─────────────────────────────────────────── */
function ServicesDropdown({ t, onClose }: { t: (k: string) => string; onClose: () => void }) {
  return (
    <div style={{ minWidth: "820px" }}>
      <p style={{
        fontFamily: "var(--font-schibsted)", fontSize: "11px", fontWeight: 500,
        color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px",
        textTransform: "uppercase", paddingLeft: "4px", marginBottom: "14px",
      }}>
        {t("nav.ourServices")}
      </p>

      <div className="grid grid-cols-4 gap-3">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.labelKey}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.16 }}
          >
            <Link href={s.href} onClick={onClose}>
              <div
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{
                  height: "140px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03) translateY(-2px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1) translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <Image src={s.img} alt={t(s.labelKey)} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="200px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center justify-center rounded-full w-[22px] h-[22px]"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                    <ArrowUpRight className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                  <p className="text-white font-semibold text-sm leading-tight"
                    style={{ fontFamily: "var(--font-schibsted)", letterSpacing: "-0.2px" }}>
                    {t(s.labelKey)}
                  </p>
                  <p className="text-white/55 text-xs mt-0.5" style={{ fontFamily: "var(--font-schibsted)" }}>
                    {t(s.descKey)}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <Link href="/quote" onClick={onClose} className="flex items-center justify-between group">
          <span style={{ fontFamily: "var(--font-schibsted)", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
            {t("nav.notSure")}
          </span>
          <span className="flex items-center gap-1.5 text-white group-hover:gap-2.5 transition-all duration-200"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "13px", fontWeight: 600 }}>
            {t("nav.freeConsult")}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}

/* ─── Contact Dropdown ──────────────────────────────────────────── */
function ContactDropdown({ t }: { t: (k: string) => string }) {
  const items = [
    {
      href: WHATSAPP_URL, target: "_blank",
      icon: ({ style }: { style?: React.CSSProperties }) => <WhatsAppIcon className="w-4 h-4" style={style} />,
      color: "#25D366",
      labelKey: "nav.whatsapp", subKey: "nav.whatsappSub",
    },
    {
      href: SMS_URL, target: undefined,
      icon: ({ style }: { style?: React.CSSProperties }) => <Phone className="w-4 h-4" style={style} />,
      color: "#6366f1",
      labelKey: "nav.sms", subKey: "nav.smsSub",
    },
    {
      href: `mailto:${EMAIL_ADDRESS}`, target: "_blank",
      icon: ({ style }: { style?: React.CSSProperties }) => <Mail className="w-4 h-4" style={style} />,
      color: "#f59e0b",
      labelKey: "nav.email", subKey: "nav.emailSub",
    },
    {
      href: INSTAGRAM_URL, target: "_blank",
      icon: ({ style }: { style?: React.CSSProperties }) => <InstagramIcon className="w-4 h-4" style={style} />,
      color: "#E1306C",
      labelKey: "nav.instagram", subKey: "nav.instagramSub",
    },
  ];

  return (
    <div style={{ minWidth: "280px" }}>
      <p style={{
        fontFamily: "var(--font-schibsted)", fontSize: "11px", fontWeight: 500,
        color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px",
        textTransform: "uppercase", marginBottom: "12px",
      }}>
        {t("nav.contactTagline")}
      </p>

      <div className="space-y-1.5">
        {items.map(({ href, target, icon: Icon, color, labelKey, subKey }) => (
          <a
            key={labelKey} href={href} target={target} rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 transition-colors duration-150 group"
          >
            <div
              className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ width: "36px", height: "36px", backgroundColor: color + "25" }}
            >
              <Icon style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: "var(--font-schibsted)", fontSize: "14px", fontWeight: 600, color: "white" }}>
                {t(labelKey)}
              </p>
              <p style={{ fontFamily: "var(--font-schibsted)", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                {t(subKey)}
              </p>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 flex-shrink-0 transition-colors" />
          </a>
        ))}
      </div>

      <div
        className="mt-3 pt-3 flex items-center gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Clock className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
        <span style={{ fontFamily: "var(--font-schibsted)", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
          {t("nav.hours")}
        </span>
      </div>
    </div>
  );
}

/* ─── Call Dropdown (phone button) ─────────────────────────────── */
function CallDropdown({ t }: { t: (k: string) => string }) {
  const items = [
    {
      href: WHATSAPP_URL, target: "_blank",
      icon: ({ style }: { style?: React.CSSProperties }) => <WhatsAppIcon className="w-3.5 h-3.5" style={style} />,
      color: "#25D366",
      labelKey: "nav.whatsappCall", subKey: "nav.whatsappCallSub",
    },
    {
      href: SMS_URL, target: undefined,
      icon: ({ style }: { style?: React.CSSProperties }) => <Phone className="w-3.5 h-3.5" style={style} />,
      color: "#6366f1",
      labelKey: "nav.smsText", subKey: "nav.smsTextSub",
    },
    {
      href: CALL_URL, target: undefined,
      icon: ({ style }: { style?: React.CSSProperties }) => <Phone className="w-3.5 h-3.5" style={style} />,
      color: "#f8f8f8",
      labelKey: "nav.callDirect", subKey: "nav.callDirectSub",
    },
  ];

  return (
    <div className="space-y-1">
      {items.map(({ href, target, icon: Icon, color, labelKey, subKey }) => (
        <a
          key={labelKey} href={href} target={target} rel="noopener noreferrer"
          className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/10 transition-colors duration-150 group"
        >
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: "32px", height: "32px", backgroundColor: color + "20" }}
          >
            <Icon style={{ color }} />
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-schibsted)", fontSize: "13px", fontWeight: 600, color: "white" }}>
              {t(labelKey)}
            </p>
            <p style={{ fontFamily: "var(--font-schibsted)", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
              {t(subKey)}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

/* ─── Animated Nav Label ────────────────────────────────────────── */
function NavLabel({ label }: { label: string }) {
  return (
    <span className="relative inline-block group">
      <span className="text-white/85 group-hover:text-white transition-colors duration-200">{label}</span>
      <span
        className="absolute bottom-[-3px] left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
        style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
      />
    </span>
  );
}

/* ─── Unused imports kept for MapPin ───────────────────────────── */
void MapPin; void Home; void Users; void Star;
