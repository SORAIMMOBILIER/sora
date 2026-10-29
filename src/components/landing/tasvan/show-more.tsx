"use client"
import { useState } from "react"
import { CLS } from "./tokens"
import PlusMinus from "./plus-minus"

// Révèle du contenu caché (gammes supplémentaires) sans rechargement,
// repliable : le bouton reste visible, bascule "+" / "—".
export default function ShowMore({ label, closeLabel, children }: { label: string; closeLabel?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)} className={`${CLS.btnGhost} w-full md:w-auto gap-2`}>
        <PlusMinus open={open} />
        {open ? closeLabel || label : label}
      </button>
      {open && <div className="mt-16 md:mt-24">{children}</div>}
    </div>
  )
}
