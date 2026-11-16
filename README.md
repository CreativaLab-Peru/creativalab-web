# creativalab-web

Sitio de **CreativaLab**, el estudio de diseño y tecnología: `holacreativalab.com`.

Portado de `docs/CreativaLab.html`, el prototipo estático que el cliente ya
revisó. El prototipo es la fuente de verdad del diseño y de la copia: ante
cualquier duda, gana el prototipo.

## Puesta en marcha

```bash
bun install
bun run dev
```

| Script             | Qué hace                                                    |
| ------------------ | ----------------------------------------------------------- |
| `bun run dev`      | Servidor de desarrollo                                       |
| `bun run build`    | `tsc` + Vite + prerender de las rutas internas               |
| `bun run preview`  | Sirve `dist/` como lo hará nginx                             |
| `bun run typecheck`| TypeScript sin emitir                                        |
| `bun run lint`     | ESLint                                                       |
| `bun run format`   | Prettier                                                     |
| `bun run assets`   | Reextrae `public/img/` desde el prototipo                    |

## Cómo está armado

**Sin Tailwind, a propósito.** El sistema de diseño es CSS plano con nombres
BEM, igual que el prototipo, y vive entero en `src/styles/base.css`. Mezclarlo
con utilidades abría una capa de traducción donde el port podía desviarse del
diseño sin que nadie lo notara.

- `src/data/` — la copia y los datos del sitio, separados de las vistas. Lo que
  cambia de una web de estudio es el texto, no el marcado.
- `src/components/secciones/` — las secciones que comparten varias páginas
  (el anillo de servicios, el Pack Impulso Digital, el cierre).
- `src/pages/` — una carpeta por ruta. Todas van en `lazy()` menos la home.
- `scripts/extraer-assets.mjs` — saca a `public/img/` las imágenes que el
  prototipo lleva embebidas en base64. Falla fuerte si dos imágenes distintas
  quieren el mismo nombre, que es cómo un logo termina pisando al otro.
- `scripts/prerender.mjs` — escribe un `<ruta>.html` por ruta con sus propios
  metadatos, para que las vistas previas de WhatsApp y LinkedIn no muestren el
  título de la home en todas partes.

## Rutas

`/` · `/servicios` · `/nosotros` · `/metodologia` · `/contacto` · `/privacidad`

`/servicios` acepta anclas por servicio (`#web`, `#software`, `#innovacion`,
`#ia`) y `#impulso` para el pack. `/contacto?servicio=<slug>` llega con el
servicio ya elegido en el formulario.

## El formulario

No hay backend: al enviar, arma el mensaje con todo lo que la persona escribió
y abre WhatsApp. La validación replica la del prototipo campo por campo y vive
en `src/pages/contacto/validacion.ts`, aparte de la vista. Lo escrito se guarda
en `localStorage` mientras tanto, y se borra al enviar.

## Despliegue

Push a `main` → GitHub Actions construye la imagen, la sube a GHCR y despliega
en Dokku. Necesita los secrets `DOKKU_HOST`, `DOKKU_APP` y `DOKKU_DEPLOY_KEY`.

## Pendiente

- `public/og-image.png` (1200×630) no existe: hoy todo enlace compartido sale
  sin imagen. El build avisa.
- La política de privacidad promete un canal para los derechos ARCO de la Ley
  29733 y el sitio solo publica Instagram. En cuanto haya correo del estudio,
  va en `src/config.ts` y aparece solo en el pie.
- El número de WhatsApp es el mismo de Levely; falta confirmar si el estudio
  usa uno propio.
