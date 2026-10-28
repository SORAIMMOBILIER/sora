"use client"
import { useRef, useState } from "react"
import { C } from "./tokens"

// Plans RDC + étage : même galerie à glisser que les photos (88 % de
// largeur, premier calé à gauche, le suivant dépasse d'environ 12 % à
// droite), légende affichée en surimpression sur le plan. 640 px de haut
// maximum pour lire les pièces sans zoomer.
export default function PlanFrame({
  rdc,
  etage,
  rdcLabel,
  etageLabel,
  alt,
  pendingLabel,
  note,
}: {
  rdc?: string
  etage?: string
  rdcLabel: string
  etageLabel: string
  alt: string
  pendingLabel: string
  note: string
}) {
  const plans = [
    { src: rdc, label: rdcLabel },
    { src: etage, label: etageLabel },
  ].filter((p) => p.src)
  const [index, setIndex] = useState(0)

  if (plans.length === 0) {
    return (
      <div className="mt-[14px] bg-white border p-4 h-[320px] flex items-center justify-center" style={{ borderColor: C.line, color: C.muted }}>
        <span className="text-[12px] font-medium uppercase tracking-[.16em]">{pendingLabel}</span>
      </div>
    )
  }
  const trackRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 0
    const next = Math.round(ratio * (plans.length - 1))
    setIndex(Math.min(Math.max(next, 0), plans.length - 1))
  }

  return (
    <div className="mt-[14px]">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {plans.map((p) => (
          <div key={p.label} className="relative shrink-0 w-[88%] snap-start bg-white border p-4 flex items-center justify-center" style={{ borderColor: C.line }}>
            <span
              className="absolute top-4 left-4 bg-white px-2 py-1 text-[12px] font-medium uppercase tracking-[.14em]"
              style={{ color: C.ink, border: `1px solid ${C.line}` }}
            >
              {p.label}
            </span>
            {p.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.src}
                alt={`${alt} — ${p.label}`}
                className="block mx-auto w-auto h-auto max-w-full"
                style={{ maxHeight: "640px" }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[320px] flex items-center justify-center" style={{ color: C.muted }}>
                <span className="text-[12px] font-medium uppercase tracking-[.16em]">{pendingLabel}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-[10px] text-[13px]" style={{ color: C.muted }}>
        <p>{plans[index]?.label || ""}</p>
        <p>
          {index + 1} / {plans.length}
        </p>
      </div>
      <p className="text-[12px] mt-1" style={{ color: C.muted }}>
        {note}
      </p>
    </div>
  )
}
