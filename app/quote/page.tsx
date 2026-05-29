"use client";

import { useState, useRef, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import {
  Paperclip, X, Mail, Phone,
  ChevronRight, CheckCircle2, ArrowLeft,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import RevealText from "@/components/ui/RevealText";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import React from "react";

/* ─── Helpers ─────────────────────────────────────────────────── */

function buildSubmitUrl(
  method: string,
  form: { name: string; phone: string; email: string; address: string; description: string; services: string[]; budget: string },
  fileName?: string
) {
  const body = [
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Address: ${form.address}`,
    `Services: ${form.services.join(", ")}`,
    `Budget: ${form.budget}`,
    `\nProject Description:\n${form.description}`,
    fileName ? `\nYard Photo: ${fileName} (please attach it to this message)` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const encodedBody = encodeURIComponent(body);
  const shortBody   = encodeURIComponent(body.slice(0, 4000));

  switch (method) {
    case "whatsapp":
      return `https://wa.me/4916025961949?text=${shortBody}`;
    case "email":
      return `mailto:Ezhardscape.az@gmail.com?subject=${encodeURIComponent("Project Quote Request - " + form.name)}&body=${encodedBody}`;
    case "sms":
      return `sms:+4916025961949?body=${shortBody}`;
    case "instagram":
      return "https://www.instagram.com/ez__hardscapinganddesign/";
    case "facebook":
      return "https://www.facebook.com/share/17mhpdV5F2/?mibextid=wwXIfr";
    case "call":
      return "tel:+4916025961949";
    default:
      return "/contact";
  }
}

/* ─── Inner component (uses useSearchParams) ──────────────────── */

function QuoteForm() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const initialDesc  = searchParams.get("desc") ?? "";

  const [name, setName]               = useState("");
  const [phone, setPhone]             = useState("");
  const [email, setEmail]             = useState("");
  const [address, setAddress]         = useState("");
  const [description, setDescription] = useState(initialDesc);
  const [services, setServices]       = useState<string[]>([]);
  const [budget, setBudget]           = useState("");
  const [contactMethod, setContact]   = useState("");

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl]     = useState<string | null>(null);
  const [submitted, setSubmitted]       = useState(false);
  const [errors, setErrors]            = useState<Record<string, string>>({});

  const fileRef = useRef<HTMLInputElement>(null);

  /* Dynamic service & budget option lists (use translation keys) */
  const SERVICE_OPTS = [
    { key: "quote.svc1", id: "Paver Patios" },
    { key: "quote.svc2", id: "Travertine" },
    { key: "quote.svc3", id: "Premium Turf" },
    { key: "quote.svc4", id: "Custom BBQ / Firepit" },
    { key: "quote.svc5", id: "Full Backyard Design" },
    { key: "quote.svc6", id: "Other" },
  ];

  const BUDGET_OPTS = [
    { key: "quote.bud1", id: "Under $5,000" },
    { key: "quote.bud2", id: "$5,000 – $15,000" },
    { key: "quote.bud3", id: "$15,000 – $30,000" },
    { key: "quote.bud4", id: "$30,000 – $60,000" },
    { key: "quote.bud5", id: "$60,000+" },
    { key: "quote.bud6", id: "Not sure yet" },
  ];

  const CONTACT_METHODS: {
    id: string;
    labelKey: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    color: string;
  }[] = [
    { id: "whatsapp",  labelKey: "quote.method.wa",    icon: WhatsAppIcon,  color: "#25D366" },
    { id: "email",     labelKey: "quote.method.email",  icon: Mail,          color: "#0e1311" },
    { id: "sms",       labelKey: "quote.method.sms",    icon: Phone,         color: "#555"    },
    { id: "instagram", labelKey: "quote.method.ig",     icon: InstagramIcon, color: "#C13584" },
    { id: "facebook",  labelKey: "quote.method.fb",     icon: FacebookIcon,  color: "#1877F2" },
    { id: "call",      labelKey: "quote.method.call",   icon: Phone,         color: "#333"    },
  ];

  /* File upload */
  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, [previewUrl]);

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadedFile(null);
    setPreviewUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  }, [previewUrl]);

  /* Toggle service */
  const toggleService = (s: string) =>
    setServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  /* Validate */
  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())        e.name        = t("quote.err.name");
    if (!phone.trim() && !email.trim()) e.contact = t("quote.err.contact");
    if (services.length === 0) e.services  = t("quote.err.services");
    if (!contactMethod)      e.method      = t("quote.err.method");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* Submit */
  const handleSubmit = () => {
    if (!validate()) return;
    const form = { name, phone, email, address, description, services, budget };
    const url  = buildSubmitUrl(contactMethod, form, uploadedFile?.name);
    setSubmitted(true);
    setTimeout(() => {
      window.open(url, contactMethod === "call" ? "_self" : "_blank");
    }, 600);
  };

  /* ── Success screen ───────────────────────────── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center text-center px-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "#0e1311" }}
        >
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h1
          style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, fontSize: "48px", letterSpacing: "-2px", marginBottom: "16px" }}
        >
          {t("quote.success.h1")}
        </h1>
        <p style={{ fontFamily: "var(--font-schibsted)", fontSize: "17px", color: "#666", maxWidth: "420px", marginBottom: "32px" }}>
          {t("quote.success.sub")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-black hover:underline"
          style={{ fontFamily: "var(--font-schibsted)", fontSize: "15px" }}
        >
          <ArrowLeft className="w-4 h-4" /> {t("quote.success.back")}
        </Link>
      </div>
    );
  }

  /* ── Form ─────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Navbar dark />

      {/* Header */}
      <section
        className="text-center flex flex-col items-center"
        style={{ paddingTop: "150px", paddingBottom: "60px", paddingLeft: "120px", paddingRight: "120px" }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 mb-8 text-black/40 hover:text-black transition-colors"
          style={{ fontFamily: "var(--font-schibsted)", fontSize: "14px" }}
        >
          <ArrowLeft className="w-4 h-4" /> {t("quote.back")}
        </Link>
        <RevealText
          as="h1"
          className="leading-none mb-4"
          style={{ fontFamily: "var(--font-fustat)", fontWeight: 800, fontSize: "64px", letterSpacing: "-3px" }}
        >
          {t("quote.h1")}
        </RevealText>
        <p style={{ fontFamily: "var(--font-schibsted)", fontSize: "18px", color: "#666", maxWidth: "480px" }}>
          {t("quote.sub")}
        </p>
      </section>

      {/* Form body */}
      <main className="pb-24 max-w-[760px] mx-auto px-8">
        <div
          className="rounded-3xl p-10 bg-white"
          style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 8px 48px rgba(0,0,0,0.08)" }}
        >

          {/* ── 1. Contact Info ─────────────────────── */}
          <Section title={t("quote.s1")}>
            <div className="grid grid-cols-2 gap-4">
              <Field label={t("quote.name")} error={errors.name}>
                <input
                  value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className={inputCls(errors.name)}
                />
              </Field>
              <Field label={t("quote.phone")} error={errors.contact}>
                <input
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (480) 555-0100"
                  className={inputCls(errors.contact)}
                />
              </Field>
              <Field label={t("quote.email")} error="">
                <input
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@email.com"
                  className={inputCls("")}
                  type="email"
                />
              </Field>
              <Field label={t("quote.address")} error="">
                <input
                  value={address} onChange={(e) => setAddress(e.target.value)}
                  placeholder="Mesa, AZ 85201"
                  className={inputCls("")}
                />
              </Field>
            </div>
          </Section>

          <Divider />

          {/* ── 2. Services ─────────────────────────── */}
          <Section title={t("quote.s2")} error={errors.services}>
            <div className="grid grid-cols-3 gap-3">
              {SERVICE_OPTS.map(({ key, id }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleService(id)}
                  className="text-left px-4 py-3 rounded-xl border transition-all duration-200 active:scale-[0.97]"
                  style={{
                    fontFamily: "var(--font-schibsted)",
                    fontSize: "14px",
                    fontWeight: services.includes(id) ? 600 : 400,
                    backgroundColor: services.includes(id) ? "#0e1311" : "white",
                    color: services.includes(id) ? "white" : "#333",
                    borderColor: services.includes(id) ? "#0e1311" : "rgba(0,0,0,0.12)",
                  }}
                >
                  {services.includes(id) && <span className="mr-1.5">✓</span>}
                  {t(key)}
                </button>
              ))}
            </div>
          </Section>

          <Divider />

          {/* ── 3. Budget ────────────────────────────── */}
          <Section title={t("quote.s3")}>
            <div className="grid grid-cols-3 gap-3">
              {BUDGET_OPTS.map(({ key, id }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setBudget(id)}
                  className="px-4 py-3 rounded-xl border transition-all duration-200 active:scale-[0.97]"
                  style={{
                    fontFamily: "var(--font-schibsted)",
                    fontSize: "13px",
                    fontWeight: budget === id ? 600 : 400,
                    backgroundColor: budget === id ? "#0e1311" : "white",
                    color: budget === id ? "white" : "#333",
                    borderColor: budget === id ? "#0e1311" : "rgba(0,0,0,0.12)",
                  }}
                >
                  {t(key)}
                </button>
              ))}
            </div>
          </Section>

          <Divider />

          {/* ── 4. Description + Photo ──────────────── */}
          <Section title={t("quote.s4")}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("quote.descPlaceholder")}
              rows={5}
              className={`${inputCls("")} resize-none`}
            />

            {/* Photo upload */}
            <div className="mt-4">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />

              {!previewUrl ? (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-black/20 hover:border-black/40 hover:bg-black/[0.02] transition-all duration-200 w-full justify-center"
                  style={{ fontFamily: "var(--font-schibsted)", fontSize: "14px", color: "#666" }}
                >
                  <Paperclip className="w-4 h-4" />
                  {t("quote.upload")}
                </button>
              ) : (
                <div
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ backgroundColor: "rgba(14,19,17,0.04)", border: "1px solid rgba(14,19,17,0.1)" }}
                >
                  <Image
                    src={previewUrl} alt="Yard preview"
                    width={72} height={72}
                    className="rounded-lg object-cover w-[72px] h-[72px]"
                    unoptimized
                  />
                  <div className="flex-1">
                    <p style={{ fontFamily: "var(--font-schibsted)", fontWeight: 600, fontSize: "14px" }}>
                      {uploadedFile?.name}
                    </p>
                    <p style={{ fontFamily: "var(--font-schibsted)", fontSize: "12px", color: "#888" }}>
                      {uploadedFile ? (uploadedFile.size / 1024).toFixed(0) : 0} KB
                      {t("quote.attachNote")}
                    </p>
                  </div>
                  <button
                    onClick={clearFile}
                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/10 transition-colors"
                    aria-label="Remove photo"
                  >
                    <X className="w-4 h-4 text-black/50" />
                  </button>
                </div>
              )}
            </div>
          </Section>

          <Divider />

          {/* ── 5. Preferred Contact Method ─────────── */}
          <Section title={t("quote.s5")} error={errors.method}>
            <div className="grid grid-cols-3 gap-3">
              {CONTACT_METHODS.map((m) => {
                const Icon = m.icon;
                const active = contactMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setContact(m.id)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 active:scale-[0.97]"
                    style={{
                      fontFamily: "var(--font-schibsted)",
                      fontSize: "14px",
                      fontWeight: active ? 600 : 400,
                      backgroundColor: active ? m.color : "white",
                      color: active ? "white" : "#333",
                      borderColor: active ? m.color : "rgba(0,0,0,0.12)",
                    }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: active ? "white" : m.color }} />
                    {t(m.labelKey)}
                  </button>
                );
              })}
            </div>

            {(contactMethod === "instagram" || contactMethod === "facebook") ? (
              <p
                className="mt-3 text-xs text-amber-600"
                style={{ fontFamily: "var(--font-schibsted)" }}
              >
                ⚠️ {t("quote.warn.social")}
              </p>
            ) : null}

            {uploadedFile && contactMethod && contactMethod !== "email" ? (
              <p
                className="mt-3 text-xs"
                style={{ fontFamily: "var(--font-schibsted)", color: "#888" }}
              >
                📎 {t("quote.warn.photo")} ({uploadedFile.name})
              </p>
            ) : null}
          </Section>

          {/* ── Submit ──────────────────────────────── */}
          <button
            type="button"
            onClick={handleSubmit}
            className="mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: "#0e1311",
              fontFamily: "var(--font-schibsted)",
              fontSize: "17px",
              fontWeight: 600,
            }}
          >
            {t("quote.submit")}
            <ChevronRight className="w-5 h-5" />
          </button>

          <p
            className="text-center mt-4"
            style={{ fontFamily: "var(--font-schibsted)", fontSize: "13px", color: "#aaa" }}
          >
            {t("quote.footer")}
          </p>
        </div>
      </main>
    </div>
  );
}

/* ─── Sub-components ──────────────────────────────────────────── */

function Section({ title, children, error }: { title: string; children: React.ReactNode; error?: string }) {
  return (
    <div className="mb-0">
      <h3
        className="mb-4"
        style={{ fontFamily: "var(--font-fustat)", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.6px" }}
      >
        {title}
      </h3>
      {error && (
        <p className="mb-3 text-sm text-red-500" style={{ fontFamily: "var(--font-schibsted)" }}>
          {error}
        </p>
      )}
      {children}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        className="block mb-1.5"
        style={{ fontFamily: "var(--font-schibsted)", fontSize: "13px", fontWeight: 500, color: "#555" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500" style={{ fontFamily: "var(--font-schibsted)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function Divider() {
  return <div className="my-8 border-t border-black/[0.06]" />;
}

function inputCls(error: string) {
  return `w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 ${
    error ? "ring-2 ring-red-400" : "focus:ring-2 focus:ring-black/15"
  }` + " " + "border border-black/10 bg-white font-schibsted text-[15px] text-black placeholder:text-black/30";
}

/* ─── Page export (Suspense boundary for useSearchParams) ─────── */

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F0E8]" />}>
      <QuoteForm />
    </Suspense>
  );
}
