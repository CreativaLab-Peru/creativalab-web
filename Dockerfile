# ---------- Stage 1: Build ----------
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copiamos solo los archivos de dependencias primero (cache layer).
# El glob cubre bun.lock (texto, bun >= 1.1) y bun.lockb (binario, anterior):
# con "bun.lockb*" el lockfile de texto no entraba y --frozen-lockfile fallaba.
COPY package.json bun.lock* ./

# Instalación reproducible y sin cache basura
RUN bun install --frozen-lockfile

# Ahora sí copiamos el resto del código
COPY . .

# Build de producción (ajusta si tu script se llama distinto)
RUN bun run build

# ---------- Stage 2: Runtime ----------
FROM nginx:1.27-alpine AS runtime

# Config custom de nginx (SPA routing, gzip, cache headers)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos solo el output del build (ajusta "dist" si usas "build")
COPY --from=builder /app/dist /usr/share/nginx/html

# Usuario no-root (mejor seguridad)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

# Healthcheck simple
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]