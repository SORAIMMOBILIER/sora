"use client"
import { useRef, useState } from "react"
import MediaSlot from "./media-slot"

export type GalleryImage = { src?: string; alt: string; caption?: string }

// Galerie à glisser au doigt (scroll-snap natif, pas de librairie carousel)
// avec un compteur "x / n" et une légende courte par image, sans clic
// obligatoire pour avancer.
export default function SwipeGallery({
  images,
  pendingLabel,
}: {
  images: GalleryImage[]
  pendingLabel: string
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
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="relative shrink-0 w-[85%] md:w-[60%] aspect-[4/3] rounded-sm overflow-hidden bg-secondary/40 snap-center"
          >
            <MediaSlot src={img.src} alt={img.alt} label={pendingLabel} sizes="(max-width:768px) 85vw, 60vw" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 px-1">
        <p className="metadata text-foreground/40">
          {index + 1} / {images.length}
        </p>
        {images[index]?.caption && (
          <p className="text-foreground/50 text-xs truncate ml-4">{images[index].caption}</p>
        )}
      </div>
    </div>
  )
}
