"use client"
import { useRef, useState } from "react"
import { C } from "./tokens"

// Plans RDC + étage : une seule grande image à la fois, galerie à glisser
// comme les photos (88 % de largeur, premier calé à gauche), légende du
// niveau et compteur "1 / 2" sous l'image — même traitement que
// VillaGallery, pas deux images côte à côte. 640 px de haut maximum pour
// lire les pièces sans zoomer.
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
  const trackRef = useRef<HTMLDivElement>(null)

  if (plans.length === 0) {
    return (
      <div className="mt-[14px] bg-white border p-4 h-[320px] flex items-center justify-center" style={{ borderColor: C.line, color: C.muted }}>
        <span className="text-[12px] font-medium uppercase tracking-[.16em]">{pendingLabel}</span>
      </div>
    )
  }

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={`${alt} — ${p.label}`}
              className="block mx-auto w-auto h-auto max-w-full"
              style={{ maxHeight: "640px" }}
              loading="lazy"
            />
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
