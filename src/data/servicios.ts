/** Los cuatro servicios del estudio.
 *
 * `slug` hace tres trabajos a la vez: es el ancla dentro de /servicios, el
 * valor de `?servicio=` que preselecciona el formulario y la opción del
 * select de contacto. Si cambia, cambian los tres.
 */
export type Servicio = {
  num: string
  slug: string
  nombre: string
  /** Promesa en una línea, va en serif bajo el título. */
  lead: string
  /** Corto, para el anillo de la home. */
  resumen: string
  /** Ejemplos, no el catálogo completo. */
  tags: string[]
  imagen: string
  alt: string
}

export const servicios: Servicio[] = [
  {
    num: "01",
    slug: "web",
    nombre: "Diseño web especializado",
    lead: "Webs pensadas para vender, enseñar e inscribir.",
    resumen: "Tiendas, colegios y e-learning",
    tags: [
      "Tiendas virtuales",
      "Webs para colegios",
      "Plataformas e-learning",
      "Sistema de inscripciones",
      "Gestión de fotos y videos",
    ],
    imagen: "/img/servicio-web.webp",
    alt: "Pantallas con código y diseño de una web en desarrollo",
  },
  {
    num: "02",
    slug: "software",
    nombre: "Software a medida",
    lead: "Tu operación, todo en un solo lugar.",
    resumen: "CRM y sistemas de gestión",
    tags: [
      "CRM para tu equipo comercial",
      "Sistemas para restaurantes con facturación",
      "Plataformas para empresas de educación",
      "Integraciones con tus herramientas",
    ],
    imagen: "/img/servicio-software.webp",
    alt: "Laptop con un sistema de gestión que muestra calendario, archivos y métricas",
  },
  {
    num: "03",
    slug: "innovacion",
    nombre: "Programas de innovación",
    lead: "Hackathons y retos para estudiantes emprendedores.",
    resumen: "Hackathons y retos",
    tags: [
      "Hackathons",
      "Retos de innovación para estudiantes",
      "Mentorías y evaluación de proyectos",
    ],
    imagen: "/img/servicio-innovacion.webp",
    alt: "Equipo organizando ideas con notas adhesivas en un taller",
  },
  {
    num: "04",
    slug: "ia",
    nombre: "Automatización con IA",
    lead: "Te enseñamos a conectar las IA y ponerlas a trabajar.",
    resumen: "Implementa IA en tu empresa",
    tags: [
      "ChatGPT, Claude y otras IA conectadas a tus procesos",
      "Imágenes con IA",
      "Videos con IA",
      "Capacitación para tu equipo",
    ],
    imagen: "/img/servicio-ia.webp",
    alt: "Diagrama de una consulta procesada por Claude y convertida en un documento",
  },
]

/** Opciones del select de contacto: los cuatro servicios, el pack y la salida
 *  para quien todavía no sabe qué pedir. */
export const opcionesContacto = [
  ...servicios.map((s) => ({ valor: s.slug, etiqueta: s.nombre })),
  { valor: "pack", etiqueta: "Pack Impulso Digital" },
  { valor: "orientacion", etiqueta: "Necesito orientación" },
]
