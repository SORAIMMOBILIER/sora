"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"

export type HeroImage = { src: string; alt: string }

const SLIDE_MS = 5000

// Carrousel plein écran, fondu entre les images, voile sombre du bas,
// texte en bas à gauche, traits de progression au bord inférieur.
export default function HeroCarousel({
  images,
  overline,
  title,
  subtitle,
  ctaLabel,
  anchor,
  page,
}: {
  images: HeroImage[]
  overline: string
  title: string
  subtitle: string
  ctaLabel: string
  anchor: string
  page: string
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <div className="relative w-full h-[calc(100vh-68px)] min-h-[480px] max-h-[900px] bg-foreground overflow-hidden">
      {images.map((img, i) => (
        <div key={img.src} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === index ? 1 : 0 }}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            fetchPriority={i === 0 ? "high" : undefined}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div
        className="absolute inset-x-0 bottom-0 h-full pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 60%)" }}
      />

      <div className="absolute inset-x-0 bottom-0 pb-12">
        <div className="max-w-[1060px] mx-auto px-5 md:px-0">
          <p className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-white mb-4">{overline}</p>
          <h1 className="font-serif font-normal text-white leading-[1.05] text-[44px] md:text-[80px] max-w-[900px]">
            {title}
          </h1>
          <p className="font-sans text-white text-[18px] mt-4 max-w-[560px]">{subtitle}</p>
          <div className="mt-8">
            <CtaLink section="hero" label={ctaLabel} anchor={anchor} page={page} />
          </div>
        </div>

        {images.length > 1 && (
          <div className="max-w-[1060px] mx-auto px-5 md:px-0 mt-8 flex gap-2">
            {images.map((img, i) => (
              <div key={img.src} className="h-px flex-1 bg-white/30 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-white transition-all"
                  style={{ width: i === index ? "100%" : i < index ? "100%" : "0%", transitionDuration: i === index ? `${SLIDE_MS}ms` : "0ms" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
