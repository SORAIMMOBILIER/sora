"use client"
import { useState } from "react"
import Image from "next/image"
import { cloudinaryVideoUrl } from "@/lib/cloudinary"
import { trackCustom } from "@/components/landing/maison-seseh-bali/track"
import { Btn } from "./primitives"
import { DISPLAY, C } from "./tokens"

// Hero : notre disposition (texte à gauche / vidéo à droite) conservée —
// demande explicite — avec les tailles, graisses et boutons mesurés sur
// tasvanlombok.com appliqués dessus. Chez Tasvan le texte est blanc sur
// une photo plein écran ; chez nous il reste sur fond blanc (colonne de
// texte, pas de fond photo) donc en encre foncée — seule adaptation de
// couleur, annoncée dans docs/tasvan-tokens.md.
export default function TasvanHero({
  overline,
  title,
  subtitle,
  videoUrl,
  posterUrl,
  posterAlt,
  ctaLabel,
  anchor,
  page,
  videoPendingLabel,
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
  videoPendingLabel: string
}) {
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    if (!videoUrl) return
    setPlaying(true)
    trackCustom("LP_HeroVideoPlay", { page })
  }

  return (
    <div className="tasvan-hero-grid grid gap-x-10 gap-y-6 md:items-center">
      <style>{`
        .tasvan-hero-grid { grid-template-columns: 1fr; grid-template-areas: "top" "video" "bottom"; }
        @media (min-width: 768px) {
          .tasvan-hero-grid { grid-template-columns: 5fr 7fr; grid-template-areas: "top video" "bottom video"; }
        }
      `}</style>
      <div style={{ gridArea: "top" }}>
        {/* Surtitre un peu plus visible que le kicker standard (13px,
            encre pleine au lieu du gris) sans dominer le titre. */}
        <p className="text-[13px] font-medium uppercase tracking-[.2em] mb-[22px]" style={{ color: C.ink }}>
          {overline}
        </p>
        {/*
          Tasvan : clamp(46px,9vw,108px) — mesuré, mais leur titre ("Villas
          avec piscine privée", 4 mots) tient en 2 lignes à cette taille
          dans un hero plein écran. Le nôtre ("Votre capital dort sur un
          compte...", 16 mots) dans une colonne de 5/12 producerait 9+
          lignes très courtes, illisible sans scroller avant même la
          vidéo. Seule taille réduite de toute cette branche, annoncée
          dans docs/tasvan-tokens.md et le rapport final — tout le reste
          est la valeur mesurée telle quelle.
        */}
        <h1
          className="text-[clamp(34px,4.6vw,58px)] max-w-[14ch] leading-[1.05] font-extralight"
          style={{ fontFamily: DISPLAY, fontWeight: 200, color: C.ink }}
        >
          {title}
        </h1>
      </div>

      <div style={{ gridArea: "video" }}>
        <div className="relative w-full aspect-video bg-black/10">
          {!playing ? (
            <>
              <Image src={posterUrl} alt={posterAlt} fill priority fetchPriority="high" sizes="(max-width:768px) 100vw, 58vw" className="object-cover" />
              <button type="button" onClick={handlePlay} aria-label="Lire la vidéo" aria-disabled={!videoUrl} className="absolute inset-0 flex items-center justify-center group">
                <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                <span className="relative flex flex-col items-center gap-3">
                  <span className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
                    <svg className="w-6 h-6 ml-1" fill={C.ink} viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  {!videoUrl && (
                    <span className="text-[12px] font-medium uppercase tracking-[.16em] text-white">{videoPendingLabel}</span>
                  )}
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
        <p
          className="text-[clamp(18px,2vw,22px)] mt-[26px] max-w-[32ch] leading-[1.3] font-light"
          style={{ fontFamily: DISPLAY, color: C.ink }}
        >
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-[14px] mt-[34px]">
          <Btn href={anchor}>{ctaLabel}</Btn>
        </div>
      </div>
    </div>
  )
}
