/** Los iconos del prototipo, uno a uno.
 *
 * Son parte del texto que acompañan, no información aparte: van todos con
 * `aria-hidden` para que un lector de pantalla no lea "gráfico" después de
 * cada botón.
 */

/** Flecha diagonal. La llevan todos los `.btn`, sin importar si el enlace
 *  sale del sitio o no: en este diseño marca acción, no destino externo. */
export function IconoDiagonal() {
  return (
    <svg
      className="ico"
      viewBox="0 0 20 20"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 15 15 5M7 5h8v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  )
}

/** Flecha recta, para los enlaces de texto que siguen leyendo en el sitio. */
export function IconoFlecha() {
  return (
    <svg
      className="ico"
      viewBox="0 0 20 20"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 10h13M11 5l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  )
}
