"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { useLang } from "@/contexts/LanguageContext";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay },
});

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative w-full min-h-screen">
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-bg.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-5 sm:px-10 md:px-20 overflow-x-hidden">
        <div className="flex flex-col items-center w-full gap-4 md:gap-[26px] -mt-4 md:-mt-[50px]">

          <motion.div {...fadeUp(0.1)} className="max-w-full overflow-hidden">
            <Badge newLabel="New" text={t("hero.badge")} />
          </motion.div>

          <div className="w-full" style={{ textAlign: "center" }}>
            <motion.div {...fadeUp(0.2)} style={{ width: "100%" }}>
              <h1
                className="text-white leading-none"
                style={{
                  fontFamily:    "var(--font-fustat)",
                  fontWeight:    800,
                  fontSize:      "clamp(26px, 7.5vw, 80px)",
                  letterSpacing: "-1px",
                  width:         "100%",
                  display:       "block",
                  overflowWrap:  "break-word",
                }}
              >
                {t("hero.headline")}
              </h1>
            </motion.div>
            <motion.div {...fadeUp(0.3)} className="mt-3 md:mt-[14px]">
              <p
                className="text-center text-[14px] sm:text-[16px] md:text-[20px] mx-auto"
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
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
