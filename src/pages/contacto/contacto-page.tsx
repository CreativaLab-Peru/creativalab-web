import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Seo } from "@/components/seo"
import { IconoDiagonal } from "@/components/iconos"
import { urlWhatsApp } from "@/config"
import { opcionesContacto } from "@/data/servicios"
import { borrarBorrador, guardarBorrador, leerBorrador } from "./borrador"
import {
  MENSAJES,
  OPCIONES_FINANCIAMIENTO,
  VACIO,
  type Campo,
  type Campos,
  errores,
  pideFondos,
  valida,
} from "./validacion"

/** Arma el mensaje que llega al WhatsApp del estudio.
 *
 * Es el formulario entero en texto: nadie debería tener que volver a
 * preguntar lo que la persona ya se tomó el trabajo de escribir.
 */
function mensajeWhatsApp(campos: Campos) {
  const servicio =
    opcionesContacto.find((o) => o.valor === campos.servicio)?.etiqueta ??
    campos.servicio

  const lineas = [
    `Hola, soy ${campos.nombre.trim()} de ${campos.organizacion.trim()}.`,
    `Llené el formulario de CreativaLab y me interesa: ${servicio}.`,
    "",
    campos.mensaje.trim(),
    "",
    `Financiamiento: ${campos.financiamiento}`,
  ]
  if (pideFondos(campos)) {
    lineas.push(`Programa o concurso: ${campos.programa.trim()}`)
    lineas.push(`Qué necesita implementar: ${campos.necesita.trim()}`)
  }
  lineas.push("", `Correo: ${campos.correo.trim()}`)
  return lineas.join("\n")
}

export default function ContactoPage() {
  const [params] = useSearchParams()
  // El estado arranca ya con el borrador y el servicio de la URL puestos: así
  // no hay un primer render con el formulario vacío que se rellena solo.
  const servicioUrl = params.get("servicio") ?? ""
  const [campos, setCampos] = useState<Campos>(() => {
    const guardado = leerBorrador()
    // Quien llegó desde "Cotizar Software a medida" eligió ahí, no antes: el
    // servicio de la URL manda sobre el que quedó en el borrador.
    const valido = opcionesContacto.some((o) => o.valor === servicioUrl)
    return {
      ...VACIO,
      ...guardado,
      ...(valido ? { servicio: servicioUrl } : {}),
    }
  })
  /** Campos ya señalados: no marcamos en rojo lo que nadie tocó todavía. */
  const [marcados, setMarcados] = useState<Set<Campo>>(new Set())
  const [aviso, setAviso] = useState("")
  const [enviado, setEnviado] = useState(false)
  const refs = useRef<Partial<Record<Campo, HTMLElement | null>>>({})
  const panelListo = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enviado) guardarBorrador(campos)
  }, [campos, enviado])

  useEffect(() => {
    if (enviado) panelListo.current?.focus()
  }, [enviado])

  function cambiar<C extends keyof Campos>(campo: C, valor: Campos[C]) {
    setCampos((previos) => {
      const siguientes = { ...previos, [campo]: valor }
      // Si ya estaba señalado y se arregló, el error se va mientras escribe.
      if (marcados.has(campo as Campo) && valida(campo as Campo, siguientes)) {
        setMarcados((m) => {
          const copia = new Set(m)
          copia.delete(campo as Campo)
          return copia
        })
      }
      return siguientes
    })
  }

  /** Al salir del campo lo revisamos, pero solo si tiene algo escrito: salir
   *  de un campo vacío por el que solo se pasó no es un error todavía. */
  function alSalir(campo: Campo) {
    const vacio =
      campos[campo as keyof Campos] === "" ||
      campos[campo as keyof Campos] === false
    if (vacio && !marcados.has(campo)) return
    if (!valida(campo, campos)) setMarcados((m) => new Set(m).add(campo))
  }

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    // La trampa llena significa bot: cortamos en silencio, sin pistas.
    if (campos.web) return

    const malos = errores(campos)
    if (malos.length > 0) {
      setMarcados(new Set(malos))
      setAviso("Revisa los campos marcados para poder enviar tu consulta.")
      refs.current[malos[0]]?.focus()
      return
    }

    setAviso("")
    window.open(
      urlWhatsApp(mensajeWhatsApp(campos)),
      "_blank",
      "noopener,noreferrer"
    )
    borrarBorrador()
    setEnviado(true)
  }

  const fondos = pideFondos(campos)

  /** Texto de error de un campo, o cadena vacía si no toca mostrarlo. */
  const error = (campo: Campo) =>
    marcados.has(campo) && !valida(campo, campos) ? MENSAJES[campo] : ""

  /** Props comunes de todo input con mensaje de error asociado. */
  const errorProps = (campo: Campo) => ({
    "aria-describedby": `err-${campo}`,
    ...(error(campo) ? { "aria-invalid": true as const } : {}),
  })

  return (
    <>
      <Seo
        titulo="Contacto"
        descripcion="Cuéntanos qué quieres lanzar, construir o mejorar. Te respondemos por WhatsApp para conocer tu proyecto."
        ruta="/contacto"
      />

      <section className="contact" aria-labelledby="contact-title">
        <div className="contact__horizon" aria-hidden="true" />
        <div className="wrap contact__grid">
          <div className="contact__intro">
            <h1 className="h1" id="contact-title" tabIndex={-1}>
              Tu próximo proyecto
              <br />
              puede <span className="sf">empezar aquí.</span>
            </h1>
            <p className="lead muted">
              Cuéntanos qué quieres lanzar, construir o mejorar.
            </p>
          </div>

          <div className="form-shell">
            <form
              className="form"
              id="contact-form"
              noValidate
              onSubmit={enviar}
              hidden={enviado}
            >
              <div className="field">
                <label htmlFor="f-name">
                  Nombre y apellido{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="f-name"
                  type="text"
                  autoComplete="name"
                  value={campos.nombre}
                  onChange={(e) => cambiar("nombre", e.target.value)}
                  onBlur={() => alSalir("nombre")}
                  ref={(el) => {
                    refs.current.nombre = el
                  }}
                  {...errorProps("nombre")}
                />
                <p className="field__err" id="err-nombre">
                  {error("nombre")}
                </p>
              </div>

              <div className="field">
                <label htmlFor="f-org">
                  Empresa u organización{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="f-org"
                  type="text"
                  autoComplete="organization"
                  value={campos.organizacion}
                  onChange={(e) => cambiar("organizacion", e.target.value)}
                  onBlur={() => alSalir("organizacion")}
                  ref={(el) => {
                    refs.current.organizacion = el
                  }}
                  {...errorProps("organizacion")}
                />
                <p className="field__err" id="err-organizacion">
                  {error("organizacion")}
                </p>
              </div>

              <div className="field">
                <label htmlFor="f-email">
                  Correo{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="f-email"
                  type="email"
                  autoComplete="email"
                  value={campos.correo}
                  onChange={(e) => cambiar("correo", e.target.value)}
                  onBlur={() => alSalir("correo")}
                  ref={(el) => {
                    refs.current.correo = el
                  }}
                  {...errorProps("correo")}
                />
                <p className="field__err" id="err-correo">
                  {error("correo")}
                </p>
              </div>

              <div className="field">
                <label htmlFor="f-whatsapp">
                  Celular (WhatsApp){" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="f-whatsapp"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+51 9XX XXX XXX"
                  value={campos.whatsapp}
                  onChange={(e) => cambiar("whatsapp", e.target.value)}
                  onBlur={() => alSalir("whatsapp")}
                  ref={(el) => {
                    refs.current.whatsapp = el
                  }}
                  {...errorProps("whatsapp")}
                />
                <p className="field__err" id="err-whatsapp">
                  {error("whatsapp")}
                </p>
              </div>

              <div className="field field--full">
                <label htmlFor="f-service">
                  Servicio de interés{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <div className="select">
                  <select
                    id="f-service"
                    value={campos.servicio}
                    onChange={(e) => cambiar("servicio", e.target.value)}
                    onBlur={() => alSalir("servicio")}
                    ref={(el) => {
                      refs.current.servicio = el
                    }}
                    {...errorProps("servicio")}
                  >
                    <option value="">Elige una opción</option>
                    {opcionesContacto.map((opcion) => (
                      <option key={opcion.valor} value={opcion.valor}>
                        {opcion.etiqueta}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="field__err" id="err-servicio">
                  {error("servicio")}
                </p>
              </div>

              <div className="field field--full">
                <label htmlFor="f-message">
                  Cuéntanos tu proyecto{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <textarea
                  id="f-message"
                  rows={4}
                  value={campos.mensaje}
                  onChange={(e) => cambiar("mensaje", e.target.value)}
                  onBlur={() => alSalir("mensaje")}
                  ref={(el) => {
                    refs.current.mensaje = el
                  }}
                  {...errorProps("mensaje")}
                />
                <p className="field__err" id="err-mensaje">
                  {error("mensaje")}
                </p>
              </div>

              <fieldset className="field field--full fieldset">
                <legend>
                  ¿Tu proyecto cuenta con financiamiento?{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </legend>
                <div className="radios">
                  {OPCIONES_FINANCIAMIENTO.map((opcion, i) => (
                    <label
                      className="radio"
                      htmlFor={`f-funding-${i}`}
                      key={opcion}
                    >
                      <input
                        type="radio"
                        id={`f-funding-${i}`}
                        name="financiamiento"
                        value={opcion}
                        checked={campos.financiamiento === opcion}
                        onChange={() => cambiar("financiamiento", opcion)}
                        ref={
                          i === 0
                            ? (el) => {
                                refs.current.financiamiento = el
                              }
                            : undefined
                        }
                        {...(i === 0
                          ? { "aria-describedby": "err-financiamiento" }
                          : {})}
                      />
                      <span>{opcion}</span>
                    </label>
                  ))}
                </div>
                <p className="field__err" id="err-financiamiento">
                  {error("financiamiento")}
                </p>
              </fieldset>

              <div className="funding-extra field--full" hidden={!fondos}>
                <div className="field">
                  <label htmlFor="f-program">
                    Programa o concurso{" "}
                    <span className="req" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="f-program"
                    type="text"
                    placeholder="Ej.: Startup Perú"
                    value={campos.programa}
                    onChange={(e) => cambiar("programa", e.target.value)}
                    onBlur={() => alSalir("programa")}
                    ref={(el) => {
                      refs.current.programa = el
                    }}
                    {...errorProps("programa")}
                  />
                  <p className="field__err" id="err-programa">
                    {error("programa")}
                  </p>
                </div>
                <div className="field">
                  <label htmlFor="f-needs">
                    Qué necesitas implementar{" "}
                    <span className="req" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="f-needs"
                    type="text"
                    value={campos.necesita}
                    onChange={(e) => cambiar("necesita", e.target.value)}
                    onBlur={() => alSalir("necesita")}
                    ref={(el) => {
                      refs.current.necesita = el
                    }}
                    {...errorProps("necesita")}
                  />
                  <p className="field__err" id="err-necesita">
                    {error("necesita")}
                  </p>
                </div>
              </div>

              {/* Trampa para bots. Fuera de pantalla por CSS, no por `hidden`:
                  un campo oculto de verdad lo saltan también los bots. */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="f-website">No completar</label>
                <input
                  id="f-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={campos.web}
                  onChange={(e) => cambiar("web", e.target.value)}
                />
              </div>

              <div className="field field--full">
                <label className="check" htmlFor="f-consent">
                  <input
                    id="f-consent"
                    type="checkbox"
                    checked={campos.consentimiento}
                    onChange={(e) =>
                      cambiar("consentimiento", e.target.checked)
                    }
                    ref={(el) => {
                      refs.current.consentimiento = el
                    }}
                    {...errorProps("consentimiento")}
                  />
                  <span>
                    Acepto la{" "}
                    <Link to="/privacidad" target="_blank" rel="noopener">
                      política de privacidad
                    </Link>
                    .
                  </span>
                </label>
                <p className="field__err" id="err-consentimiento">
                  {error("consentimiento")}
                </p>
              </div>

              <div className="form__foot field--full">
                <button className="btn btn--primary btn--lg" type="submit">
                  <span>Hablemos de tu proyecto</span> <IconoDiagonal />
                </button>
                <p
                  className={`form__status${aviso ? " is-error" : ""}`}
                  role="status"
                  aria-live="polite"
                >
                  {aviso}
                </p>
              </div>
            </form>

            <div
              className="form-done"
              hidden={!enviado}
              tabIndex={-1}
              ref={panelListo}
            >
              <span className="form-done__mark" aria-hidden="true">
                <IconoDiagonal />
              </span>
              <p className="form-done__text">
                Abrimos WhatsApp con tu consulta lista para enviar. Si no se
                abrió, escríbenos por ahí y te respondemos para conocer más
                sobre tu proyecto.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
