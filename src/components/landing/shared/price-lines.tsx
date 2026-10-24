import { GRAY } from "./tokens"

export type PriceLine = { name: string; spec: string; price: string; anchor: string }

// Ligne de prix : 56 px, modèle en capitales à gauche + spécification
// dessous, prix à droite. Toute la ligne est une ancre.
export default function PriceLines({ items, note }: { items: PriceLine[]; note: string }) {
  return (
    <div className="max-w-[1060px]">
      <div className="border-t border-border">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.anchor}
            className="flex items-center justify-between gap-4 h-[56px] border-b border-border group"
          >
            <span>
              <span className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-foreground group-hover:text-accent transition-colors">
                {item.name}
              </span>
              <span className="hidden md:inline font-sans text-[13px] ml-3" style={{ color: GRAY }}>
                {item.spec}
              </span>
            </span>
            <span className="font-sans font-light text-foreground text-[22px] shrink-0">{item.price}</span>
          </a>
        ))}
      </div>
      <p className="font-sans text-[12px] mt-3" style={{ color: GRAY }}>
        {note}
      </p>
    </div>
  )
}
