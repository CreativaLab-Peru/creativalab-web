import { Helmet } from "react-helmet-async"
import { SITIO } from "@/config"

type SeoProps = {
  /** Sin la marca: se le agrega " | CreativaLab" acá. */
  titulo: string
  descripcion: string
  /** Ruta con barra inicial, ej. "/servicios". */
  ruta: string
}

const IMAGEN = `${SITIO}/og-image.png`

export function Seo({ titulo, descripcion, ruta }: SeoProps) {
  const url = `${SITIO}${ruta}`
  const completo = ruta === "/" ? titulo : `${titulo} | CreativaLab`

  return (
    <Helmet>
      <title>{completo}</title>
      <meta name="description" content={descripcion} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={completo} />
      <meta property="og:description" content={descripcion} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={IMAGEN} />
      <meta property="og:site_name" content="CreativaLab" />
      <meta property="og:locale" content="es_PE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={completo} />
      <meta name="twitter:description" content={descripcion} />
      <meta name="twitter:image" content={IMAGEN} />
    </Helmet>
  )
}
