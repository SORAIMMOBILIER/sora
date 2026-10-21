"use client"
import { trackCtaClick } from "./track"

// Bouton local, pas d'import du composant Button du site (voir brief) —
// mêmes classes visuelles que le variant "default" actuel, copiées ici.
const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-semibold text-[11px] uppercase tracking-[0.1em] transition-all duration-500 h-14 px-8 bg-primary text-primary-foreground hover:bg-background hover:text-primary border border-transparent hover:border-primary/20"

export default function CtaLink({
  section,
  label,
  className = "",
  anchor = "#entretien",
  page = "maison-seseh-bali",
}: {
  section: string
  label: string
  className?: string
  anchor?: string
  page?: string
}) {
  return (
    <a
      href={anchor}
      onClick={() => trackCtaClick(section, page)}
      className={`${BASE_CLASSES} ${className}`}
    >
      {label}
    </a>
  )
}
