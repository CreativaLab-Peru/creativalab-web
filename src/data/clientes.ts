/** Logos de la franja de clientes.
 *
 * La altura va por logo y no por CSS común: cada marca tiene su propia
 * proporción y una altura única los dejaría ópticamente disparejos.
 */
export type Cliente = {
  nombre: string
  logo: string
  ancho: number
  alto: number
  /** Altura de render en píxeles, calibrada a ojo contra las demás. */
  altura: number
}

export const clientes: Cliente[] = [
  {
    nombre: "Reclutar.ai",
    logo: "/img/cliente-reclutar-ai.png",
    ancho: 982,
    alto: 125,
    altura: 19,
  },
  {
    nombre: "Levely",
    logo: "/img/cliente-levely.png",
    ancho: 552,
    alto: 160,
    altura: 34,
  },
  {
    nombre: "Mujeres Digitales",
    logo: "/img/cliente-mujeres-digitales.png",
    ancho: 363,
    alto: 160,
    altura: 46,
  },
]
