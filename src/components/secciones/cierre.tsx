import { Link } from "react-router-dom"
import { IconoDiagonal } from "@/components/iconos"

/** Cierre de página: la última oportunidad de escribirnos. Lo comparten la
 *  home, /nosotros y /metodologia. */
export function Cierre() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing__horizon" aria-hidden="true" />
      <div className="wrap closing__in">
        <h2 className="h2" id="closing-title">
          ¿Listo para empezar?
        </h2>
        <Link className="btn btn--primary btn--lg" to="/contacto">
          Cotizar mi proyecto <IconoDiagonal />
        </Link>
      </div>
    </section>
  )
}
