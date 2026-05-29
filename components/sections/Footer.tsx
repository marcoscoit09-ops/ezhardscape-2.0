"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer
      className="w-full bg-[#0e1311] text-white px-5 sm:px-10 md:px-20 pt-16 pb-8"
    >
      <div className="max-w-[1120px] mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo2.png"
              alt="EZ Hardscape"
              width={120}
              height={40}
              className="mb-4 brightness-0 invert"
            />
            <p
              className="text-white/50 text-[13px] leading-relaxed"
              style={{ fontFamily: "var(--font-schibsted)" }}
            >
              {lang === "es"
                ? "Transformamos patios en Arizona con instalaciones premium de pavers, travertine, turf y BBQs."
                : "Transforming Arizona backyards with premium pavers, travertine, turf & custom BBQ installations."}
            </p>
          </div>

          {/* Services */}
          <div>
            <p
              className="text-[11px] uppercase tracking-widest text-white/40 mb-4"
              style={{ fontFamily: "var(--font-schibsted)" }}
            >
              {lang === "es" ? "Servicios" : "Services"}
            </p>
            <ul className="space-y-2">
              {[
                { href: "/services/pavers",     label: lang === "es" ? "Pavers" : "Pavers" },
                { href: "/services/travertine", label: "Travertine" },
                { href: "/services/turf",       label: lang === "es" ? "Pasto Sintético" : "Artificial Turf" },
                { href: "/services/bbq",        label: lang === "es" ? "BBQ Personalizado" : "Custom BBQ" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors text-[13px]"
                    style={{ fontFamily: "var(--font-schibsted)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p
              className="text-[11px] uppercase tracking-widest text-white/40 mb-4"
              style={{ fontFamily: "var(--font-schibsted)" }}
            >
              {lang === "es" ? "Empresa" : "Company"}
            </p>
            <ul className="space-y-2">
              {[
                { href: "/about",   label: lang === "es" ? "Nosotros" : "About Us" },
                { href: "/contact", label: lang === "es" ? "Contacto" : "Contact" },
                { href: "/quote",   label: lang === "es" ? "Presupuesto gratis" : "Free Quote" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors text-[13px]"
                    style={{ fontFamily: "var(--font-schibsted)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-[11px] uppercase tracking-widest text-white/40 mb-4"
              style={{ fontFamily: "var(--font-schibsted)" }}
            >
              {lang === "es" ? "Contacto" : "Contact"}
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a
                  href="tel:+16025551234"
                  className="text-white/60 hover:text-white transition-colors text-[13px]"
                  style={{ fontFamily: "var(--font-schibsted)" }}
                >
                  (602) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a
                  href="mailto:info@ezhardscape.com"
                  className="text-white/60 hover:text-white transition-colors text-[13px]"
                  style={{ fontFamily: "var(--font-schibsted)" }}
                >
                  info@ezhardscape.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span
                  className="text-white/60 text-[13px]"
                  style={{ fontFamily: "var(--font-schibsted)" }}
                >
                  Mesa, Phoenix & Scottsdale, AZ
                </span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white/70" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white/70" />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-white/30 text-[12px]"
            style={{ fontFamily: "var(--font-schibsted)" }}
          >
            © {new Date().getFullYear()} EZ Hardscape. {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span
              className="text-white/30 text-[12px]"
              style={{ fontFamily: "var(--font-schibsted)" }}
            >
              {lang === "es" ? "Licenciado y asegurado en Arizona" : "Licensed & Insured in Arizona"}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
