"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "es";

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  /* ── Preloader / boot sequence ── */
  "boot.msg1": { en: "Preparing the ground…",        es: "Preparando el terreno…" },
  "boot.msg2": { en: "Laying the base course…",      es: "Compactando la base…" },
  "boot.msg3": { en: "Setting pavers & travertine…", es: "Colocando adoquines y travertino…" },
  "boot.msg4": { en: "Rolling out premium turf…",    es: "Extendiendo el césped premium…" },
  "boot.msg5": { en: "Firing up the BBQ…",           es: "Encendiendo el BBQ…" },
  "boot.tagline": { en: "Premium Outdoor Living · Arizona", es: "Espacios Exteriores Premium · Arizona" },

  /* ── Navbar ── */
  "nav.home":            { en: "Home",             es: "Inicio" },
  "nav.homeTagline":     { en: "Back to main page", es: "Volver a la página principal" },
  "nav.homeLink1":       { en: "Our Services",     es: "Nuestros Servicios" },
  "nav.homeLink2":       { en: "Get a Quote",      es: "Obtener Presupuesto" },
  "nav.homeLink3":       { en: "About Us",         es: "Sobre Nosotros" },
  "nav.homeLink4":       { en: "Contact",          es: "Contacto" },

  "nav.services":        { en: "Services",         es: "Servicios" },
  "nav.about":           { en: "About Us",         es: "Nosotros" },
  "nav.aboutTagline":    { en: "Meet the team behind EZ HARDSCAPE", es: "Conoce al equipo detrás de EZ HARDSCAPE" },
  "nav.aboutStat1":      { en: "8+ yrs experience", es: "8+ años de experiencia" },
  "nav.aboutStat2":      { en: "500+ projects",    es: "500+ proyectos" },
  "nav.aboutStat3":      { en: "98% satisfaction", es: "98% satisfacción" },
  "nav.aboutLink1":      { en: "Our Story",        es: "Nuestra Historia" },
  "nav.aboutLink2":      { en: "Why Choose Us",    es: "Por Qué Elegirnos" },
  "nav.aboutLink3":      { en: "Service Areas",    es: "Áreas de Servicio" },
  "nav.viewAbout":       { en: "View full profile →", es: "Ver perfil completo →" },

  "nav.contact":         { en: "Contact",          es: "Contacto" },
  "nav.contactTagline":  { en: "We reply within 24 hours", es: "Respondemos en 24 horas" },
  "nav.whatsapp":        { en: "WhatsApp Chat",    es: "Chat de WhatsApp" },
  "nav.whatsappSub":     { en: "Instant reply",    es: "Respuesta inmediata" },
  "nav.sms":             { en: "Send SMS",         es: "Enviar SMS" },
  "nav.smsSub":          { en: "Text anytime",     es: "Escribe cuando quieras" },
  "nav.email":           { en: "Email Us",         es: "Enviar Email" },
  "nav.emailSub":        { en: "For project details", es: "Para detalles del proyecto" },
  "nav.instagram":       { en: "Instagram",        es: "Instagram" },
  "nav.instagramSub":    { en: "See our latest work", es: "Ve nuestros últimos trabajos" },
  "nav.hours":           { en: "Mon–Sat · 7am – 6pm MST", es: "Lun–Sáb · 7am – 6pm MST" },

  "nav.callNow":         { en: "Call",             es: "Llamar" },
  "nav.callDirect":      { en: "Call Directly",    es: "Llamar Directamente" },
  "nav.callDirectSub":   { en: "Mon–Sat 7am–6pm",  es: "Lun–Sáb 7am–6pm" },
  "nav.whatsappCall":    { en: "WhatsApp",         es: "WhatsApp" },
  "nav.whatsappCallSub": { en: "Chat or voice call", es: "Chat o llamada de voz" },
  "nav.smsText":         { en: "Send a Text",      es: "Enviar Mensaje" },
  "nav.smsTextSub":      { en: "We reply fast",    es: "Respondemos rápido" },

  "nav.getQuote":        { en: "Get a Quote",      es: "Presupuesto" },
  "nav.ourServices":     { en: "Our Services",     es: "Nuestros Servicios" },
  "nav.notSure":         { en: "Not sure which service you need?", es: "¿No sabes qué servicio necesitas?" },
  "nav.freeConsult":     { en: "Get a free consultation", es: "Consulta gratuita" },

  /* ── Hero ── */
  "hero.badge":          { en: "Premium Outdoor Living in Arizona", es: "Espacios Exteriores Premium en Arizona" },
  "hero.headline":       { en: "Transform Your Backyard",           es: "Transforma Tu Patio" },
  "hero.subtitle":       {
    en: "Expert installation of pavers, travertine, premium turf, and custom BBQs. Elevate your home value with our modern hardscape designs.",
    es: "Instalación experta de adoquines, travertino, césped premium y BBQs personalizados. Aumenta el valor de tu hogar con diseños modernos.",
  },
  "hero.freeEstimates":  { en: "Free Estimates",      es: "Presupuestos Gratis" },
  "hero.availableNow":   { en: "Available Now",       es: "Disponible Ahora" },
  "hero.licensed":       { en: "Licensed & Insured",  es: "Licenciado y Asegurado" },
  "hero.placeholder":    {
    en: "Describe your dream project (e.g., Travertine patio, paver driveway)…",
    es: "Describe tu proyecto ideal (ej. Patio de travertino, entrada de adoquines)…",
  },
  "hero.photoAttached":  { en: "Photo attached",       es: "Foto adjunta" },
  "hero.addDesc":        { en: "add a description…",   es: "agrega una descripción…" },
  "hero.uploadPhoto":    { en: "Upload Yard Photo",    es: "Subir Foto del Patio" },
  "hero.response":       { en: "Response within 24h",  es: "Respuesta en 24h" },

  /* ── Service cards (Hero) ── */
  "service.pavers.label":       { en: "Paver Patios",           es: "Adoquines" },
  "service.pavers.desc":        { en: "Driveways, patios & walkways", es: "Entradas, patios y caminos" },
  "service.pavers.tag":         { en: "Most Popular",           es: "Más Popular" },
  "service.travertine.label":   { en: "Travertine",             es: "Travertino" },
  "service.travertine.desc":    { en: "Pool decks & luxury patios", es: "Bordes de piscina y patios de lujo" },
  "service.travertine.tag":     { en: "Premium",                es: "Premium" },
  "service.turf.label":         { en: "Premium Turf",           es: "Césped Premium" },
  "service.turf.desc":          { en: "Year-round green, zero water", es: "Verde todo el año, sin agua" },
  "service.turf.tag":           { en: "Eco-Friendly",           es: "Eco-Amigable" },
  "service.bbq.label":          { en: "Custom BBQ",             es: "BBQ Personalizado" },
  "service.bbq.desc":           { en: "Outdoor kitchens & firepits", es: "Cocinas exteriores y fogones" },
  "service.bbq.tag":            { en: "Trending",               es: "Tendencia" },

  /* ── ServicePage shared UI ── */
  "sp.badge":            { en: "EZ HARDSCAPE SERVICE",           es: "SERVICIO EZ HARDSCAPE" },
  "sp.back":             { en: "Back to Home",                   es: "Volver al Inicio" },
  "sp.whyChoose":        { en: "Why homeowners choose this",     es: "Por qué los propietarios nos eligen" },
  "sp.startingFrom":     { en: "Starting from",                 es: "Desde" },
  "sp.installedLic":     { en: "Installed · Licensed & Insured", es: "Instalado · Licenciado y Asegurado" },
  "sp.specifications":   { en: "Specifications",                es: "Especificaciones" },
  "sp.getFreeEst":       { en: "Get a Free Estimate",           es: "Obtener Presupuesto Gratis" },
  "sp.availableStyles":  { en: "Available Styles",              es: "Estilos Disponibles" },
  "sp.premiumMat":       { en: "We source only premium-grade materials from certified suppliers.", es: "Solo utilizamos materiales de calidad premium de proveedores certificados." },
  "sp.gallery":          { en: "Project Gallery",               es: "Galería de Proyectos" },
  "sp.realProjects":     { en: "Real Arizona projects completed by our crew.", es: "Proyectos reales en Arizona completados por nuestro equipo." },
  "sp.ctaTitle":         { en: "Ready to transform your outdoor space?", es: "¿Listo para transformar tu espacio exterior?" },
  "sp.ctaDesc":          { en: "Get a free, no-obligation estimate from our team. Serving Mesa, Phoenix & Scottsdale.", es: "Obtén un presupuesto gratuito sin compromiso. Servimos Mesa, Phoenix y Scottsdale." },
  "sp.ctaBtn":           { en: "Get My Free Estimate",          es: "Obtener Mi Presupuesto" },

  /* ── Floating button ── */
  "fab.chat":            { en: "Chat with us",    es: "Chatea con nosotros" },
  "fab.whatsapp":        { en: "WhatsApp",        es: "WhatsApp" },
  "fab.sms":             { en: "Send SMS",        es: "Enviar SMS" },
  "fab.call":            { en: "Call Now",        es: "Llamar Ahora" },

  /* ── About page ── */
  "about.badge":         { en: "ABOUT THE COMPANY",            es: "SOBRE LA EMPRESA" },
  "about.h1a":           { en: "Built on Craft,",              es: "Construidos con Oficio," },
  "about.h1b":           { en: "Driven by Results.",           es: "Impulsados por Resultados." },
  "about.stat1":         { en: "Years of Experience",          es: "Años de Experiencia" },
  "about.stat2":         { en: "Projects Completed",           es: "Proyectos Completados" },
  "about.stat3":         { en: "Client Satisfaction",          es: "Satisfacción del Cliente" },
  "about.stat4":         { en: "Cities Served",                es: "Ciudades Atendidas" },
  "about.story.h2":      { en: "Our Story",                   es: "Nuestra Historia" },
  "about.story.p1":      {
    en: "EZ HARDSCAPE was founded with one belief: Arizona homeowners deserve outdoor spaces that are as beautiful as the desert landscape that surrounds them — and built to survive it. Our founder started in the trades with a simple shovel and a commitment to doing things right, and grew the company project by project through word-of-mouth and reputation alone.",
    es: "EZ HARDSCAPE fue fundada con una sola convicción: los propietarios de Arizona merecen espacios exteriores tan hermosos como el paisaje desértico que los rodea — y construidos para sobrevivirlo. Nuestro fundador comenzó en el oficio con una simple pala y el compromiso de hacer las cosas bien, y creció la empresa proyecto a proyecto, solo a través del boca a boca y la reputación.",
  },
  "about.story.p2":      {
    en: "Today we serve homeowners across Mesa, Phoenix, and Scottsdale, specializing in paver installation, travertine, artificial turf, and custom outdoor kitchens. Every project is personally overseen by our lead crew to ensure it meets our standards — not just industry minimums.",
    es: "Hoy servimos a propietarios en Mesa, Phoenix y Scottsdale, especializándonos en instalación de adoquines, travertino, césped artificial y cocinas exteriores personalizadas. Cada proyecto es supervisado personalmente por nuestro equipo principal para garantizar que cumpla nuestros estándares — no solo los mínimos de la industria.",
  },
  "about.story.p3":      {
    en: "We work with Arizona's climate, not against it. Our material selections, base preparation methods, and installation techniques are all calibrated for desert heat, monsoon season, and the extreme temperature swings that crack lesser installations after a few years.",
    es: "Trabajamos con el clima de Arizona, no contra él. Nuestras selecciones de materiales, métodos de preparación de base y técnicas de instalación están calibrados para el calor del desierto, la temporada de monzones y los extremos cambios de temperatura que agrietan instalaciones de menor calidad en pocos años.",
  },
  "about.values.h2":     { en: "Why Choose EZ HARDSCAPE",     es: "Por Qué Elegir EZ HARDSCAPE" },
  "about.values.sub":    { en: "The difference is in the details — and the decade-long warranty that backs them up.", es: "La diferencia está en los detalles — y la garantía de una década que los respalda." },
  "about.val1.title":    { en: "Craftsmanship First",          es: "La Artesanía es lo Primero" },
  "about.val1.body":     { en: "Every joint, every cut, every seam is done with precision. We don't rush — we do it right the first time so it lasts decades.", es: "Cada junta, cada corte, cada costura se realiza con precisión. No nos apresuramos — lo hacemos bien a la primera para que dure décadas." },
  "about.val2.title":    { en: "Fully Licensed & Insured",     es: "Totalmente Licenciado y Asegurado" },
  "about.val2.body":     { en: "Licensed contractor in the state of Arizona. Every project is fully permitted where required, and our crew carries full liability and workers' comp insurance.", es: "Contratista licenciado en el estado de Arizona. Cada proyecto cuenta con los permisos requeridos, y nuestro equipo tiene seguro completo de responsabilidad y compensación laboral." },
  "about.val3.title":    { en: "Transparent Pricing",          es: "Precios Transparentes" },
  "about.val3.body":     { en: "Written quotes, no hidden fees. We explain every line item — materials, labor, equipment — before work begins. No surprises at the end.", es: "Cotizaciones escritas, sin cargos ocultos. Explicamos cada partida — materiales, mano de obra, equipo — antes de comenzar. Sin sorpresas al final." },
  "about.val4.title":    { en: "Local Arizona Expertise",      es: "Experiencia Local en Arizona" },
  "about.val4.body":     { en: "We understand desert conditions: extreme heat, freeze cycles, caliche soil. Our installation methods are specifically adapted for Arizona's unique climate.", es: "Entendemos las condiciones del desierto: calor extremo, ciclos de heladas, suelo de caliche. Nuestros métodos de instalación están adaptados específicamente para el clima único de Arizona." },
  "about.val5.title":    { en: "Premium Materials Only",       es: "Solo Materiales Premium" },
  "about.val5.body":     { en: "We source travertine, pavers, and turf from certified suppliers. No budget materials that look good in photos but fail in two summers.", es: "Obtenemos travertino, adoquines y césped de proveedores certificados. Sin materiales económicos que luzcan bien en fotos pero fallen en dos veranos." },
  "about.val6.title":    { en: "Guaranteed Workmanship",       es: "Mano de Obra Garantizada" },
  "about.val6.body":     { en: "10-year craftsmanship warranty on all hardscape projects. If anything fails due to our installation, we fix it — no questions asked.", es: "Garantía de mano de obra de 10 años en todos los proyectos de hardscape. Si algo falla por nuestra instalación, lo arreglamos — sin preguntas." },
  "about.test.h2":       { en: "What Our Clients Say",         es: "Lo Que Dicen Nuestros Clientes" },
  "about.test.sub":      { en: "Real reviews from real Arizona homeowners.", es: "Reseñas reales de propietarios de Arizona." },
  "about.t1.text":       { en: "EZ Hardscape transformed our backyard from a dirt lot to an absolute paradise. The travertine pool deck is gorgeous and everyone who visits asks who did the work. Highly recommend!", es: "EZ Hardscape transformó nuestro patio trasero de un lote de tierra a un paraíso absoluto. La cubierta de travertino de la piscina es preciosa y todos los que visitan preguntan quién hizo el trabajo. ¡Muy recomendado!" },
  "about.t1.service":    { en: "Travertine Pool Deck",         es: "Cubierta de Travertino" },
  "about.t2.text":       { en: "We had 3 other quotes before EZ. They came in competitively priced AND had the most professional crew. The paver driveway was done in 4 days and looks incredible. Best decision we made.", es: "Tuvimos 3 presupuestos antes de EZ. Llegaron con precio competitivo Y tenían el equipo más profesional. La entrada de adoquines se hizo en 4 días y luce increíble. La mejor decisión que tomamos." },
  "about.t2.service":    { en: "Paver Driveway",               es: "Entrada de Adoquines" },
  "about.t3.text":       { en: "The artificial turf has literally changed our lives. No more watering, no dead patches in summer, and the dogs love it. The installation crew was clean, fast, and professional.", es: "El césped artificial ha cambiado literalmente nuestras vidas. Sin más riego, sin manchas secas en verano, y los perros lo adoran. El equipo de instalación fue limpio, rápido y profesional." },
  "about.t3.service":    { en: "Premium Turf Installation",    es: "Instalación de Césped Premium" },
  "about.t4.text":       { en: "Our outdoor kitchen with the BBQ island is the envy of the neighborhood. EZ Hardscape handled everything — permits, gas line, countertops. Turnkey and perfect.", es: "Nuestra cocina exterior con la isla BBQ es la envidia del vecindario. EZ Hardscape manejó todo — permisos, línea de gas, encimeras. Llave en mano y perfecto." },
  "about.t4.service":    { en: "Custom Outdoor Kitchen",       es: "Cocina Exterior Personalizada" },
  "about.areas.h2":      { en: "Service Areas",                es: "Áreas de Servicio" },
  "about.areas.sub":     { en: "We proudly serve the greater Phoenix metro area.", es: "Servimos con orgullo al área metropolitana del Gran Phoenix." },
  "about.cta.h2":        { en: "Ready to start your project?", es: "¿Listo para comenzar tu proyecto?" },
  "about.cta.desc":      { en: "Get a free, no-obligation estimate. We respond within 24 hours.", es: "Obtén un presupuesto gratuito sin compromiso. Respondemos en 24 horas." },
  "about.cta.btn":       { en: "Get My Free Estimate",         es: "Obtener Mi Presupuesto Gratis" },

  /* ── Contact page ── */
  "contact.badge":       { en: "GET IN TOUCH",                 es: "CONTÁCTANOS" },
  "contact.h1":          { en: "Let's Build Something Great",  es: "Construyamos Algo Grande" },
  "contact.sub":         { en: "Reach us through any channel you prefer. We respond to every message within 24 hours.", es: "Contáctanos por el canal que prefieras. Respondemos cada mensaje en menos de 24 horas." },
  "contact.wa.label":    { en: "WhatsApp",                     es: "WhatsApp" },
  "contact.wa.sub":      { en: "Chat instantly — we reply fast", es: "Chat instantáneo — respondemos rápido" },
  "contact.wa.cta":      { en: "Start Chat",                   es: "Iniciar Chat" },
  "contact.ig.label":    { en: "Instagram",                    es: "Instagram" },
  "contact.ig.sub":      { en: "See our latest projects & reels", es: "Ve nuestros últimos proyectos y reels" },
  "contact.ig.cta":      { en: "Follow Us",                    es: "Síguenos" },
  "contact.fb.label":    { en: "Facebook",                     es: "Facebook" },
  "contact.fb.sub":      { en: "Reviews, photos, and updates", es: "Reseñas, fotos y novedades" },
  "contact.fb.cta":      { en: "Visit Page",                   es: "Visitar Página" },
  "contact.email.label": { en: "Email",                        es: "Correo" },
  "contact.email.sub":   { en: "For detailed project inquiries", es: "Para consultas detalladas del proyecto" },
  "contact.email.cta":   { en: "Send Email",                   es: "Enviar Correo" },
  "contact.sms.label":   { en: "SMS / Text",                   es: "SMS / Texto" },
  "contact.sms.sub":     { en: "Text us any time",             es: "Escríbenos cuando quieras" },
  "contact.sms.cta":     { en: "Send Text",                    es: "Enviar Texto" },
  "contact.call.label":  { en: "Call Directly",                es: "Llamar Directamente" },
  "contact.call.sub":    { en: "Mon–Sat · 7am – 6pm MST",     es: "Lun–Sáb · 7am – 6pm MST" },
  "contact.call.cta":    { en: "Call Now",                     es: "Llamar Ahora" },
  "contact.form.h2":     { en: "Prefer a structured quote request?", es: "¿Prefieres una solicitud de presupuesto estructurada?" },
  "contact.form.desc":   { en: "Fill out our project form — upload photos, describe your space, and choose how we contact you back.", es: "Rellena nuestro formulario de proyecto — sube fotos, describe tu espacio y elige cómo contactamos contigo." },
  "contact.form.btn":    { en: "Fill Out Project Form",        es: "Completar Formulario" },

  /* ── Quote page ── */
  "quote.back":          { en: "Back to Home",                 es: "Volver al Inicio" },
  "quote.h1":            { en: "Get Your Free Estimate",       es: "Obtén Tu Presupuesto Gratis" },
  "quote.sub":           { en: "Fill in the details below and choose how you'd like us to reach you. We reply within 24 hours.", es: "Completa los datos y elige cómo quieres que te contactemos. Respondemos en 24 horas." },
  "quote.s1":            { en: "1. Your Contact Info",         es: "1. Tu Información de Contacto" },
  "quote.s2":            { en: "2. What Are You Looking For?", es: "2. ¿Qué Estás Buscando?" },
  "quote.s3":            { en: "3. Approximate Budget",        es: "3. Presupuesto Aproximado" },
  "quote.s4":            { en: "4. Describe Your Project",     es: "4. Describe Tu Proyecto" },
  "quote.s5":            { en: "5. How Should We Reach You?",  es: "5. ¿Cómo Debemos Contactarte?" },
  "quote.name":          { en: "Full Name *",                  es: "Nombre Completo *" },
  "quote.phone":         { en: "Phone Number",                 es: "Número de Teléfono" },
  "quote.email":         { en: "Email Address",                es: "Correo Electrónico" },
  "quote.address":       { en: "Project Address / City",       es: "Dirección del Proyecto / Ciudad" },
  "quote.svc1":          { en: "Paver Patios",                 es: "Patios de Adoquines" },
  "quote.svc2":          { en: "Travertine",                   es: "Travertino" },
  "quote.svc3":          { en: "Premium Turf",                 es: "Césped Premium" },
  "quote.svc4":          { en: "Custom BBQ / Firepit",         es: "BBQ / Fogón Personalizado" },
  "quote.svc5":          { en: "Full Backyard Design",         es: "Diseño Completo del Patio" },
  "quote.svc6":          { en: "Other",                        es: "Otro" },
  "quote.bud1":          { en: "Under $5,000",                 es: "Menos de $5,000" },
  "quote.bud2":          { en: "$5,000 – $15,000",             es: "$5,000 – $15,000" },
  "quote.bud3":          { en: "$15,000 – $30,000",            es: "$15,000 – $30,000" },
  "quote.bud4":          { en: "$30,000 – $60,000",            es: "$30,000 – $60,000" },
  "quote.bud5":          { en: "$60,000+",                     es: "$60,000+" },
  "quote.bud6":          { en: "Not sure yet",                 es: "Aún no lo sé" },
  "quote.descPlaceholder": { en: "Tell us about your space — size, current condition, what you'd like to change, any inspiration photos you've seen…", es: "Cuéntanos sobre tu espacio — tamaño, estado actual, qué te gustaría cambiar, fotos de inspiración que hayas visto…" },
  "quote.upload":        { en: "Upload a photo of your yard or space (optional)", es: "Sube una foto de tu patio o espacio (opcional)" },
  "quote.attachNote":    { en: "· When you submit, attach this photo to your message", es: "· Al enviar, adjunta esta foto a tu mensaje" },
  "quote.submit":        { en: "Submit My Project Request",    es: "Enviar Mi Solicitud de Proyecto" },
  "quote.footer":        { en: "We respond within 24 hours · Licensed & Insured · Mesa, Phoenix & Scottsdale", es: "Respondemos en 24 horas · Licenciado y Asegurado · Mesa, Phoenix & Scottsdale" },
  "quote.warn.social":   { en: "We'll open our page — please send us a DM there with your project details.", es: "Abriremos nuestra página — envíanos un mensaje directo con los detalles de tu proyecto." },
  "quote.warn.photo":    { en: "Don't forget to attach your yard photo to the message.", es: "No olvides adjuntar tu foto del patio al mensaje." },
  "quote.err.name":      { en: "Name is required",             es: "El nombre es obligatorio" },
  "quote.err.contact":   { en: "Phone or email is required",   es: "Teléfono o correo es obligatorio" },
  "quote.err.services":  { en: "Select at least one service",  es: "Selecciona al menos un servicio" },
  "quote.err.method":    { en: "Choose how you want us to reach you", es: "Elige cómo quieres que te contactemos" },
  "quote.success.h1":    { en: "You're all set!",              es: "¡Todo listo!" },
  "quote.success.sub":   { en: "Opening your selected contact channel now. We look forward to working with you!", es: "Abriendo tu canal de contacto seleccionado. ¡Esperamos trabajar contigo!" },
  "quote.success.back":  { en: "Back to Home",                 es: "Volver al Inicio" },
  "quote.method.wa":     { en: "WhatsApp",                     es: "WhatsApp" },
  "quote.method.email":  { en: "Email",                        es: "Correo" },
  "quote.method.sms":    { en: "SMS / Text",                   es: "SMS / Texto" },
  "quote.method.ig":     { en: "Instagram",                    es: "Instagram" },
  "quote.method.fb":     { en: "Facebook",                     es: "Facebook" },
  "quote.method.call":   { en: "Call Me",                      es: "Llámame" },
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang((prev) => (prev === "en" ? "es" : "en"));
  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] ?? key;
  };
  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
