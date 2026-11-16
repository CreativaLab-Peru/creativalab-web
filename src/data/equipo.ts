/** El equipo del estudio. */
export type Persona = {
  nombre: string
  rol: string
  bio: string
  foto: string
}

export const equipo: Persona[] = [
  {
    nombre: "Dara",
    rol: "Estrategia e Innovación",
    bio: "Administradora, especializada en innovación y desarrollo de iniciativas tecnológicas. Cuenta con más de 6 años en diseño de programas de emprendimiento, desarrollo de ecosistemas de innovación y articulación de alianzas estratégicas para impulsar soluciones con impacto.",
    foto: "/img/retrato-dara.webp",
  },
  {
    nombre: "Edward",
    rol: "Desarrollo Tecnológico",
    bio: "Ingeniero de sistemas especializado en desarrollo web, software e integración de sistemas. Cuenta con experiencia en construcción de plataformas digitales, sitios web y soluciones tecnológicas a medida para optimizar procesos y mejorar la gestión empresarial.",
    foto: "/img/retrato-edward.webp",
  },
  {
    nombre: "Andy",
    rol: "Inteligencia Artificial y Automatización",
    bio: "Especialista en inteligencia artificial y automatización de procesos. Cuenta con experiencia en desarrollo de agentes inteligentes, integración de herramientas de IA y creación de flujos automatizados para optimizar tareas y mejorar la productividad de empresas y organizaciones.",
    foto: "/img/retrato-andy.webp",
  },
]
