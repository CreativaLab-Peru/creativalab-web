import { Link } from "react-router-dom"
import { Seo } from "@/components/seo"
import { IconoDiagonal } from "@/components/iconos"

export default function NoEncontradaPage() {
  return (
    <>
      <Seo
        titulo="Página no encontrada"
        descripcion="La página que buscas no existe o cambió de dirección."
        ruta="/404"
      />

      <section className="page-hero" aria-labelledby="nf-title">
        <div className="wrap">
          <p className="eyebrow">
            <span>Error 404</span>
          </p>
          <h1 className="h1" id="nf-title">
            Esta página <span className="sf">no existe.</span>
          </h1>
          <p className="lead muted">
            Puede que el enlace esté roto o que la página haya cambiado de
            dirección.
          </p>
          <div className="actions">
            <Link className="btn btn--primary" to="/">
              Ir al inicio <IconoDiagonal />
            </Link>
            <Link className="btn btn--secondary" to="/servicios">
              Ver los servicios
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
