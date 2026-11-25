"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Btn } from "./primitives"
import { DISPLAY } from "./tokens"

// Hero plein écran — page A uniquement (voir hero.tsx pour la page B,
// disposition texte/vidéo deux colonnes conservée). Vidéo de fond
// (rizières), muette, en boucle, playsinline, voile sombre pour la
// lisibilité du texte blanc superposé en bas à gauche. Sans vidéo
// (bgVideoUrl absent), l'image d'accueil reste affichée seule.
//
// Vitesse mobile (LCP) : l'image d'accueil est le véritable élément LCP —
// next/image priority + fetchPriority="high" (Next injecte le preload
// correspondant dans <head>). La vidéo ne commence son chargement
// qu'après l'affichage complet de la page (load, ou requestIdleCallback
// en relais), pour ne jamais concurrencer l'image au premier rendu ; elle
// apparaît en fondu une fois prête à jouer. Sur petit écran, une version
// légère (720p max) de la vidéo est chargée à la place de l'originale.
export default function TasvanHeroFullBleed({
  overline,
  title,
  subtitle,
  bgVideoUrl,
  bgVideoUrlMobile,
  posterUrl,
  posterAlt,
  ctaLabel,
  anchor,
}: {
  overline: string
  title: string
  subtitle: string
  bgVideoUrl?: string
  bgVideoUrlMobile?: string
  posterUrl: string
  posterAlt: string
  ctaLabel: string
  anchor: string
}) {
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined)
  const [videoVisible, setVideoVisible] = useState(false)

  useEffect(() => {
    if (!bgVideoUrl) return

    const startLoadingVideo = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches
      setVideoSrc(isMobile && bgVideoUrlMobile ? bgVideoUrlMobile : bgVideoUrl)
    }

    const deferToIdle = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(startLoadingVideo, { timeout: 2000 })
      } else {
        setTimeout(startLoadingVideo, 200)
      }
    }

    if (document.readyState === "complete") {
      deferToIdle()
      return
    }
    window.addEventListener("load", deferToIdle, { once: true })
    return () => window.removeEventListener("load", deferToIdle)
  }, [bgVideoUrl, bgVideoUrlMobile])

  return (
    <div className="tasvan-hero-fullbleed relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
      <style>{`
        /* Desktop : 100vh moins le header (68px) et la bande des gammes
           (~290px mesurés) pour que la bande soit visible au premier
           écran. Mobile : 85vh (pas de bande à soustraire, demande
           explicite). */
        .tasvan-hero-fullbleed, .tasvan-hero-fullbleed .hero-fill { height: 85vh; }
        @media (min-width: 768px) {
          .tasvan-hero-fullbleed, .tasvan-hero-fullbleed .hero-fill { height: calc(100vh - 68px - 290px); }
        }
      `}</style>
      <Image
        src={posterUrl}
        alt={posterAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      {bgVideoUrl && videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoVisible(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in"
          style={{ opacity: videoVisible ? 1 : 0 }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(20,20,18,.65),rgba(20,20,18,.25))" }} />
      <div className="hero-fill relative z-10 flex flex-col justify-end">
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pb-8 md:pb-12 w-full">
          <p className="text-[12px] font-medium uppercase tracking-[.2em] mb-4 text-white/85">{overline}</p>
          <h1
            className="text-[clamp(32px,5vw,56px)] max-w-[16ch] leading-[1.08] font-extralight text-white"
            style={{ fontFamily: DISPLAY, fontWeight: 200, textWrap: "balance" }}
          >
            {title}
          </h1>
          <p
            className="text-[clamp(16px,1.6vw,19px)] mt-5 max-w-[46ch] leading-[1.4] font-light text-white/90"
            style={{ fontFamily: DISPLAY }}
          >
            {subtitle}
          </p>
          <div className="mt-8">
            <Btn href={anchor}>{ctaLabel}</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}
