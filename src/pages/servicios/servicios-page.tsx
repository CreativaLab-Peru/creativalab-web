import { Link } from "react-router-dom"
import { Seo } from "@/components/seo"
import { IconoDiagonal } from "@/components/iconos"
import { Anillo } from "@/components/secciones/anillo"
import { Pack } from "@/components/secciones/pack"
import { servicios } from "@/data/servicios"

export default function ServiciosPage() {
  return (
    <>
      <Seo
        titulo="Servicios"
        descripcion="Diseño web especializado, software a medida, programas de innovación y automatización con IA para empresas, colegios y startups del Perú."
        ruta="/servicios"
      />

      <section className="page-hero" aria-labelledby="ps-title">
        <div className="wrap page-hero__grid">
          <div>
            <p className="eyebrow">
              <span>Lo que hacemos</span>
            </p>
            <h1 className="h1" id="ps-title">
              Diseñamos, construimos y <span className="sf">potenciamos</span>{" "}
              con IA.
            </h1>
            <p className="lead muted">
              Elige por dónde empezar. Cada servicio se conecta con los demás
              según lo que tu proyecto necesite.
            </p>
          </div>
          <Anillo />
        </div>
      </section>

      <section
        className="section services-list"
        aria-label="Detalle de servicios"
      >
        <div className="wrap">
          {servicios.map((servicio) => (
            <article
              className="svc"
              id={servicio.slug}
              key={servicio.slug}
              aria-labelledby={`svc-${servicio.slug}`}
            >
              <div className="svc__text">
                <p className="svc__num">{servicio.num}</p>
                <h2 className="svc__name" id={`svc-${servicio.slug}`}>
                  {servicio.nombre}
                </h2>
                <p className="svc__lead">{servicio.lead}</p>
                <ul className="tags">
                  {servicio.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Link
                  className="btn btn--primary"
                  to={`/contacto?servicio=${servicio.slug}`}
                >
                  Cotizar{" "}
                  <span className="visually-hidden">{servicio.nombre}</span>{" "}
                  <IconoDiagonal />
                </Link>
              </div>
              <div className="svc__visual">
                <div className="frame">
                  <img
                    src={servicio.imagen}
                    alt={servicio.alt}
                    width={1080}
                    height={810}
                    sizes="(min-width: 1020px) 46vw, 92vw"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Pack />
    </>
  )
}
