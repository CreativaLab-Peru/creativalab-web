import { Seo } from "@/components/seo"
import { ACTUALIZADA, secciones } from "@/data/legal"

export default function PrivacidadPage() {
  return (
    <>
      <Seo
        titulo="Política de privacidad"
        descripcion="Cómo CreativaLab trata los datos personales que nos entregas a través del formulario de contacto, conforme a la Ley N.º 29733."
        ruta="/privacidad"
      />

      <section className="legal" aria-labelledby="legal-title">
        <div className="wrap legal__in">
          <p className="eyebrow">
            <span>Legal</span>
          </p>
          <h1 className="h1" id="legal-title">
            Política de privacidad
          </h1>
          <p className="muted legal__date">
            Última actualización: {ACTUALIZADA}
          </p>

          {secciones.map((seccion) => (
            <section className="legal__sec" key={seccion.titulo}>
              <h2>{seccion.titulo}</h2>
              {seccion.bloques.map((bloque, i) =>
                bloque.tipo === "p" ? (
                  <p key={i}>{bloque.texto}</p>
                ) : (
                  <ul key={i}>
                    {bloque.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )
              )}
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
