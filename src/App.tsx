import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "@/components/layout/layout"
import InicioPage from "@/pages/inicio/inicio-page"

// La home es la puerta de entrada y va en el bundle principal; el resto llega
// cuando alguien lo pide. /contacto arrastra el formulario entero y no tiene
// por qué pesar en la primera carga.
const ServiciosPage = lazy(() => import("@/pages/servicios/servicios-page"))
const NosotrosPage = lazy(() => import("@/pages/nosotros/nosotros-page"))
const MetodologiaPage = lazy(
  () => import("@/pages/metodologia/metodologia-page")
)
const ContactoPage = lazy(() => import("@/pages/contacto/contacto-page"))
const PrivacidadPage = lazy(() => import("@/pages/privacidad/privacidad-page"))
const NoEncontradaPage = lazy(
  () => import("@/pages/no-encontrada/no-encontrada-page")
)

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<InicioPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/metodologia" element={<MetodologiaPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/privacidad" element={<PrivacidadPage />} />
          <Route path="*" element={<NoEncontradaPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
