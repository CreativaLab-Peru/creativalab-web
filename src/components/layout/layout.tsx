import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Cabecera } from "./cabecera"
import { Pie } from "./pie"

/** Lleva al ancla cuando la ruta trae hash, que react-router no resuelve solo.
 *
 * Sin hash vuelve arriba: es una vista nueva, no una posición conservada. El
 * salto respeta `prefers-reduced-motion` porque un desplazamiento largo y
 * animado marea a quien pidió que no se lo hagan.
 */
function useScrollDeRuta() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }
    const destino = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (!destino) {
      window.scrollTo({ top: 0 })
      return
    }
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    destino.scrollIntoView({
      behavior: quieto ? "auto" : "smooth",
      block: "start",
    })
  }, [hash, pathname])
}

export default function Layout() {
  useScrollDeRuta()

  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <Cabecera />
      <main id="contenido">
        <Outlet />
      </main>
      <Pie />
    </>
  )
}
