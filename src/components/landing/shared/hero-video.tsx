"use client"
import { useState } from "react"
import Image from "next/image"
import { cloudinaryVideoUrl } from "@/lib/cloudinary"
import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"
import { trackCustom } from "@/components/landing/maison-seseh-bali/track"

// Hero en deux colonnes (texte / vidéo), fond blanc — remplace le
// carrousel plein écran sur les pages qui ont une vidéo de présentation.
// Tant que videoUrl n'est pas fourni : image d'accueil fixe, bouton
// lecture visuellement présent mais inactif (pas de clic sans vidéo).
export default function HeroVideo({
  overline,
  title,
  subtitle,
  videoUrl,
  posterUrl,
  posterAlt,
  ctaLabel,
  anchor,
  page,
}: {
  overline: string
  title: string
  subtitle: string
  videoUrl?: string
  posterUrl: string
  posterAlt: string
  ctaLabel: string
  anchor: string
  page: string
}) {
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (!videoUrl) return
    setPlaying(true)
    trackCustom("LP_HeroVideoPlay", { page })
  }

  return (
    <div className="hero-video-grid grid gap-x-10 gap-y-6 md:items-center">
      <style>{`
        .hero-video-grid {
          grid-template-columns: 1fr;
          grid-template-areas: "top" "video" "bottom";
        }
        @media (min-width: 768px) {
          .hero-video-grid {
            grid-template-columns: 5fr 7fr;
            grid-template-areas: "top video" "bottom video";
          }
        }
      `}</style>
      <div style={{ gridArea: "top" }}>
        <p className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-accent mb-4">{overline}</p>
        <h1 className="font-serif font-normal text-foreground leading-[1.05] text-[32px] md:text-[56px]">{title}</h1>
      </div>

      <div style={{ gridArea: "video" }}>
        <div className="relative w-full aspect-video bg-secondary/40">
          {!playing ? (
            <>
              <Image src={posterUrl} alt={posterAlt} fill priority fetchPriority="high" sizes="(max-width:768px) 100vw, 58vw" className="object-cover" />
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Lire la vidéo"
                aria-disabled={!videoUrl}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <span className="absolute inset-0 bg-foreground/10 transition-colors group-hover:bg-foreground/20" />
                <span className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                  <svg className="w-6 h-6 text-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            </>
          ) : (
            <video className="absolute inset-0 w-full h-full object-cover" controls playsInline autoPlay poster={posterUrl}>
              <source src={cloudinaryVideoUrl(videoUrl!)} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      <div style={{ gridArea: "bottom" }}>
        <p className="font-sans text-[16px] leading-[1.5] text-foreground/70">{subtitle}</p>
        <div className="mt-6">
          <CtaLink section="hero" label={ctaLabel} anchor={anchor} page={page} />
        </div>
      </div>
    </div>
  )
}
