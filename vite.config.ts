import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Sin Tailwind a propósito: el sistema de diseño del estudio es CSS plano con
// nombres BEM, igual que el prototipo. Mezclar las dos cosas solo agregaba una
// capa de traducción y abría espacio a que el port se desviara del diseño.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
