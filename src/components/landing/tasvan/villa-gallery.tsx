"use client"
import { useRef, useState } from "react"
import MediaSlot from "@/components/landing/shared/media-slot"
import { C } from "./tokens"

export type GalleryImage = { src?: string; alt: string; caption?: string }

// `.car` : galerie à glisser, ratio 3:2, légende + compteur dessous, puis
// "N PHOTOS · FAITES GLISSER" en capitales. Chaque image prend 88 % de la
// largeur (premier calé à gauche, pas centré) pour que la suivante
// dépasse d'environ 12 % à droite — l'indice que ça glisse.
export default function VillaGallery({ images, pendingLabel, swipeLabel }: { images: GalleryImage[]; pendingLabel: string; swipeLabel: string }) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 0
    const next = Math.round(ratio * (images.length - 1))
    setIndex(Math.min(Math.max(next, 0), images.length - 1))
  }

  if (images.length === 0) return null

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div key={i} className="relative shrink-0 w-[88%] aspect-[3/2] snap-start">
            <MediaSlot src={img.src} alt={img.alt} label={pendingLabel} sizes="(max-width:900px) 88vw, 50vw" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-[10px] text-[13px]" style={{ color: C.muted }}>
        <p>{images[index]?.caption || ""}</p>
        <p>
          {index + 1} / {images.length}
        </p>
      </div>
      <p className="text-[12px] font-medium uppercase tracking-[.14em] mt-1" style={{ color: C.muted }}>
        {swipeLabel}
      </p>
    </div>
  )
}
