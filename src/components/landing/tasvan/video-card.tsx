"use client"
import { useState } from "react"
import Image from "next/image"
import { cloudinaryVideoUrl } from "@/lib/cloudinary"
import { trackCustom } from "@/components/landing/maison-seseh-bali/track"
import { C } from "./tokens"

// Carte vidéo à la demande : poster + bouton lecture, légende "Vidéo de
// présentation" toujours affichée sous le bouton. Lecture au clic.
// Déplacée hors du hero (désormais vidéo plein écran en fond) vers la
// section "La maison".
export default function VideoCard({
  videoUrl,
  posterUrl,
  posterAlt,
  label,
  page,
}: {
  videoUrl?: string
  posterUrl: string
  posterAlt: string
  label: string
  page: string
}) {
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (!videoUrl) return
    setPlaying(true)
    trackCustom("LP_HeroVideoPlay", { page })
  }

  return (
    <div className="relative w-full aspect-video bg-black/10">
      {!playing ? (
        <>
          <Image src={posterUrl} alt={posterAlt} fill sizes="(max-width:768px) 100vw, 58vw" className="object-cover" />
          <button type="button" onClick={handlePlay} aria-label="Lire la vidéo" aria-disabled={!videoUrl} className="absolute inset-0 flex items-center justify-center group">
            <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
            <span className="relative flex flex-col items-center gap-3">
              <span className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                <svg className="w-6 h-6 ml-1" fill={C.ink} viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="text-[12px] font-medium uppercase tracking-[.16em] text-white">{label}</span>
            </span>
          </button>
        </>
      ) : (
        <video className="absolute inset-0 w-full h-full object-cover" controls playsInline autoPlay poster={posterUrl}>
          <source src={cloudinaryVideoUrl(videoUrl!)} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
