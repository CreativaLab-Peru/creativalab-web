import { Link } from "react-router-dom"
import { IconoDiagonal } from "@/components/iconos"

const incluye = [
  "Web o MVP",
  "Software a medida",
  "IA y automatización",
  "Puesta en marcha y capacitación",
]

/** Pack Impulso Digital: la oferta para proyectos con fondos de Startup Perú
 *  o ProInnóvate. Va al final de la home y de /servicios. */
export function Pack() {
  return (
    <section className="section pack" aria-labelledby="pack-title" id="impulso">
      <div className="wrap">
        <div className="pack__card">
          <div className="pack__shape" aria-hidden="true" />
          <div className="pack__top">
            <p className="pack__name">
              <span className="sf">Pack Impulso Digital</span>
            </p>
            <p className="pack__label">Startup Perú · ProInnóvate</p>
          </div>

          <h2 className="pack__title" id="pack-title">
            ¿Tu proyecto fue financiado con fondos?
            <br />
            Somos tu aliado digital para hacerlo{" "}
            <span className="sf">crecer.</span>
          </h2>

          <div className="pack__grid">
            <p className="pack__text">
              Convertimos lo que tu proyecto necesita en entregables concretos,
              con una propuesta clara de alcance y tiempos.
            </p>
            <ul className="pack__list">
              {incluye.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="pack__foot">
            <Link className="btn btn--primary" to="/contacto?servicio=pack">
              Solicitar propuesta <IconoDiagonal />
            </Link>
            <p className="pack__note">
              La contratación con recursos del fondo está sujeta a las bases, el
              presupuesto aprobado y las condiciones de cada proyecto.
              CreativaLab brinda servicios independientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
