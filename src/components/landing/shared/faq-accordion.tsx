"use client"
import { useState } from "react"

export type FaqItem = { q: string; a: string }

// Accordéon FAQ propre à ces pages (pas le composant ui/accordion
// sitewide, dont le style pastille/carte ne correspond pas à la
// grammaire filet-seul) : lignes 72 px, "+" fin qui pivote, filets.
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="max-w-[1060px] border-t border-border">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full min-h-[72px] py-4 flex items-center justify-between gap-6 text-left"
            >
              <span className="font-sans text-[17px] text-foreground max-w-[640px]">{item.q}</span>
              <span
                className="shrink-0 w-5 h-5 relative transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                <span className="absolute top-1/2 left-0 w-full h-px bg-foreground -translate-y-1/2" />
                <span className="absolute left-1/2 top-0 h-full w-px bg-foreground -translate-x-1/2" />
              </span>
            </button>
            {isOpen && (
              <p className="font-sans text-[15px] leading-[1.5] text-foreground/65 max-w-[640px] pb-6">{item.a}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
