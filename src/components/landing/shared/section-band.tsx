// Bande pleine largeur (fond sombre ou accent, comme sur la home) — la
// seule exception à la règle "aligné à gauche" : titre et surtitre
// centrés. Casse volontairement hors du conteneur max-w-[1060px] par un
// positionnement pleine fenêtre.
export default function SectionBand({
  variant,
  overline,
  title,
  children,
}: {
  variant: "dark" | "accent"
  overline: string
  title: string
  children?: React.ReactNode
}) {
  const bg = variant === "dark" ? "bg-foreground" : "bg-accent"
  const overlineColor = variant === "dark" ? "text-accent" : "text-background"
  const titleColor = variant === "dark" ? "text-white" : "text-background"

  return (
    <div className={`relative left-1/2 right-1/2 -mx-[50vw] w-screen ${bg}`}>
      <div className="max-w-[1060px] mx-auto px-5 md:px-0 py-16 md:py-24 text-center">
        <p className={`font-sans font-medium text-[12px] uppercase tracking-[0.16em] mb-4 ${overlineColor}`}>{overline}</p>
        <h2 className={`font-sans font-light leading-[1.1] text-[32px] md:text-[44px] mb-8 ${titleColor}`}>{title}</h2>
        {children}
      </div>
    </div>
  )
}
