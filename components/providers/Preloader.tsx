"use client";

import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/contexts/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const MESSAGE_KEYS = ["boot.msg1", "boot.msg2", "boot.msg3", "boot.msg4", "boot.msg5"];

/**
 * Secuencia de arranque tipo borealishpc.com adaptada a EZ HARDSCAPE.
 *
 * Una cortina a pantalla completa con contador 0→100 %, barra de progreso y
 * mensajes técnicos rotativos. Al terminar, la cortina se retira hacia arriba
 * revelando la página. Bloquea el scroll de Lenis mientras carga.
 *
 * Se muestra una vez por sesión (sessionStorage). Borra esa clave para volver
 * a verlo, o elimina la condición si lo quieres en cada carga.
 */
export default function Preloader() {
  const lenis = useLenis();
  const { t } = useLang();

  // Decisión síncrona en el primer render para no parpadear.
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("ez-booted") === "1";
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (done) return;

      // Bloquea el scroll durante la carga.
      lenis?.stop();
      document.documentElement.classList.add("is-loading");

      const progress = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          lenis?.start();
          document.documentElement.classList.remove("is-loading");
          sessionStorage.setItem("ez-booted", "1");
          setDone(true);
        },
      });

      // Contador + barra 0 → 100 %.
      tl.to(progress, {
        value: 100,
        duration: 2.6,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(progress.value);
          if (counterRef.current) counterRef.current.textContent = String(v);
          if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
        },
      });

      // Mensajes rotativos sincronizados con el progreso.
      MESSAGE_KEYS.forEach((key, i) => {
        tl.call(
          () => {
            if (!msgRef.current) return;
            gsap.fromTo(
              msgRef.current,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            );
            msgRef.current.textContent = t(key);
          },
          [],
          (i / MESSAGE_KEYS.length) * 2.6,
        );
      });

      // Retirada de la cortina.
      tl.to(
        rootRef.current,
        { yPercent: -100, duration: 1, ease: "power4.inOut" },
        "+=0.25",
      );

      // Seguridad: si el componente se desmonta (p. ej. navegación) antes de
      // que termine la secuencia, reactivamos el scroll igualmente para no
      // dejar la página bloqueada.
      return () => {
        lenis?.start();
        document.documentElement.classList.remove("is-loading");
      };
    },
    { scope: rootRef, dependencies: [done] },
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#F5F0E8] text-black"
    >
      <div className="flex flex-col items-center gap-8 px-6 w-full max-w-md">
        <span className="font-[family-name:var(--font-fustat)] text-3xl md:text-4xl font-extrabold tracking-tight">
          EZ HARDSCAPE
        </span>

        {/* Barra de progreso */}
        <div className="w-full h-px bg-black/15 overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-black origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <div className="flex w-full items-baseline justify-between">
          <div
            ref={msgRef}
            className="text-sm text-black/60 font-[family-name:var(--font-inter)]"
          >
            {t(MESSAGE_KEYS[0])}
          </div>
          <div className="font-[family-name:var(--font-fustat)] text-2xl font-bold tabular-nums">
            <span ref={counterRef}>0</span>
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
