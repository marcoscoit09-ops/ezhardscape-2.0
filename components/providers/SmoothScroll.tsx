"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Smooth scroll (Lenis) integrado con GSAP ScrollTrigger.
 *
 * `ReactLenis root` instala Lenis sobre <html> y gestiona su propio RAF
 * (autoRaf por defecto), de modo que el scroll suave SIEMPRE funciona aunque
 * el resto de la integración falle. Como Lenis en modo `root` hace scroll real
 * del documento, ScrollTrigger ya reacciona a los eventos nativos; además lo
 * empujamos en cada scroll de Lenis para que vaya perfectamente sincronizado.
 *
 * `useLenis()` queda disponible para cualquier componente cliente descendiente.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
