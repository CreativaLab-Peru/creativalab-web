import { Link } from "react-router-dom"
import { Seo } from "@/components/seo"
import { IconoDiagonal, IconoFlecha } from "@/components/iconos"
import { Anillo } from "@/components/secciones/anillo"
import { Cierre } from "@/components/secciones/cierre"
import { Pack } from "@/components/secciones/pack"
import { VisualHero } from "@/components/secciones/visual-hero"
import { clientes } from "@/data/clientes"

export default function InicioPage() {
  return (
    <>
      <Seo
        titulo="CreativaLab | Estudio de diseño y tecnología"
        descripcion="Diseño web, software a medida, automatización con IA y programas de innovación para empresas, colegios y startups en todo el Perú."
        ruta="/"
      />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__glow" aria-hidden="true" />
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              <span className="dot" aria-hidden="true" />
              Estudio de diseño y tecnología
            </p>
            <h1 className="hero__title" id="hero-title">
              Hacemos que la tecnología trabaje para{" "}
              <span className="sf">tu negocio.</span>
            </h1>
            <p className="lead">
              Combinamos estrategia, diseño y tecnología para convertir los
              desafíos de tu empresa en soluciones que puedas usar.
            </p>
            <div className="actions">
              <Link className="btn btn--primary" to="/contacto">
                Cuéntanos tu proyecto <IconoDiagonal />
              </Link>
              <Link className="btn btn--secondary" to="/servicios">
                Explorar servicios
              </Link>
            </div>
          </div>
          <VisualHero />
        </div>
      </section>

      <section className="clients" aria-labelledby="clients-title">
        <div className="wrap clients__in">
          <h2 className="clients__title" id="clients-title">
            Marcas y organizaciones con las que construimos.
          </h2>
          <ul className="clients__list">
            {clientes.map((cliente) => (
              <li className="client" key={cliente.nombre}>
                <img
                  className="mono"
                  src={cliente.logo}
                  alt={cliente.nombre}
                  width={cliente.ancho}
                  height={cliente.alto}
                  style={{ height: `${cliente.altura}px` }}
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section services-home" aria-labelledby="sh-title">
        <div className="wrap services-home__grid">
          <div className="services-home__copy">
            <p className="eyebrow">
              <span>Lo que hacemos</span>
            </p>
            <h2 className="h2" id="sh-title">
              Diseñamos, construimos y <span className="sf">potenciamos</span>{" "}
              con IA.
            </h2>
            <p className="lead muted">
              Elige por dónde empezar. Cada servicio se conecta con los demás
              según lo que tu proyecto necesite.
            </p>
            <Link className="link-arrow" to="/servicios">
              Ver todos los servicios <IconoFlecha />
            </Link>
          </div>
          <Anillo />
        </div>
      </section>

      <Pack />
      <Cierre />
    </>
  )
}
