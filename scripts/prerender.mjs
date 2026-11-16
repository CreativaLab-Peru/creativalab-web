/**
 * Genera un HTML por ruta con sus propios metadatos.
 *
 * El sitio es una SPA: los metadatos los pone react-helmet-async en el
 * cliente, así que todo bot que no ejecuta JS — incluidas las vistas previas
 * de WhatsApp y LinkedIn — veía el título de la home en cualquier ruta. Para
 * páginas que se comparten por enlace, eso cuesta consultas.
 *
 * Los archivos se escriben como `<ruta>.html` y nginx los sirve con
 * `try_files $uri $uri.html $uri/ /index.html`: así la URL se mantiene sin
 * barra final y coincide con la canónica. React Router hidrata normal.
 *
 * Para agregar una ruta, basta sumarla a RUTAS.
 */
import { access, mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const DIST = join(RAIZ, "dist")
/** Si cambia, hay que cambiarlo también en src/config.ts. */
const SITIO = "https://holacreativalab.com"

const RUTAS = [
  {
    ruta: "servicios",
    titulo: "Servicios | CreativaLab",
    descripcion:
      "Diseño web especializado, software a medida, programas de innovación y automatización con IA para empresas, colegios y startups del Perú.",
  },
  {
    ruta: "nosotros",
    titulo: "Nosotros | CreativaLab",
    descripcion:
      "Somos CreativaLab. Conectamos estrategia, diseño e inteligencia artificial para construir herramientas que tu organización pueda usar desde el primer día.",
  },
  {
    ruta: "metodologia",
    titulo: "Metodología | CreativaLab",
    descripcion:
      "Escucha, dirección creativa y ejecución en cuatro etapas: de la primera conversación a un proyecto que puedes poner en marcha.",
  },
  {
    ruta: "contacto",
    titulo: "Contacto | CreativaLab",
    descripcion:
      "Cuéntanos qué quieres lanzar, construir o mejorar. Te respondemos por WhatsApp para conocer tu proyecto.",
  },
  {
    ruta: "privacidad",
    titulo: "Política de privacidad | CreativaLab",
    descripcion:
      "Cómo CreativaLab trata los datos personales que nos entregas a través del formulario de contacto, conforme a la Ley N.º 29733.",
  },
]

function escapar(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

async function existe(ruta) {
  try {
    await access(ruta)
    return true
  } catch {
    return false
  }
}

/** Reemplaza el valor de una etiqueta <meta> ya presente en el HTML. */
function reemplazarMeta(html, atributo, nombre, valor) {
  const patron = new RegExp(
    `(<meta\\s+${atributo}="${nombre}"\\s+content=")[^"]*(")`,
    "i"
  )
  return html.replace(patron, `$1${escapar(valor)}$2`)
}

const plantilla = await readFile(join(DIST, "index.html"), "utf8")
const og = `${SITIO}/og-image.png`

if (!(await existe(join(DIST, "og-image.png")))) {
  console.warn(
    "prerender: falta public/og-image.png; las vistas previas saldrán sin imagen."
  )
}

for (const { ruta, titulo, descripcion } of RUTAS) {
  const url = `${SITIO}/${ruta}`

  let html = plantilla
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapar(titulo)}</title>`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${url}$2`)

  html = reemplazarMeta(html, "name", "description", descripcion)
  html = reemplazarMeta(html, "property", "og:title", titulo)
  html = reemplazarMeta(html, "property", "og:description", descripcion)
  html = reemplazarMeta(html, "property", "og:url", url)
  html = reemplazarMeta(html, "property", "og:image", og)
  html = reemplazarMeta(html, "name", "twitter:title", titulo)
  html = reemplazarMeta(html, "name", "twitter:description", descripcion)
  html = reemplazarMeta(html, "name", "twitter:image", og)

  const destino = join(DIST, `${ruta}.html`)
  await mkdir(dirname(destino), { recursive: true })
  await writeFile(destino, html, "utf8")
  console.log(`prerender: /${ruta}`)
}
