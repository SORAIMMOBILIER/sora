"use client"
import { useState } from "react"
import Image from "next/image"
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
  playLabel = "Lire la vidéo",
}: {
  videoUrl?: string
  posterUrl: string
  posterAlt: string
  label: string
  page: string
  playLabel?: string
}) {
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (!videoUrl) return
    setPlaying(true)
    trackCustom("LP_HeroVideoPlay", { page })
  }

  return (
    <div className="relative w-full max-w-[360px] mx-auto aspect-[9/16] bg-black/10">
      {/* Plein écran (bouton des contrôles natifs) : par défaut le navigateur
          applique le object-fit de l'élément <video>, donc le "object-cover"
          ci-dessous agrandirait et rognerait une vidéo verticale sur un écran
          large. On force "contain" + fond noir uniquement en plein écran. */}
      <style>{`
        video.vsl-video:fullscreen, video.vsl-video:-webkit-full-screen {
          object-fit: contain;
          background: #000;
        }
        video.vsl-video:fullscreen::backdrop {
          background: #000;
        }
      `}</style>
      {!playing ? (
        <>
          <Image src={posterUrl} alt={posterAlt} fill sizes="360px" className="object-cover" />
          <button type="button" onClick={handlePlay} aria-label={playLabel} aria-disabled={!videoUrl} className="absolute inset-0 flex items-center justify-center group">
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
        <video className="vsl-video absolute inset-0 w-full h-full object-cover" controls playsInline preload="metadata" autoPlay poster={posterUrl}>
          <source src={videoUrl!} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
