"use client"
import { useState } from "react"
import { GRAY } from "./tokens"

export type PriceLine = { name: string; spec: string; price: string; anchor: string }

function Line({ item }: { item: PriceLine }) {
  return (
    <a href={item.anchor} className="flex items-center justify-between gap-4 h-[56px] border-b border-border group">
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
  )
}

// Lignes de prix : les gammes principales sont toujours visibles, les
// gammes secondaires se révèlent derrière un lien, sans rechargement.
export default function PriceLines({
  items,
  extraItems,
  toggleLabel,
  note,
}: {
  items: PriceLine[]
  extraItems?: PriceLine[]
  toggleLabel?: string
  note: string
}) {
  const [showExtra, setShowExtra] = useState(false)

  return (
    <div className="max-w-[1060px]">
      <div className="border-t border-border">
        {items.map((item) => (
          <Line key={item.name} item={item} />
        ))}
        {showExtra && extraItems?.map((item) => <Line key={item.name} item={item} />)}
      </div>
      {extraItems && extraItems.length > 0 && !showExtra && (
        <button
          type="button"
          onClick={() => setShowExtra(true)}
          className="font-sans text-[15px] underline underline-offset-4 text-foreground mt-4"
        >
          {toggleLabel}
        </button>
      )}
      <p className="font-sans text-[12px] mt-3" style={{ color: GRAY }}>
        {note}
      </p>
    </div>
  )
}
