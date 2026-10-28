"use client"
import { useState } from "react"

// Bouton secondaire (contour, pas de remplissage) qui révèle du contenu
// caché sans rechargement — "Voir les autres gammes du projet".
export default function ShowMore({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  if (open) return <>{children}</>

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="inline-flex items-center justify-center font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-foreground bg-transparent border border-foreground transition-colors hover:bg-foreground hover:text-white h-[52px] px-8 w-full md:w-auto"
    >
      {label}
    </button>
  )
}
