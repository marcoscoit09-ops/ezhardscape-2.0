"use client";

import { useRef, type CSSProperties, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

type RevealTextProps = {
  /** Texto a revelar. Debe ser una cadena (SplitText opera sobre el DOM). */
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Granularidad de la animación. */
  splitBy?: "lines" | "words" | "chars";
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
};

/**
 * Revela texto en cascada (línea/palabra/letra) al hacer scroll, estilo
 * Borealis: cada línea sube y aparece con un pequeño desfase.
 *
 * Usa `key={children}` internamente vía remount cuando cambia el idioma:
 * al cambiar el texto, useGSAP revierte y vuelve a dividir limpiamente.
 */
export default function RevealText({
  children,
  as: Tag = "div",
  className,
  style,
  splitBy = "lines",
  duration = 1,
  stagger = 0.12,
  delay = 0,
  start = "top 85%",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(el, {
        type: splitBy,
        linesClass: "reveal-line",
      });

      // Cada línea se enmascara con overflow hidden para que el texto
      // "emerja" desde abajo. El padding/margin compensado deja espacio a los
      // descendentes (g, j, p, y) para que el recorte no los corte.
      if (splitBy === "lines") {
        split.lines.forEach((line) => {
          const el = line as HTMLElement;
          el.style.overflow = "hidden";
          el.style.paddingBottom = "0.15em";
          el.style.marginBottom = "-0.15em";
        });
      }

      const targets =
        splitBy === "lines" ? split.lines : split[splitBy];

      gsap.from(targets, {
        yPercent: 110,
        opacity: 0,
        duration,
        delay,
        ease: "power4.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [children] },
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
