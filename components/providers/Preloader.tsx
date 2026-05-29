"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { useLang } from "@/contexts/LanguageContext";

const MESSAGE_KEYS = ["boot.msg1", "boot.msg2", "boot.msg3", "boot.msg4", "boot.msg5"];
const DURATION = 2600; // ms que tarda la barra en llegar al 100 %

/**
 * Secuencia de arranque tipo borealishpc.com adaptada a EZ HARDSCAPE.
 *
 * Implementación deliberadamente autónoma (React + requestAnimationFrame, sin
 * depender de GSAP): una cortina a pantalla completa con contador 0→100 %,
 * barra de progreso y mensajes técnicos rotativos. Al terminar, la cortina se
 * retira hacia arriba (transición CSS) y revela la página.
 *
 * Bloquea el scroll mientras carga y SIEMPRE lo reactiva al terminar o al
 * desmontarse, con un temporizador de seguridad que garantiza que nunca se
 * quede colgada. Se muestra una vez por sesión (sessionStorage).
 */
export default function Preloader() {
  const lenis = useLenis();
  const { t } = useLang();

  // Decisión síncrona en el primer render para no parpadear.
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("ez-booted") === "1";
  });
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useEffect(() => {
    if (done) return;

    document.documentElement.classList.add("is-loading");
    lenisRef.current?.stop();

    let rafId = 0;
    let finished = false;
    const start = performance.now();

    const unlock = () => {
      document.documentElement.classList.remove("is-loading");
      lenisRef.current?.start();
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(rafId);
      setProgress(100);
      setLeaving(true); // dispara la transición CSS de salida de la cortina
      // Tras la transición (~900ms) desmontamos y reactivamos el scroll.
      window.setTimeout(() => {
        unlock();
        sessionStorage.setItem("ez-booted", "1");
        setDone(true);
      }, 950);
    };

    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / DURATION) * 100);
      setProgress(pct);
      setMsgIndex(Math.min(MESSAGE_KEYS.length - 1, Math.floor((pct / 100) * MESSAGE_KEYS.length)));
      if (pct >= 100) {
        finish();
        return;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Red de seguridad: pase lo que pase, termina como muy tarde a los 6 s.
    const safety = window.setTimeout(finish, 6000);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(safety);
      unlock();
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#F5F0E8] text-black"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div className="flex flex-col items-center gap-8 px-6 w-full max-w-md">
        <span className="font-[family-name:var(--font-fustat)] text-3xl md:text-4xl font-extrabold tracking-tight">
          EZ HARDSCAPE
        </span>

        {/* Barra de progreso */}
        <div className="w-full h-px bg-black/15 overflow-hidden">
          <div
            className="h-full bg-black origin-left"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>

        <div className="flex w-full items-baseline justify-between">
          <div
            key={msgIndex}
            className="text-sm text-black/60 font-[family-name:var(--font-inter)] animate-[fadeIn_0.35s_ease]"
          >
            {t(MESSAGE_KEYS[msgIndex])}
          </div>
          <div className="font-[family-name:var(--font-fustat)] text-2xl font-bold tabular-nums">
            {Math.round(progress)}
            <span className="text-black/40"> %</span>
          </div>
        </div>

        <span className="mt-2 text-[11px] uppercase tracking-[0.25em] text-black/40">
          {t("boot.tagline")}
        </span>
      </div>
    </div>
  );
}
