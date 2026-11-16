/** Navegación del sitio, igual que en el prototipo.
 *
 * El número es parte del diseño del menú móvil, no un detalle de la vista:
 * si se agrega un ítem, se renumera acá y no en el componente.
 */
export type Enlace = {
  num: string
  etiqueta: string
  href: string
}

export const navegacion: Enlace[] = [
  { num: "01", etiqueta: "Servicios", href: "/servicios" },
  { num: "02", etiqueta: "Nosotros", href: "/nosotros" },
  { num: "03", etiqueta: "Metodología", href: "/metodologia" },
  { num: "04", etiqueta: "Contacto", href: "/contacto" },
]
