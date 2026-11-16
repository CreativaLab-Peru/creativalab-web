/** Texto de la política de privacidad, tal como lo fijó el prototipo.
 *
 * Va como datos y no como JSX para que se pueda revisar y actualizar sin
 * tocar la vista: lo que cambia de una política es el texto y la fecha.
 *
 * TODO legal: la sección 1 no identifica al responsable con razón social ni
 * RUC, y la 9 remite a "los canales publicados en este sitio" cuando el sitio
 * solo publica Instagram. La Ley 29733 pide un canal para ejercer los
 * derechos ARCO; en cuanto haya correo del estudio, va en ambas secciones.
 */
export const ACTUALIZADA = "12 de noviembre de 2026"

export type Bloque =
  { tipo: "p"; texto: string } | { tipo: "ul"; items: string[] }

export type SeccionLegal = {
  titulo: string
  bloques: Bloque[]
}

export const secciones: SeccionLegal[] = [
  {
    titulo: "1. Quién es responsable de tus datos",
    bloques: [
      {
        tipo: "p",
        texto:
          "CreativaLab es responsable del tratamiento de los datos personales que nos entregas a través de este sitio web. Para cualquier consulta sobre esta política puedes escribirnos por los canales indicados en la sección 9.",
      },
    ],
  },
  {
    titulo: "2. Qué datos recopilamos",
    bloques: [
      {
        tipo: "p",
        texto:
          "Solo recopilamos los datos que tú nos das en el formulario de contacto:",
      },
      {
        tipo: "ul",
        items: [
          "Nombre y apellido.",
          "Empresa u organización.",
          "Correo electrónico y número de celular (WhatsApp).",
          "Servicio de interés, descripción del proyecto e información sobre su financiamiento.",
        ],
      },
      {
        tipo: "p",
        texto:
          "No solicitamos datos sensibles. Te pedimos no incluirlos en la descripción de tu proyecto.",
      },
    ],
  },
  {
    titulo: "3. Para qué los usamos",
    bloques: [
      {
        tipo: "ul",
        items: [
          "Responder tu consulta y contactarte por correo, llamada o WhatsApp.",
          "Preparar y enviarte una propuesta o cotización.",
          "Dar seguimiento a la relación comercial que se inicie a partir de tu consulta.",
        ],
      },
      {
        tipo: "p",
        texto:
          "No usamos tus datos para enviarte publicidad sin tu consentimiento, ni los vendemos a terceros.",
      },
    ],
  },
  {
    titulo: "4. Base legal",
    bloques: [
      {
        tipo: "p",
        texto:
          "Tratamos tus datos con tu consentimiento libre, previo, expreso e informado, que otorgas al marcar la casilla de aceptación antes de enviar el formulario, conforme a la Ley N.º 29733, Ley de Protección de Datos Personales, y su reglamento.",
      },
    ],
  },
  {
    titulo: "5. Con quién los compartimos",
    bloques: [
      {
        tipo: "p",
        texto:
          "Tus datos pueden ser procesados por proveedores tecnológicos que nos ayudan a operar el sitio y a recibir los mensajes, como servicios de alojamiento web y de envío de correos. Algunos de ellos pueden estar ubicados fuera del Perú; en ese caso exigimos que mantengan niveles adecuados de protección.",
      },
      {
        tipo: "p",
        texto:
          "Solo compartiremos tus datos con autoridades cuando una norma o un mandato legal lo exija.",
      },
    ],
  },
  {
    titulo: "6. Cuánto tiempo los conservamos",
    bloques: [
      {
        tipo: "p",
        texto:
          "Conservamos tus datos mientras sean necesarios para atender tu consulta y, si se inicia un proyecto, durante la relación comercial y los plazos que exija la ley. Después los eliminamos o anonimizamos.",
      },
    ],
  },
  {
    titulo: "7. Tus derechos",
    bloques: [
      {
        tipo: "p",
        texto:
          "Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, cancelación y oposición (derechos ARCO), así como revocar tu consentimiento. Escríbenos indicando tu nombre, el derecho que deseas ejercer y una copia de tu documento de identidad. Responderemos dentro de los plazos establecidos por la ley.",
      },
      {
        tipo: "p",
        texto:
          "Si consideras que no atendimos tu solicitud, puedes acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.",
      },
    ],
  },
  {
    titulo: "8. Seguridad",
    bloques: [
      {
        tipo: "p",
        texto:
          "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a pérdida, uso indebido o acceso no autorizado. Las comunicaciones del sitio viajan cifradas mediante HTTPS.",
      },
    ],
  },
  {
    titulo: "9. Contacto y cambios",
    bloques: [
      {
        tipo: "p",
        texto:
          "Para consultas sobre privacidad, escríbenos a través del formulario de contacto o de los canales publicados en este sitio.",
      },
      {
        tipo: "p",
        texto:
          "Podemos actualizar esta política. Publicaremos aquí la versión vigente con su fecha de actualización.",
      },
    ],
  },
]
