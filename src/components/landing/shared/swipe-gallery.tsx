"use client"
import { useRef, useState } from "react"
import MediaSlot from "./media-slot"
import { GRAY } from "./tokens"

export type GalleryImage = { src?: string; alt: string; caption?: string }

// Galerie à glisser au doigt (scroll-snap natif), ratio 16:10, angles
// droits, légende à gauche + compteur à droite, puis le libellé
// "N PHOTOS · FAITES GLISSER" en capitales.
export default function SwipeGallery({
  images,
  pendingLabel,
  swipeLabel,
}: {
  images: GalleryImage[]
  pendingLabel: string
  swipeLabel: string
}) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const next = Math.round(track.scrollLeft / track.clientWidth)
    setIndex(Math.min(Math.max(next, 0), images.length - 1))
  }

  if (images.length === 0) return null

  return (
    <div className="max-w-[1060px]">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div key={i} className="relative shrink-0 w-full aspect-[16/10] snap-center">
            <MediaSlot src={img.src} alt={img.alt} label={pendingLabel} sizes="100vw" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3">
        <p className="font-sans text-[13px]" style={{ color: GRAY }}>
          {images[index]?.caption || ""}
        </p>
        <p className="font-sans text-[13px]" style={{ color: GRAY }}>
          {index + 1} / {images.length}
        </p>
      </div>
      <p className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] mt-1" style={{ color: GRAY }}>
        {swipeLabel}
      </p>
    </div>
  )
}
