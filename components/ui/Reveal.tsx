"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type RevealProps = {
  children: ReactNode;
  /** Etiqueta a renderizar (div por defecto). */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Desplazamiento vertical inicial en px. */
  y?: number;
  /** Retardo extra en segundos. */
  delay?: number;
  /** Duración en segundos. */
  duration?: number;
  /**
   * Si pasas hijos directos, se animan en cascada (stagger) en lugar del
   * bloque entero. Útil para listas de tarjetas.
   */
  stagger?: number;
  /** Punto de disparo del ScrollTrigger (sintaxis de start de GSAP). */
  start?: string;
  /** Repetir la animación cada vez que entra/sale del viewport. */
  once?: boolean;
};

/**
 * Reveal genérico ligado al scroll: fade + translate hacia arriba.
 * Respeta `prefers-reduced-motion` (no anima si el usuario lo pide).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  style,
  y = 40,
  delay = 0,
  duration = 0.9,
  stagger,
  start = "top 85%",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const targets =
        stagger != null ? Array.from(el.children) : el;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
