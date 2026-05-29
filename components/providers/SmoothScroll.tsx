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
 * - `ReactLenis root` instala Lenis sobre <html> y expone el hook `useLenis()`
 *   a cualquier componente cliente descendiente.
 * - Desactivamos el RAF interno de Lenis (`autoRaf: false`) y lo conducimos
 *   desde el ticker de GSAP, de modo que Lenis y ScrollTrigger comparten el
 *   mismo reloj y nunca se desincronizan.
 * - En cada scroll de Lenis disparamos `ScrollTrigger.update()` para que las
 *   animaciones ligadas al scroll se mantengan perfectamente sincronizadas.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      lenis!.raf(time * 1000); // GSAP ticker está en segundos; Lenis espera ms
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
