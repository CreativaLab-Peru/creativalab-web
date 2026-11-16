/** La foto del equipo dentro de su marco, con las líneas que lo desbordan y
 *  los cinco íconos flotando alrededor.
 *
 * Todo lo que no es la foto es decorado: va con `aria-hidden` para que no
 * aparezca como una lista de gráficos sin nombre en un lector de pantalla.
 */
export function VisualHero() {
  return (
    <div className="hv">
      <div className="hv__glow" aria-hidden="true" />
      <svg
        className="hv__orbit"
        viewBox="0 0 400 400"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          cx="200"
          cy="200"
          r="196"
          fill="none"
          stroke="#151514"
          strokeOpacity=".22"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
      </svg>
      <span className="hv__line hv__line--t" aria-hidden="true" />
      <span className="hv__line hv__line--b" aria-hidden="true" />
      <span className="hv__line hv__line--l" aria-hidden="true" />
      <span className="hv__line hv__line--r" aria-hidden="true" />
      <span className="hv__offset" aria-hidden="true" />

      <figure className="hv__photo">
        <img
          src="/img/equipo-trabajando.webp"
          alt="Dara, Edward y Andy, el equipo de CreativaLab, trabajando con sus laptops"
          width={1600}
          height={1200}
          sizes="(min-width: 1020px) 46vw, 92vw"
          fetchPriority="high"
          decoding="async"
        />
      </figure>

      <div className="hv__chips" aria-hidden="true">
        <span className="hv__chip hv__chip--code">
          <svg viewBox="0 0 48 32">
            <path
              d="M14 6 4 16l10 10M34 6l10 10-10 10"
              fill="none"
              stroke="#151514"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M27 4 21 28"
              stroke="#5687FF"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="hv__chip hv__chip--ai">
          <svg viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="#5687FF" />
            <path
              d="M24 10c2 8 6 12 14 14-8 2-12 6-14 14-2-8-6-12-14-14 8-2 12-6 14-14z"
              fill="#fff"
            />
          </svg>
        </span>
        <span className="hv__chip hv__chip--chart">
          <svg viewBox="0 0 40 44">
            <rect
              x="2"
              y="26"
              width="9"
              height="18"
              rx="3"
              fill="#5687FF"
              fillOpacity=".45"
            />
            <rect
              x="15"
              y="14"
              width="9"
              height="30"
              rx="3"
              fill="#5687FF"
              fillOpacity=".7"
            />
            <rect x="28" y="2" width="9" height="42" rx="3" fill="#5687FF" />
          </svg>
        </span>
        <span className="hv__chip hv__chip--cart">
          <svg viewBox="0 0 48 44">
            <path
              d="M2 6h7l7 26h22l6-18H13"
              fill="none"
              stroke="#151514"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="19" cy="40" r="3.5" fill="#151514" />
            <circle cx="35" cy="40" r="3.5" fill="#151514" />
            <circle cx="42" cy="6" r="5" fill="#5687FF" />
          </svg>
        </span>
        <span className="hv__chip hv__chip--flow">
          <svg viewBox="0 0 96 24">
            <circle cx="12" cy="12" r="10" fill="#5687FF" />
            <circle
              cx="48"
              cy="12"
              r="9"
              fill="none"
              stroke="#151514"
              strokeWidth="2.4"
            />
            <rect
              x="76"
              y="3"
              width="18"
              height="18"
              rx="5"
              fill="none"
              stroke="#151514"
              strokeWidth="2.4"
            />
            <path
              d="M23 12h14M58 12h14"
              stroke="#151514"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}
