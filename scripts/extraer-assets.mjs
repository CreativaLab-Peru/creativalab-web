// Extrae a public/img/ las imágenes que el prototipo lleva embebidas en base64.
// Uso: node scripts/extraer-assets.mjs [docs/CreativaLab.html]
import { createHash } from "node:crypto"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const entrada = process.argv[2] ?? "docs/CreativaLab.html"
const salida = "public/img"
const html = readFileSync(entrada, "utf8")

const slug = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

/** El alt describe la imagen para quien no la ve; el nombre de archivo es otra
 *  cosa. Mapeamos uno a uno para que `public/img/` se lea de un vistazo. */
const nombres = {
  "creativalab-ir-al-inicio": "logo-creativalab",
  creativalab: "logo-creativalab-claro",
  "dara-edward-y-andy-el-equipo-de-creativalab-trabajando-con-sus-laptops":
    "equipo-trabajando",
  "reclutar-ai": "cliente-reclutar-ai",
  levely: "cliente-levely",
  "mujeres-digitales": "cliente-mujeres-digitales",
  "peru-presidencia-del-consejo-de-ministros": "respaldo-pcm",
  "pantallas-con-codigo-y-diseno-de-una-web-en-desarrollo": "servicio-web",
  "laptop-con-un-sistema-de-gestion-que-muestra-calendario-archivos-y-metricas":
    "servicio-software",
  "equipo-organizando-ideas-con-notas-adhesivas-en-un-taller":
    "servicio-innovacion",
  "diagrama-de-una-consulta-procesada-por-claude-y-convertida-en-un-documento":
    "servicio-ia",
  "retrato-de-dara": "retrato-dara",
  "retrato-de-edward": "retrato-edward",
  "retrato-de-andy": "retrato-andy",
}

mkdirSync(salida, { recursive: true })

const porHash = new Map()
const usados = new Map()
const escritos = []

for (const tag of html.match(/<img\b[^>]*?>/g) ?? []) {
  const src = tag.match(/src="data:image\/(\w+);base64,([^"]+)"/)
  if (!src) continue
  const [, ext, b64] = src
  const bytes = Buffer.from(b64, "base64")
  const hash = createHash("sha1").update(bytes).digest("hex").slice(0, 8)
  if (porHash.has(hash)) continue

  const alt = (tag.match(/alt="([^"]*)"/) ?? [, ""])[1]
  const base = nombres[slug(alt)]
  if (!base) {
    throw new Error(
      `Imagen sin nombre declarado. Agrega "${slug(alt)}" al mapa \`nombres\`.`
    )
  }
  // Dos imágenes distintas con el mismo nombre serían un logo pisando al otro:
  // exactamente el bug que dejó invisible el wordmark de Levely en su navbar.
  if (usados.has(base)) {
    throw new Error(
      `"${base}" ya se usó para el alt "${usados.get(base)}". Un nombre por imagen.`
    )
  }
  usados.set(base, alt)

  const archivo = `${base}.${ext}`
  porHash.set(hash, archivo)
  writeFileSync(join(salida, archivo), bytes)
  escritos.push({ archivo, kb: Math.round(bytes.length / 1024), alt })
}

for (const { archivo, kb, alt } of escritos) {
  console.log(
    `${archivo.padEnd(30)} ${String(kb).padStart(5)} KB  ${alt.slice(0, 46)}`
  )
}
const total = escritos.reduce((n, a) => n + a.kb, 0)
console.log(`\n${escritos.length} archivos · ${total} KB en ${salida}/`)
