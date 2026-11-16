/** Las cuatro etapas, de la primera conversación a la entrega.
 *
 * Cada una cierra con su resultado: la etapa dice qué hacemos, el resultado
 * dice qué se lleva el cliente. Sin eso, "entender" no significa nada.
 */
export type Etapa = {
  num: string
  nombre: string
  texto: string
  resultado: string
}

export const etapas: Etapa[] = [
  {
    num: "01",
    nombre: "Entender",
    texto: "Conocemos tu organización, tu público y tus objetivos.",
    resultado: "Un desafío definido.",
  },
  {
    num: "02",
    nombre: "Dar dirección",
    texto: "Acordamos enfoque, alcance, entregables y cronograma.",
    resultado: "Una ruta compartida.",
  },
  {
    num: "03",
    nombre: "Crear y construir",
    texto:
      "Diseñamos y desarrollamos, con IA donde aporta valor y espacios de revisión.",
    resultado: "Una solución para probar.",
  },
  {
    num: "04",
    nombre: "Activar y acompañar",
    texto: "Ajustamos, ponemos en marcha y te entregamos lo necesario.",
    resultado: "Un proyecto listo para usar.",
  },
]
