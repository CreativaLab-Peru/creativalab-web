import { Link } from "react-router-dom"
import { IconoDiagonal } from "@/components/iconos"
import { CORREO, INSTAGRAM } from "@/config"
import { navegacion } from "./enlaces"
import { Logo } from "./logo"

export function Pie() {
  return (
    <footer className="site-footer on-dark">
      <div className="wrap">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <p className="brand brand--footer">
              <Logo tono="claro" lazy />
            </p>
            <p>Estudio de diseño y tecnología basado en Cusco y Lima.</p>
          </div>

          <nav className="site-footer__col" aria-label="Pie de página">
            <ul>
              {navegacion.map((enlace) => (
                <li key={enlace.href}>
                  <Link to={enlace.href}>{enlace.etiqueta}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <ul>
              {/* Mientras no exista casilla del estudio, el pie no inventa una. */}
              {CORREO && (
                <li>
                  <a href={`mailto:${CORREO}`}>{CORREO}</a>
                </li>
              )}
              <li>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                  Instagram <IconoDiagonal />
                  <span className="visually-hidden">
                    (se abre en otra pestaña)
                  </span>
                </a>
              </li>
              <li>
                <Link to="/privacidad">Política de privacidad</Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="site-footer__bottom">
          © {new Date().getFullYear()} CreativaLab · Perú
        </p>
      </div>
    </footer>
  )
}
