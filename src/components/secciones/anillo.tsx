import { useId } from "react"
import { Link } from "react-router-dom"
import { servicios } from "@/data/servicios"

/** El anillo de servicios: cuatro nodos alrededor de "lo que tu proyecto
 *  necesita". Aparece en la home y en /servicios.
 *
 * El degradado necesita un id único por instancia; en el prototipo estaban
 * numerados a mano (`ringfill-3`, `ringfill-4`) porque el anillo salía dos
 * veces en el mismo documento. Acá lo resuelve `useId`, que además sobrevive
 * a que alguien lo ponga una tercera vez.
 */
export function Anillo() {
  const relleno = `anillo-${useId()}`

  return (
    <div className="ring">
      <svg
        className="ring__track"
        viewBox="0 0 400 400"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id={relleno} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#5687FF" stopOpacity=".55" />
            <stop offset=".7" stopColor="#5687FF" stopOpacity=".12" />
            <stop offset="1" stopColor="#5687FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill={`url(#${relleno})`} />
        <circle
          cx="200"
          cy="200"
          r="170"
          fill="none"
          stroke="#151514"
          strokeOpacity=".28"
          strokeWidth="1"
        />
      </svg>

      <p className="ring__center">Lo que tu proyecto necesita</p>

      <ol className="ring__nodes" aria-label="Servicios">
        {servicios.map((servicio, i) => (
          <li key={servicio.slug} className={`ring__node ring__node--${i + 1}`}>
            <Link className="ring__link" to={`/servicios#${servicio.slug}`}>
              <span className="ring__dot" aria-hidden="true">
                {servicio.num}
              </span>
              <span className="ring__txt">
                <span className="ring__name">{servicio.nombre}</span>
                <span className="ring__short">{servicio.resumen}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
