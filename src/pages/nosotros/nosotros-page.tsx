import { Seo } from "@/components/seo"
import { IconoFlecha } from "@/components/iconos"
import { Cierre } from "@/components/secciones/cierre"
import { equipo } from "@/data/equipo"

export default function NosotrosPage() {
  return (
    <>
      <Seo
        titulo="Nosotros"
        descripcion="Somos CreativaLab: estrategia, diseño e inteligencia artificial para construir herramientas que tu organización pueda usar desde el primer día."
        ruta="/nosotros"
      />

      <section
        className="page-hero page-hero--about"
        aria-labelledby="pa-title"
      >
        <div className="page-hero__glow" aria-hidden="true" />
        <div className="wrap">
          <p className="eyebrow">
            <span>Nosotros</span>
          </p>
          <h1 className="h1" id="pa-title">
            Ideas con <span className="sf">dirección.</span>
            <br />
            Tecnología para llevarlas más lejos.
          </h1>
          <div className="about__intro">
            <p className="lead">
              Somos CreativaLab. Conectamos estrategia, diseño e inteligencia
              artificial para construir herramientas que tu organización pueda
              usar desde el primer día.
            </p>
            <p className="about__place">
              <IconoFlecha />
              <span>
                Trabajamos con empresas e instituciones de todo el Perú.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="section team" aria-labelledby="team-title">
        <div className="wrap">
          <h2 className="kicker team__title" id="team-title">
            Las personas
          </h2>
          <ul className="members">
            {equipo.map((persona, i) => (
              <li className={`member member--${i + 1}`} key={persona.nombre}>
                <div className="frame">
                  <img
                    src={persona.foto}
                    alt={`Retrato de ${persona.nombre}`}
                    width={864}
                    height={1080}
                    sizes="(min-width: 1020px) 30vw, 90vw"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="member__body">
                  <h3 className="member__name">{persona.nombre}</h3>
                  <p className="member__role">{persona.rol}</p>
                  <p className="member__bio">{persona.bio}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="backing">
            <p className="kicker">Laboratorios</p>
            <p className="backing__text">
              Somos un laboratorio digital con el respaldo de la Presidencia del
              Consejo de Ministros.
            </p>
            <div className="backing__logo">
              <img
                src="/img/respaldo-pcm.webp"
                alt="Perú, Presidencia del Consejo de Ministros"
                width={1000}
                height={192}
                sizes="(min-width: 1020px) 420px, 90vw"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <blockquote className="quote">
            <p>Disfrutamos el proceso, celebramos el resultado.</p>
          </blockquote>
        </div>
      </section>

      <Cierre />
    </>
  )
}
