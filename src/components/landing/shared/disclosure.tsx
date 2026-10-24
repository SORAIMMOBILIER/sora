"use client"
import { useState } from "react"

// Lien "En savoir plus" qui révèle le texte long d'un bloc — fermé par
// défaut, jamais de contenu perdu : le texte existant des sections
// d'origine vit ici plutôt que dans la première couche de lecture.
export default function Disclosure({
  moreLabel,
  lessLabel,
  children,
}: {
  moreLabel: string
  lessLabel: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-6 max-w-2xl mx-auto text-left">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="text-sm underline underline-offset-4 text-foreground/55 hover:text-foreground transition-colors"
      >
        {open ? lessLabel : moreLabel}
      </button>
      {open && (
        <div className="mt-5 space-y-4 text-foreground/65 text-sm leading-relaxed">{children}</div>
      )}
    </div>
  )
}
