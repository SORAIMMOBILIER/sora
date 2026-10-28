import { CLS, DISPLAY, C } from "./tokens"

export function Kicker({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`${CLS.kicker} ${light ? "text-white/90" : ""}`}>{children}</p>
}

export function H2({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={CLS.h2} style={{ fontFamily: DISPLAY, color: light ? "#fff" : C.ink }}>
      {children}
    </h2>
  )
}

// Conteneur pleine largeur, padding fluide, largeur max 1180px — reproduit
// `.wrap` à l'identique.
export function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] ${className}`}>{children}</div>
}

// Bande de section : alterne blanc / stone (#f1f0ed), jamais sombre — voir
// docs/tasvan-tokens.md. `alt` = bande "stone", casse hors du conteneur
// parent pour être pleine largeur.
export function Section({
  alt,
  id,
  children,
  className = "",
}: {
  alt?: boolean
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`py-[clamp(72px,11vw,140px)] ${alt ? "relative left-1/2 right-1/2 -mx-[50vw] w-screen" : ""} ${className}`}
      style={alt ? { background: C.stone } : undefined}
    >
      <div className={alt ? "max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)]" : undefined}>
        {alt ? children : <Wrap>{children}</Wrap>}
      </div>
    </section>
  )
}

export function Btn({
  href,
  ghost,
  children,
  onClick,
  className = "",
  type = "button",
}: {
  href?: string
  ghost?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: "button" | "submit"
}) {
  const cls = `${ghost ? CLS.btnGhost : CLS.btn} ${className}`
  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
