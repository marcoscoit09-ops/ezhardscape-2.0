"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type ParallaxImageProps = {
  src: string;
  alt: string;
  /** Clase del contenedor (debe ser `relative overflow-hidden` con altura). */
  className?: string;
  sizes?: string;
  priority?: boolean;
  imgClassName?: string;
  /** Intensidad del parallax en % de desplazamiento (por defecto 12). */
  amount?: number;
};

/**
 * Imagen con parallax ligado al scroll, estilo Borealis: la imagen se desplaza
 * más lento que el resto de la página mientras la sección cruza el viewport.
 *
 * La capa interior se sobredimensiona (130 % de alto) para que el movimiento
 * nunca deje ver los bordes. Respeta `prefers-reduced-motion`.
 */
export default function ParallaxImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority,
  imgClassName = "object-cover object-center",
  amount = 12,
}: ParallaxImageProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = innerRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: innerRef },
  );

  return (
    <div className={className}>
      {/* Capa sobredimensionada que se desplaza con el scroll */}
      <div ref={innerRef} className="absolute inset-x-0 -top-[15%] h-[130%]">
        <Image src={src} alt={alt} fill className={imgClassName} sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}
