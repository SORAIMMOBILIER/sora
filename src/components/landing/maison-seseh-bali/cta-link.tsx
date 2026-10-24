"use client"
import { trackCtaClick } from "./track"

// Bouton local, pas d'import du composant Button du site (voir brief) —
// plein, fond sombre, texte blanc capitales, aucun arrondi (grammaire
// filet-seul de la refonte visuelle) : pleine largeur mobile, largeur au
// contenu + padding 32px sur ordinateur, 52px de haut.
const BASE_CLASSES =
  "inline-flex items-center justify-center font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-white bg-foreground transition-opacity hover:opacity-90 h-[52px] px-8 w-full md:w-auto"

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
