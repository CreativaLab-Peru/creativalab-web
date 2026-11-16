import { VACIO, type Campos } from "./validacion"

/** El formulario es largo. Si alguien se va a buscar el RUC o se le cae la
 *  pestaña, lo escrito sigue ahí al volver.
 *
 *  Vive solo en el navegador de quien escribe y se borra al enviar. Todo va
 *  entre try/catch porque en modo privado `localStorage` puede lanzar al
 *  tocarlo, y perder el borrador no puede tumbar el formulario entero.
 */
const CLAVE = "cl-formulario-borrador"

export function leerBorrador(): Partial<Campos> {
  try {
    const crudo = window.localStorage.getItem(CLAVE)
    if (!crudo) return {}
    const datos = JSON.parse(crudo) as Record<string, unknown>
    // Solo volvemos a poner claves que el formulario conoce y con el tipo que
    // espera: lo guardado es de otra sesión y pudo quedar de una versión vieja.
    const limpio: Partial<Campos> = {}
    for (const clave of Object.keys(VACIO) as (keyof Campos)[]) {
      const valor = datos[clave]
      if (typeof VACIO[clave] === "boolean") {
        if (typeof valor === "boolean") limpio[clave] = valor as never
      } else if (typeof valor === "string") {
        limpio[clave] = valor as never
      }
    }
    return limpio
  } catch {
    return {}
  }
}

export function guardarBorrador(campos: Campos) {
  try {
    // La trampa de bots no se guarda: no es dato de nadie.
    const guardable = { ...campos, web: undefined }
    window.localStorage.setItem(CLAVE, JSON.stringify(guardable))
  } catch {
    /* sin borrador se sigue pudiendo enviar */
  }
}

export function borrarBorrador() {
  try {
    window.localStorage.removeItem(CLAVE)
  } catch {
    /* ya está */
  }
}
