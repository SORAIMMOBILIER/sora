"use client"
import { useState } from "react"

// Lien "En savoir plus" aligné à gauche — fermé par défaut. Le texte long
// d'origine vit ici, jamais supprimé.
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
    <div className="max-w-[640px] mt-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="font-sans text-[15px] underline underline-offset-4 text-foreground"
      >
        {open ? lessLabel : moreLabel}
      </button>
      {open && <div className="mt-5 space-y-4 font-sans text-[16px] leading-[1.5] text-foreground/70">{children}</div>}
    </div>
  )
}
