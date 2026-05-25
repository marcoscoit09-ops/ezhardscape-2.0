import ServicePage from "@/components/sections/ServicePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travertine Pool Decks & Patios | EZ HARDSCAPE Arizona",
  description:
    "Natural travertine installation for pool decks, patios, and outdoor living areas in Mesa, Phoenix & Scottsdale. Cool to the touch, elegant, and durable.",
};

export default function TravertinePage() {
  return (
    <ServicePage
      accentColor="#C2844A"
      title="Travertine"
      titleEs="Travertino"
      tagline="The stone of choice for Arizona luxury homes — naturally cool underfoot, timeless in appearance."
      taglineEs="La piedra preferida para las casas de lujo en Arizona — naturalmente fresca bajo los pies y atemporal en apariencia."
      description="Travertine is a natural limestone formed by mineral springs that has been used in construction for thousands of years — from the Colosseum in Rome to the finest estates in Scottsdale. Its unique cellular structure makes it naturally porous and surprisingly cool underfoot, even under Arizona's relentless sun. We install travertine for pool decks, patios, outdoor kitchens, and entryways using a full mortar bed system over a properly prepared concrete sub-base, ensuring stability and longevity in our extreme desert climate."
      descriptionEs="El travertino es una piedra caliza natural formada por manantiales minerales, utilizada en construcción desde hace miles de años — desde el Coliseo de Roma hasta las mejores propiedades de Scottsdale. Su estructura celular única lo hace naturalmente poroso y sorprendentemente fresco bajo los pies, incluso bajo el implacable sol de Arizona. Instalamos travertino en bordes de piscina, patios, cocinas exteriores y entradas usando un sistema de cama de mortero completo sobre una sub-base de concreto correctamente preparada."
      heroImage="/images/travertine/p1-1.jpg"
      priceRange="$22–$55 / sq ft"
      benefits={[
        "Stays 20–30°F cooler than concrete under direct Arizona sun",
        "Natural slip-resistance — perfect for wet pool surrounds",
        "Unique veining means no two installations look the same",
        "Heat-resistant: won't expand and crack in 115°F summers",
        "Timeless aesthetic that appeals to luxury home buyers",
        "Can be resealed and restored decades later",
      ]}
      benefitsEs={[
        "Permanece 20–30°F más fresco que el concreto bajo el sol directo de Arizona",
        "Resistencia antideslizante natural — perfecto para bordes de piscina húmedos",
        "Las vetas únicas hacen que no haya dos instalaciones iguales",
        "Resistente al calor: no se expande ni agrieta en veranos de 115°F",
        "Estética atemporal que atrae a compradores de casas de lujo",
        "Puede ser resellado y restaurado décadas después",
      ]}
      specs={[
        { label: "Material", value: "Natural Limestone (Travertine)" },
        { label: "Finish Options", value: "Tumbled, Honed, Brushed, Polished" },
        { label: "Thickness", value: "1.25\" – 2\" (pool deck rated)" },
        { label: "Installation", value: "Full mortar bed over concrete slab" },
        { label: "Surface Temp", value: "30°F cooler than dark concrete" },
        { label: "Slip Rating", value: "DCOF ≥ 0.42 (ADA compliant)" },
        { label: "Sealer", value: "Penetrating impregnator (water & oil)" },
        { label: "Warranty", value: "10-year craftsmanship guarantee" },
      ]}
      specsEs={[
        { label: "Material", value: "Caliza Natural (Travertino)" },
        { label: "Opciones de Acabado", value: "Tumblado, Mate, Cepillado, Pulido" },
        { label: "Grosor", value: "3.2 cm – 5 cm (grado borde de piscina)" },
        { label: "Instalación", value: "Cama de mortero completa sobre losa de concreto" },
        { label: "Temp. Superficie", value: "30°F más fresco que concreto oscuro" },
        { label: "Índice Antidesl.", value: "DCOF ≥ 0.42 (cumple ADA)" },
        { label: "Sellador", value: "Impregnador penetrante (agua y aceite)" },
        { label: "Garantía", value: "10 años de garantía de mano de obra" },
      ]}
      variants={[
        {
          name: "Tumbled Travertine",
          nameEs: "Travertino Tumblado",
          img: "/images/travertine/p1-2.jpg",
          desc: "Rounded edges and a weathered look — rustic, warm, and slip-resistant.",
          descEs: "Bordes redondeados y aspecto envejecido — rústico, cálido y antideslizante.",
        },
        {
          name: "Honed Travertine",
          nameEs: "Travertino Pulido Mate",
          img: "/images/travertine/p2-1.jpg",
          desc: "Smooth matte finish — modern and sophisticated for contemporary homes.",
          descEs: "Acabado liso mate — moderno y sofisticado para hogares contemporáneos.",
        },
        {
          name: "Brushed Travertine",
          nameEs: "Travertino Cepillado",
          img: "/images/travertine/p2-2.jpg",
          desc: "Textured surface with an aged appearance — excellent grip for pool areas.",
          descEs: "Superficie texturizada con apariencia envejecida — excelente agarre para áreas de piscina.",
        },
        {
          name: "French Pattern",
          nameEs: "Patrón Francés",
          img: "/images/travertine/p3-1.jpg",
          desc: "Four-tile repeating pattern of varying sizes — elegant European aesthetic.",
          descEs: "Patrón repetido de cuatro piezas de tamaños variables — elegante estética europea.",
        },
      ]}
      gallery={[
        { src: "/images/travertine/p1-3.jpg", alt: "Travertine pool deck project", span: "wide" },
        { src: "/images/travertine/p1-4.jpg", alt: "Travertine patio detail", span: "tall" },
        { src: "/images/travertine/p2-3.jpg", alt: "Luxury travertine installation" },
        { src: "/images/travertine/p2-4.jpg", alt: "Travertine pool surround" },
        { src: "/images/travertine/p2-5.jpg", alt: "Travertine outdoor space", span: "wide" },
        { src: "/images/travertine/p3-2.jpg", alt: "Travertine patio with landscaping" },
        { src: "/images/travertine/p3-3.jpg", alt: "Travertine walkway detail" },
        { src: "/images/travertine/p3-4.jpg", alt: "Complete travertine project" },
      ]}
    />
  );
}
