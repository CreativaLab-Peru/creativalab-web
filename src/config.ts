/** Datos de contacto y enlaces del estudio.
 *
 * Lo que esté vacío se oculta solo en la interfaz: preferimos un hueco antes
 * que un dato de relleno.
 */

/** Dominio del sitio. Lo usan el SEO del cliente y el prerender del build;
 *  si cambia, hay que cambiarlo también en scripts/prerender.mjs. */
export const SITIO = "https://holacreativalab.com"

/** WhatsApp en formato internacional sin "+", como lo pide wa.me.
 *
 * Es el canal por el que llega el formulario de contacto.
 * TODO: confirmar que es el número del estudio y no el de Levely. */
export const WHATSAPP = "51914773770"

export const INSTAGRAM = "https://www.instagram.com/holacreativalab/"

/** Correo del estudio.
 *
 * Vacío a propósito: la política de privacidad promete un canal para ejercer
 * los derechos ARCO de la Ley 29733 y hoy el sitio solo publica Instagram.
 * En cuanto exista una casilla, se pone acá y aparece sola en el pie. */
export const CORREO = ""

export function urlWhatsApp(texto: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`
}
