import { Seo } from "@/components/seo"
import { Cierre } from "@/components/secciones/cierre"
import { etapas } from "@/data/metodologia"

export default function MetodologiaPage() {
  return (
    <>
      <Seo
        titulo="Metodología"
        descripcion="Escucha, dirección creativa y ejecución en cuatro etapas: de la primera conversación a un proyecto que puedes poner en marcha."
        ruta="/metodologia"
      />

      <section className="page-hero" aria-labelledby="pm-title">
        <div className="wrap">
          <p className="eyebrow">
            <span>Cómo trabajamos</span>
          </p>
          <h1 className="h1" id="pm-title">
            De la primera conversación
            <br />a algo que puedes <span className="sf">poner en marcha.</span>
          </h1>
          <p className="lead muted">
            Escucha, dirección creativa y ejecución, en cuatro etapas.
          </p>
        </div>
      </section>

      <section className="section method" aria-label="Etapas">
        <div className="method__bloom" aria-hidden="true" />
        <div className="wrap">
          <ol className="steps">
            {etapas.map((etapa, i) => (
              <li className="step" key={etapa.num}>
                <span className="step__n" aria-hidden="true">
                  {etapa.num}
                </span>
                <span className="step__node" aria-hidden="true" />
                <h2 className="step__name">
                  {/* El número ya se ve; para quien escucha, lo decimos. */}
                  <span className="visually-hidden">{`Etapa ${i + 1}: `}</span>
                  {etapa.nombre}
                </h2>
                <p className="step__text">{etapa.texto}</p>
                <p className="step__result">
                  <span className="kicker">Resultado</span>
                  {etapa.resultado}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Cierre />
    </>
  )
}
