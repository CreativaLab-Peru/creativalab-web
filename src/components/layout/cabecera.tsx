import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { IconoDiagonal } from "@/components/iconos"
import { navegacion } from "./enlaces"
import { Logo } from "./logo"

/** Marca el borde inferior en cuanto la página se despega de arriba. */
function useDespegada() {
  const [despegada, setDespegada] = useState(false)

  useEffect(() => {
    const alScroll = () => setDespegada(window.scrollY > 8)
    alScroll()
    window.addEventListener("scroll", alScroll, { passive: true })
    return () => window.removeEventListener("scroll", alScroll)
  }, [])

  return despegada
}

export function Cabecera() {
  const despegada = useDespegada()
  const [abierto, setAbierto] = useState(false)

  // El menú móvil tapa la página entera: mientras esté abierto, el fondo no
  // se desplaza. Cerrarlo siempre devuelve el scroll, incluso si la vista se
  // desmonta con el menú abierto.
  useEffect(() => {
    if (!abierto) return
    const previo = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false)
    }
    document.addEventListener("keydown", alTeclear)
    return () => {
      document.body.style.overflow = previo
      document.removeEventListener("keydown", alTeclear)
    }
  }, [abierto])

  return (
    <header className={`site-header${despegada ? " is-scrolled" : ""}`}>
      <div className="wrap site-header__in">
        <Link className="brand" to="/">
          <Logo alt="CreativaLab, ir al inicio" />
        </Link>

        <nav className="nav" aria-label="Principal">
          <ul className="nav__list">
            {navegacion.map((enlace) => (
              <li key={enlace.href}>
                <NavLink to={enlace.href}>{enlace.etiqueta}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="btn btn--primary btn--sm nav__cta" to="/contacto">
          Cotizar <IconoDiagonal />
        </Link>

        <button
          className="menu-btn"
          type="button"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => setAbierto((v) => !v)}
        >
          <span className="menu-btn__label">{abierto ? "Cerrar" : "Menú"}</span>
          <span className="menu-btn__bars" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      {/* Un solo manejador para todo el menú: cualquier enlace de dentro
          navega y lo cierra, igual que en el prototipo. */}
      <div
        className="mobile-menu"
        id="menu-movil"
        hidden={!abierto}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setAbierto(false)
        }}
      >
        <nav className="wrap" aria-label="Menú móvil">
          <ul className="mobile-menu__list">
            {navegacion.map((enlace) => (
              <li key={enlace.href}>
                <Link to={enlace.href}>
                  <span className="mobile-menu__n">{enlace.num}</span>
                  {enlace.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="btn btn--primary" to="/contacto">
            Cotizar <IconoDiagonal />
          </Link>
        </nav>
      </div>
    </header>
  )
}
