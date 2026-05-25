import ServicePage from "@/components/sections/ServicePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Outdoor BBQ & Kitchen | EZ HARDSCAPE Arizona",
  description:
    "Custom-built outdoor kitchens, BBQ islands, and firepits in Mesa, Phoenix & Scottsdale. Licensed contractors, premium appliances, turn-key installations.",
};

export default function BBQPage() {
  return (
    <ServicePage
      accentColor="#C0392B"
      title="Custom BBQ & Firepits"
      titleEs="BBQ y Fogones Personalizados"
      tagline="Arizona's ultimate outdoor entertaining upgrade — a kitchen and firepit that becomes the heart of your home."
      taglineEs="La mejora definitiva para el entretenimiento al aire libre en Arizona — una cocina y fogón que se convierte en el corazón de tu hogar."
      description="Arizona's mild winters and outdoor lifestyle make an outdoor kitchen one of the highest-ROI investments a homeowner can make. We design and build completely custom BBQ islands and firepits using structural concrete block frames veneered with natural stone, travertine, or stucco — built to withstand decades of Phoenix heat. Every installation is coordinated with licensed electricians and plumbers for gas lines, GFCI outlets, and under-counter refrigeration. We spec premium brands like Lion, Blaze, and Napoleon, and handle every permit required by Maricopa County."
      descriptionEs="Los inviernos suaves de Arizona y el estilo de vida al aire libre hacen que una cocina exterior sea una de las inversiones con mayor retorno que puede hacer un propietario. Diseñamos y construimos islas de BBQ y fogones completamente personalizados usando marcos de bloque de concreto estructural enchapados con piedra natural, travertino o estuco — construidos para resistir décadas del calor de Phoenix. Cada instalación se coordina con electricistas y plomeros licenciados para líneas de gas, tomacorrientes GFCI y refrigeración bajo el mostrador."
      heroImage="/images/bbq/bbq-1.jpg"
      priceRange="$8,500 – $45,000+"
      benefits={[
        "Increases home value by an average of $10,000–$20,000 (NAR data)",
        "Licensed electrical & gas work included — fully permitted",
        "100% custom: any shape, countertop, appliance, or veneer",
        "Built with concrete block — no wood rot or termite risk",
        "Coordinate with travertine or paver projects for a unified look",
        "Arizona's 300+ outdoor dining days make this a year-round asset",
      ]}
      benefitsEs={[
        "Aumenta el valor del hogar en promedio $10,000–$20,000 (datos NAR)",
        "Trabajo eléctrico y de gas licenciado incluido — completamente permitido",
        "100% personalizado: cualquier forma, encimera, electrodoméstico o enchapado",
        "Construido con bloque de concreto — sin riesgo de podredumbre o termitas",
        "Coordina con proyectos de travertino o adoquines para un aspecto unificado",
        "Los 300+ días de comedor al aire libre de Arizona lo hacen un activo todo el año",
      ]}
      specs={[
        { label: "Frame Construction", value: "Concrete masonry block (CMU)" },
        { label: "Veneer Options", value: "Stone, Travertine, Stucco, Tile" },
        { label: "Countertops", value: "Granite, Quartzite, Concrete, Tile" },
        { label: "Appliances", value: "Lion, Blaze, Napoleon, Weber" },
        { label: "Utilities", value: "Gas, Electric (GFCI), Water/Drain" },
        { label: "Permitting", value: "Maricopa County — fully permitted" },
        { label: "Build Time", value: "3–6 weeks from design sign-off" },
        { label: "Warranty", value: "5-year structural + appliance mfg." },
      ]}
      specsEs={[
        { label: "Construcción del Marco", value: "Bloque de mampostería de concreto (CMU)" },
        { label: "Opciones de Enchapado", value: "Piedra, Travertino, Estuco, Azulejo" },
        { label: "Encimeras", value: "Granito, Cuarcita, Concreto, Azulejo" },
        { label: "Electrodomésticos", value: "Lion, Blaze, Napoleon, Weber" },
        { label: "Servicios", value: "Gas, Eléctrico (GFCI), Agua/Desagüe" },
        { label: "Permisos", value: "Condado de Maricopa — completamente permitido" },
        { label: "Tiempo de Construcción", value: "3–6 semanas desde aprobación del diseño" },
        { label: "Garantía", value: "5 años estructural + fabricante de electrodomésticos" },
      ]}
      variants={[
        {
          name: "L-Shape BBQ Island",
          nameEs: "Isla BBQ en Forma de L",
          img: "/images/bbq/bbq-2.jpg",
          desc: "Most popular layout — grill + side burner + refrigerator + sink. Seats up to 8.",
          descEs: "El diseño más popular — parrilla + quemador lateral + refrigerador + fregadero. Asientos para 8.",
        },
        {
          name: "Straight Bar Island",
          nameEs: "Isla de Barra Recta",
          img: "/images/bbq/bbq-4.jpg",
          desc: "Sleek single-run design — ideal for smaller patios or modern minimalist homes.",
          descEs: "Diseño lineal elegante — ideal para patios pequeños o casas minimalistas modernas.",
        },
        {
          name: "Firepit & Seating Wall",
          nameEs: "Fogón y Muro de Asientos",
          img: "/images/bbq/bbq-6.jpg",
          desc: "Custom masonry firepit with matching curved seating wall. Gas or wood-burning.",
          descEs: "Fogón de mampostería personalizado con muro de asientos curvado a juego. Gas o leña.",
        },
        {
          name: "Full Outdoor Kitchen",
          nameEs: "Cocina Exterior Completa",
          img: "/images/bbq/bbq-8.jpg",
          desc: "Complete U-shape with pizza oven, bar seating, pergola integration, and lighting.",
          descEs: "Forma de U completa con horno de pizza, asientos de barra, integración de pérgola e iluminación.",
        },
      ]}
      gallery={[
        { src: "/images/bbq/bbq-3.jpg", alt: "Custom BBQ island with stone veneer", span: "wide" },
        { src: "/images/bbq/bbq-5.jpg", alt: "Full outdoor kitchen with bar seating", span: "tall" },
        { src: "/images/bbq/bbq-7.jpg", alt: "Outdoor BBQ area at dusk" },
        { src: "/images/bbq/bbq-9.jpg", alt: "Stone veneer BBQ island" },
        { src: "/images/bbq/bbq-2.jpg", alt: "Complete outdoor entertaining space", span: "wide" },
        { src: "/images/bbq/bbq-4.jpg", alt: "BBQ island detail" },
        { src: "/images/bbq/bbq-6.jpg", alt: "Custom firepit with seating wall" },
      ]}
    />
  );
}
