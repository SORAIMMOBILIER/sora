"use client"
import { useState } from "react"
import { DISPLAY, C } from "./tokens"

export type FaqItem = { q: string; a: string }

// `.faq` : question en police display 300, assez grande pour être un
// sous-titre, icône "+" formée de deux barres qui pivote à 45° à
// l'ouverture.
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="mt-11 border-t" style={{ borderColor: C.line }}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border-b" style={{ borderColor: C.line }}>
            <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="w-full text-left relative pr-11 py-6">
              <span className="text-[clamp(20px,2.3vw,25px)] font-light leading-[1.25]" style={{ fontFamily: DISPLAY, color: C.ink }}>
                {item.q}
              </span>
              <span
                className="absolute right-[6px] top-1/2 -mt-[7px] w-[14px] h-[14px] transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                <span className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2" style={{ background: C.ink }} />
                <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2" style={{ background: C.ink }} />
              </span>
            </button>
            {isOpen && (
              <p className="pb-[26px] max-w-[70ch] text-[15px] leading-[1.5]" style={{ color: C.muted }}>
                {item.a}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
