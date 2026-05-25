import ServicePage from "@/components/sections/ServicePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artificial Turf Installation | EZ HARDSCAPE Arizona",
  description:
    "Premium artificial turf installation for Arizona homes. Zero water, year-round green, pet-friendly and HOA-approved. Serving Mesa, Phoenix & Scottsdale.",
};

export default function TurfPage() {
  return (
    <ServicePage
      accentColor="#2D7A3A"
      title="Premium Turf"
      titleEs="Césped Premium"
      tagline="Water-free, maintenance-free, perfect green — year round. Arizona's smartest lawn investment."
      taglineEs="Sin agua, sin mantenimiento, verde perfecto — todo el año. La inversión más inteligente para tu jardín en Arizona."
      description="In a state where water costs are rising and summer heat kills natural grass in weeks, artificial turf is no longer a compromise — it's the obvious upgrade. Today's generation of synthetic turf is engineered with UV-stabilized fibers, built-in infill cooling systems, and drainage rates exceeding 30 inches per hour. We install only commercial-grade turf with a 15-year UV warranty — the same product used in professional sports facilities. No brown patches, no irrigation bills, no mowing. Just perfect green, every day of the year."
      descriptionEs="En un estado donde el costo del agua sigue subiendo y el calor del verano mata el pasto natural en semanas, el césped artificial ya no es un compromiso — es la actualización obvia. La generación actual de césped sintético está diseñada con fibras estabilizadas con UV, sistemas de enfriamiento de relleno incorporados y tasas de drenaje que superan los 30 pulgadas por hora. Instalamos solo césped de grado comercial con una garantía UV de 15 años — el mismo producto usado en instalaciones deportivas profesionales."
      heroImage="/images/turf/p2-1.jpg"
      priceRange="$12–$28 / sq ft"
      benefits={[
        "Save 55–70 gallons of water per square foot annually",
        "Eliminate $150–$400/month in summer irrigation costs",
        "No mowing, fertilizing, aerating, or reseeding ever again",
        "Pet-friendly: antimicrobial backing resists odor and bacteria",
        "HOA-approved products that look completely natural",
        "UV-stabilized fibers that won't fade for 15+ years",
      ]}
      benefitsEs={[
        "Ahorra 55–70 galones de agua por pie cuadrado al año",
        "Elimina $150–$400/mes en costos de irrigación en verano",
        "Nunca más cortar, fertilizar, airear o resembrar",
        "Apto para mascotas: el respaldo antimicrobiano resiste olores y bacterias",
        "Productos aprobados por la HOA que se ven completamente naturales",
        "Fibras estabilizadas con UV que no se destiñen por 15+ años",
      ]}
      specs={[
        { label: "Fiber Material", value: "Polyethylene + Polypropylene blend" },
        { label: "Pile Height", value: "1.5\" – 2.25\" (landscape grade)" },
        { label: "Face Weight", value: "50–80 oz/sq yd (residential)" },
        { label: "Infill", value: "Silica sand + Envirofill (cooling)" },
        { label: "Drainage", value: "30–40 in/hr (perforated backing)" },
        { label: "UV Rating", value: "15-year UV stability warranty" },
        { label: "Pet Safety", value: "Lead-free, antimicrobial" },
        { label: "Temp Reduction", value: "Up to 20°F vs. natural grass" },
      ]}
      specsEs={[
        { label: "Material de Fibra", value: "Mezcla de Polietileno + Polipropileno" },
        { label: "Altura de Pelo", value: "3.8 cm – 5.7 cm (grado paisajismo)" },
        { label: "Peso de Cara", value: "50–80 oz/yd² (residencial)" },
        { label: "Relleno", value: "Arena de sílice + Envirofill (enfriamiento)" },
        { label: "Drenaje", value: "76–100 cm/hr (respaldo perforado)" },
        { label: "Clasificación UV", value: "Garantía de estabilidad UV 15 años" },
        { label: "Seguridad Mascotas", value: "Sin plomo, antimicrobiano" },
        { label: "Reducción de Temp.", value: "Hasta 20°F vs. pasto natural" },
      ]}
      variants={[
        {
          name: "Landscape Turf",
          nameEs: "Césped para Jardín",
          img: "/images/turf/p2-2.jpg",
          desc: "Our most popular — lush 1.75\" pile with natural color variation. HOA-approved.",
          descEs: "El más popular — exuberante pelo de 4.4 cm con variación de color natural. Aprobado por HOA.",
        },
        {
          name: "Pet-Friendly Turf",
          nameEs: "Césped para Mascotas",
          img: "/images/turf/p1-1.jpg",
          desc: "Extra-durable with antimicrobial infill and high-drainage perforated backing.",
          descEs: "Extra duradero con relleno antimicrobiano y respaldo perforado de alto drenaje.",
        },
        {
          name: "Low Maintenance Turf",
          nameEs: "Césped Bajo Mantenimiento",
          img: "/images/turf/p2-3.jpg",
          desc: "Dense, short-pile design that stays pristine with minimal brushing.",
          descEs: "Diseño denso de pelo corto que se mantiene impecable con mínimo cepillado.",
        },
        {
          name: "Desert Blend Turf",
          nameEs: "Mezcla Desértica",
          img: "/images/turf/p2-4.jpg",
          desc: "Warm brown and tan tones that complement Arizona's desert landscape.",
          descEs: "Tonos cálidos marrones y tostados que complementan el paisaje desértico de Arizona.",
        },
      ]}
      gallery={[
        { src: "/images/turf/p2-5.jpg", alt: "Lush artificial turf backyard", span: "wide" },
        { src: "/images/turf/p1-2.jpg", alt: "Turf installation with stone border", span: "tall" },
        { src: "/images/turf/p2-1.jpg", alt: "Premium turf front yard" },
        { src: "/images/turf/p2-2.jpg", alt: "Turf and paver combination" },
        { src: "/images/turf/p2-3.jpg", alt: "Backyard turf transformation", span: "wide" },
      ]}
    />
  );
}
