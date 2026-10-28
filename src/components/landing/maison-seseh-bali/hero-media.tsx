"use client"
import { useState } from "react"
import Image from "next/image"
import { cloudinaryVideoUrl } from "@/lib/cloudinary"
import { trackCustom } from "./track"

// Poster + lecture au clic uniquement — jamais d'autoplay (vidéo de 90s,
// sous-titrée, pas un fond d'écran ambiant). Lecteur natif <video>, aucun
// lecteur tiers (pas d'iframe YouTube/Vimeo).
export default function HeroMedia({
  videoUrl,
  posterImage,
  posterAlt,
  page = "maison-seseh-bali",
}: {
  videoUrl?: string
  posterImage: string
  posterAlt: string
  page?: string
}) {
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    setPlaying(true)
    trackCustom("LP_HeroVideoPlay", { page })
  }

  if (!videoUrl || !playing) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={posterImage}
          alt={posterAlt}
          fill
          priority
          fetchPriority="high"
          quality={90}
          className="object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
        />
        {videoUrl && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Lire la vidéo"
            className="absolute inset-0 flex items-center justify-center group"
          >
            <span className="absolute inset-0 bg-foreground/20 transition-colors group-hover:bg-foreground/30" />
            <span className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-background/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    )
  }

  return (
    <video
      className="w-full h-full object-cover"
      controls
      playsInline
      autoPlay
      poster={posterImage}
    >
      <source src={cloudinaryVideoUrl(videoUrl)} type="video/mp4" />
    </video>
  )
}
