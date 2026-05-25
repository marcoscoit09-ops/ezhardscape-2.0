"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const PHONE = "4916025961949";

const ACTIONS = [
  {
    key: "whatsapp",
    href: `https://wa.me/${PHONE}`,
    target: "_blank",
    icon: ({ style }: { style?: React.CSSProperties }) => <WhatsAppIcon className="w-3.5 h-3.5" style={style} />,
    color: "#25D366",
    labelKey: "fab.whatsapp",
  },
  {
    key: "sms",
    href: `sms:+${PHONE}`,
    target: undefined,
    icon: ({ style }: { style?: React.CSSProperties }) => <Phone className="w-3.5 h-3.5" style={style} />,
    color: "#6366f1",
    labelKey: "fab.sms",
  },
  {
    key: "call",
    href: `tel:+${PHONE}`,
    target: undefined,
    icon: ({ style }: { style?: React.CSSProperties }) => <Phone className="w-3.5 h-3.5" style={style} />,
    color: "white",
    labelKey: "fab.call",
  },
];

export default function FloatingContact() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      style={{ pointerEvents: "none" }}
    >
      {/* Action buttons — appear above the FAB */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.93 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-end gap-2"
            style={{ pointerEvents: "auto" }}
          >
            {ACTIONS.map(({ key, href, target, icon: Icon, color, labelKey }, i) => (
              <motion.a
                key={key}
                href={href}
                target={target}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.18 }}
                className="flex items-center gap-2.5 pr-3 pl-2 py-2 rounded-full hover:scale-105 active:scale-95 transition-transform duration-150"
                style={{
                  background: "rgba(10,12,11,0.92)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
                  textDecoration: "none",
                }}
              >
                {/* Icon circle */}
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: "30px", height: "30px", backgroundColor: color + (color === "white" ? "" : "22") }}
                >
                  <Icon style={{ color }} />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-schibsted)",
                    fontWeight: 600, fontSize: "13px", color: "white",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t(labelKey)}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB — logo button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.06 }}
        className="relative flex items-center justify-center rounded-full overflow-hidden focus:outline-none"
        style={{
          width: "58px",
          height: "58px",
          background: "rgba(10,12,11,0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
          cursor: "pointer",
          pointerEvents: "auto",
        }}
        aria-label="Contact options"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ scale: 0.6, opacity: 0, rotate: -90 }}
              animate={{ scale: 1,   opacity: 1, rotate: 0 }}
              exit={{ scale: 0.6, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="logo"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <Image
                src="/images/logo.png"
                alt="EZ HARDSCAPE"
                width={36}
                height={36}
                className="object-contain rounded-full"
              />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              border: "1.5px solid rgba(255,255,255,0.2)",
              animationDuration: "2.5s",
            }}
          />
        )}
      </motion.button>
    </div>
  );
}
