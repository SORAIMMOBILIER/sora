"use client"
import { useState } from "react"
import { DISPLAY, C } from "./tokens"
import { Kicker } from "./primitives"
import PlusMinus from "./plus-minus"

export type PriceCell = { name: string; spec: string; price: string; anchor: string }

function Cell({ item, borderRight }: { item: PriceCell; borderRight: boolean }) {
  return (
    <a
      href={item.anchor}
      className="flex flex-col px-[clamp(20px,5vw,64px)] md:px-[32px] py-[30px] transition-colors hover:bg-[#f1f0ed] max-md:grid max-md:grid-cols-[1fr_auto] max-md:items-center max-md:gap-x-4 max-md:border-b max-md:py-[22px] max-md:px-5"
      style={{ borderRight: borderRight ? `1px solid ${C.line}` : undefined, borderBottomColor: C.line }}
    >
      <span className="max-md:col-start-1 max-md:row-start-1">
        <Kicker>{item.name}</Kicker>
      </span>
      <span
        className="max-md:col-start-1 max-md:row-start-2 mt-[6px] text-[13px]"
        style={{ color: C.muted }}
      >
        {item.spec}
      </span>
      <span
        className="max-md:col-start-2 max-md:row-span-2 mt-[10px] max-md:mt-0 text-[clamp(30px,3.4vw,42px)] leading-[1.1] font-light"
        style={{ fontFamily: DISPLAY, color: C.ink }}
      >
        {item.price}
      </span>
    </a>
  )
}

function Row({ items }: { items: PriceCell[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-b" style={{ borderColor: C.line }}>
      {items.map((item, i) => (
        <Cell key={item.name} item={item} borderRight={i < items.length - 1} />
      ))}
    </div>
  )
}

// `.quick`/`.q` : trois cellules bordées pleine largeur. Les gammes
// supplémentaires forment leur propre ligne (pas de retour à la ligne
// bancal dans la grille à 3 colonnes), derrière un lien repliable.
export default function PriceCells({
  items,
  extraItems,
  toggleLabel,
  closeLabel,
}: {
  items: PriceCell[]
  extraItems?: PriceCell[]
  toggleLabel?: string
  closeLabel?: string
}) {
  const [showExtra, setShowExtra] = useState(false)

  return (
    <div>
      <Row items={items} />
      {showExtra && extraItems && extraItems.length > 0 && <Row items={extraItems} />}
      {extraItems && extraItems.length > 0 && (
        <button
          type="button"
          onClick={() => setShowExtra((v) => !v)}
          className="mt-4 flex items-center gap-2 text-[14px] font-medium"
          style={{ color: C.ink }}
        >
          <PlusMinus open={showExtra} />
          <span className="underline underline-offset-4">{showExtra ? closeLabel : toggleLabel}</span>
        </button>
      )}
    </div>
  )
}
