import ServicePage from "@/components/sections/ServicePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paver Patios & Driveways | EZ HARDSCAPE Arizona",
  description:
    "Premium paver installation for patios, driveways, pool decks and walkways in Mesa, Phoenix & Scottsdale. Expert crew, licensed & insured.",
};

export default function PaversPage() {
  return (
    <ServicePage
      accentColor="#8B6914"
      title="Paver Patios"
      titleEs="Patios de Adoquines"
      tagline="Durable, beautiful surfaces that hold up to Arizona's heat — and boost your home's curb appeal."
      taglineEs="Superficies duraderas y hermosas que resisten el calor de Arizona y aumentan el valor de tu hogar."
      description="Pavers are the gold standard for outdoor surfaces in Arizona. Unlike poured concrete that cracks under our extreme heat cycles, individual pavers flex and move independently — which means no ugly stress fractures. Whether you're building a grand driveway, a shaded patio, or an inviting pool deck, our crew handles every phase: base preparation, sand leveling, precision laying, and polymeric sand jointing for a weed-resistant, long-lasting finish."
      descriptionEs="Los adoquines son el estándar de oro para superficies exteriores en Arizona. A diferencia del concreto colado que se agrieta bajo los ciclos de calor extremo, los adoquines individuales se flexionan de forma independiente, eliminando las grietas. Ya sea una entrada, un patio sombreado o un borde de piscina, nuestro equipo maneja cada fase: preparación de base, nivelación de arena, colocación de precisión y sellado de juntas con arena polimérica."
      heroImage="/images/pavers/p1-1.jpg"
      priceRange="$18–$45 / sq ft"
      benefits={[
        "No cracking — individual units flex independently in heat",
        "Easy repair: replace single pavers, not the entire surface",
        "Slip-resistant textures ideal for Arizona pool decks",
        "Adds 5–15% to resale value according to NAR studies",
        "Endless color & pattern combinations",
        "Permeable options available to reduce runoff",
      ]}
      benefitsEs={[
        "Sin grietas — cada adoquín se flexiona de forma independiente",
        "Reparación fácil: reemplaza piezas individuales, no toda la superficie",
        "Texturas antideslizantes ideales para bordes de piscina en Arizona",
        "Agrega 5–15% al valor de reventa según estudios de la NAR",
        "Infinitas combinaciones de colores y patrones",
        "Opciones permeables disponibles para reducir escorrentía",
      ]}
      specs={[
        { label: "Material", value: "Concrete, Natural Stone, Clay Brick" },
        { label: "Thickness", value: "2.375\" – 3.5\" (traffic-rated)" },
        { label: "Base Depth", value: "6–8\" compacted gravel base" },
        { label: "Joint Fill", value: "Polymeric sand (weed-resistant)" },
        { label: "Load Rating", value: "Up to 8,000 lbs / sq ft" },
        { label: "Warranty", value: "10-year craftsmanship guarantee" },
        { label: "Lead Time", value: "2–4 weeks from design approval" },
        { label: "Service Area", value: "Mesa, Phoenix, Scottsdale, Tempe" },
      ]}
      specsEs={[
        { label: "Material", value: "Concreto, Piedra Natural, Ladrillo" },
        { label: "Grosor", value: "2.375\" – 3.5\" (grado tráfico)" },
        { label: "Prof. de Base", value: "15–20 cm de grava compactada" },
        { label: "Relleno de Juntas", value: "Arena polimérica (anti-maleza)" },
        { label: "Carga Máx.", value: "Hasta 8,000 lbs / pie²" },
        { label: "Garantía", value: "10 años de garantía de mano de obra" },
        { label: "Tiempo de Entrega", value: "2–4 semanas desde aprobación" },
        { label: "Área de Servicio", value: "Mesa, Phoenix, Scottsdale, Tempe" },
      ]}
      variants={[
        {
          name: "Concrete Pavers",
          nameEs: "Adoquines de Concreto",
          img: "/images/pavers/p1-3.jpg",
          desc: "Most versatile option — dozens of colors, finishes, and interlocking patterns.",
          descEs: "La opción más versátil — docenas de colores, acabados y patrones entrelazados.",
        },
        {
          name: "Natural Stone",
          nameEs: "Piedra Natural",
          img: "/images/pavers/p1-4.jpg",
          desc: "Premium look with organic variation in each piece. Perfect for luxury patios.",
          descEs: "Apariencia premium con variación orgánica en cada pieza. Ideal para patios de lujo.",
        },
        {
          name: "Brick Pavers",
          nameEs: "Adoquines de Ladrillo",
          img: "/images/pavers/gen-2.jpg",
          desc: "Classic warm tones that age beautifully. Perfect for traditional homes.",
          descEs: "Tonos cálidos clásicos que envejecen hermosamente. Ideal para casas tradicionales.",
        },
        {
          name: "Large Format",
          nameEs: "Formato Grande",
          img: "/images/pavers/gen-7.jpg",
          desc: "Modern oversized slabs for a sleek, contemporary outdoor aesthetic.",
          descEs: "Losas modernas de gran formato para una estética exterior contemporánea y elegante.",
        },
      ]}
      gallery={[
        { src: "/images/pavers/p1-2.jpg", alt: "Paver patio project", span: "wide" },
        { src: "/images/pavers/p1-5.jpg", alt: "Paver driveway detail", span: "tall" },
        { src: "/images/pavers/p1-6.jpg", alt: "Backyard paver installation" },
        { src: "/images/pavers/gen-4.jpg", alt: "Paver walkway" },
        { src: "/images/pavers/gen-6.jpg", alt: "Paver patio with seating area", span: "wide" },
        { src: "/images/pavers/gen-8.jpg", alt: "Paver border detail" },
        { src: "/images/pavers/gen-9.jpg", alt: "Complete paver project" },
      ]}
    />
  );
}
