/** El wordmark del estudio, en sus dos versiones.
 *
 * Son dos archivos distintos y no uno con filtro: el oscuro va sobre el crema
 * de la cabecera y el claro sobre el `--ink` del pie. Confundirlos deja el
 * logo invisible sobre su propio fondo.
 */
const ARCHIVOS = {
  oscuro: "/img/logo-creativalab.png",
  claro: "/img/logo-creativalab-claro.png",
} as const

export function Logo({
  tono = "oscuro",
  alt = "CreativaLab",
  lazy = false,
}: {
  tono?: keyof typeof ARCHIVOS
  alt?: string
  lazy?: boolean
}) {
  return (
    <img
      src={ARCHIVOS[tono]}
      alt={alt}
      width={1071}
      height={244}
      loading={lazy ? "lazy" : undefined}
    />
  )
}
