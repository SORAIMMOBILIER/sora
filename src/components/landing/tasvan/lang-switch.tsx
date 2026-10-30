"use client"
import { useSearchParams } from "next/navigation"

// Bouton discret FR / EN dans l'en-tête des pages tasvan — renvoie vers
// la même page dans l'autre langue, en conservant les paramètres de
// l'URL (?modele=, utm_...). useSearchParams() lit la query string côté
// client sans flash (pas de useEffect) : disponible dès le premier rendu
// dans un composant client comme celui-ci.
export default function LangSwitch({ href, label }: { href: string; label: string }) {
  const params = useSearchParams()
  const qs = params.toString()
  const finalHref = qs ? `${href}?${qs}` : href
  return (
    <a href={finalHref} className="text-[11px] font-medium uppercase tracking-[.16em] text-white/70 hover:text-white transition-colors">
      {label}
    </a>
  )
}
