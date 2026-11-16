/** Las reglas del formulario de contacto, aparte de la vista.
 *
 * El prototipo se apoyaba en `checkValidity()` del navegador más un par de
 * comprobaciones a mano. Acá están escritas una sola vez y en un solo lugar:
 * así se leen sin abrir el JSX y el mensaje de error vive al lado de la regla
 * que lo produce, que es la única forma de que no se desincronicen.
 */
export type Campos = {
  nombre: string
  organizacion: string
  correo: string
  whatsapp: string
  servicio: string
  mensaje: string
  financiamiento: string
  programa: string
  necesita: string
  consentimiento: boolean
  /** Trampa para bots: un humano nunca la ve, así que nunca la llena. */
  web: string
}

export const VACIO: Campos = {
  nombre: "",
  organizacion: "",
  correo: "",
  whatsapp: "",
  servicio: "",
  mensaje: "",
  financiamiento: "",
  programa: "",
  necesita: "",
  consentimiento: false,
  web: "",
}

export const OPCIONES_FINANCIAMIENTO = [
  "Sí",
  "En evaluación o postulación",
  "No",
  "Prefiero conversarlo",
] as const

/** Solo cuando hay financiamiento confirmado pedimos programa y necesidad. */
export const CON_FONDOS = OPCIONES_FINANCIAMIENTO[0]

/** Mínimo del prototipo: menos de 20 caracteres no alcanza para cotizar. */
const MINIMO_MENSAJE = 20

/** Igual al `pattern` del input: dígitos, espacios, paréntesis, guion y "+". */
const TELEFONO = /^[+0-9 ()-]{7,20}$/
/** Equivalente práctico a `type="email"` del navegador. */
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const MENSAJES: Record<string, string> = {
  nombre: "Escribe tu nombre y apellido.",
  organizacion: "Indica tu empresa u organización.",
  correo: "Escribe un correo válido, por ejemplo nombre@empresa.pe.",
  whatsapp:
    "Escribe tu número de celular (solo números, espacios y el signo +).",
  servicio: "Elige el servicio que te interesa.",
  mensaje: "Cuéntanos un poco más (al menos 20 caracteres).",
  financiamiento: "Elige una opción.",
  programa: "Indica el programa o concurso.",
  necesita: "Describe brevemente qué necesitas implementar.",
  consentimiento: "Necesitamos tu consentimiento para poder contactarte.",
}

export type Campo = keyof typeof MENSAJES

/** El orden importa: es el orden visual, y de él sale a qué campo saltamos
 *  cuando el envío falla. Financiamiento va al final porque en el prototipo
 *  se comprobaba después del recorrido por los inputs. */
const ORDEN: Campo[] = [
  "nombre",
  "organizacion",
  "correo",
  "whatsapp",
  "servicio",
  "mensaje",
  "programa",
  "necesita",
  "consentimiento",
  "financiamiento",
]

/** ¿Hay que pedir programa y necesidad con estos valores? */
export function pideFondos(campos: Campos) {
  return campos.financiamiento === CON_FONDOS
}

/** `true` si el campo está bien. Los que no aplican siempre están bien. */
export function valida(campo: Campo, campos: Campos): boolean {
  switch (campo) {
    case "nombre":
    case "organizacion":
      return campos[campo].trim().length > 0
    case "correo":
      return CORREO.test(campos.correo.trim())
    case "whatsapp":
      return TELEFONO.test(campos.whatsapp.trim())
    case "servicio":
      return campos.servicio !== ""
    case "mensaje":
      return campos.mensaje.trim().length >= MINIMO_MENSAJE
    case "financiamiento":
      return campos.financiamiento !== ""
    case "programa":
      return !pideFondos(campos) || campos.programa.trim().length > 0
    case "necesita":
      return !pideFondos(campos) || campos.necesita.trim().length > 0
    case "consentimiento":
      return campos.consentimiento
    default:
      return true
  }
}

/** Todos los campos mal, en orden de aparición. */
export function errores(campos: Campos): Campo[] {
  return ORDEN.filter((campo) => !valida(campo, campos))
}
