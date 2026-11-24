"use client"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Play } from "lucide-react"
import { useTranslations } from "next-intl"

export type Testimonial = {
  quote: string
  image: string
  imageAlt?: string
  author?: string
  role?: string
}

const BLOB_BASE = "https://op0brcoce22t6d5s.public.blob.vercel-storage.com/temoignages"

// Posters dimensionnés pour ~1024px de conteneur (max-w-5xl) : VIDEOS[1] sert
// en pleine largeur sur mobile et en colonne centrale sur desktop (le contexte
// le plus large), VIDEOS[0]/[2] ne servent qu'en colonnes latérales étroites.
const VIDEOS = [
  { src: `${BLOB_BASE}/il-investit.mp4`, poster: "/media/temoignages/il-investit.webp" },
  { src: `${BLOB_BASE}/clementine.mp4`, poster: "/media/temoignages/clementine.webp" },
  { src: `${BLOB_BASE}/bali-marches.mp4`, poster: "/media/temoignages/bali-marches.webp" },
]

function VideoCard({ src, poster, aspect }: { src: string; poster: string; aspect: string }) {
  const t = useTranslations("Home.Testimonials")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    const v = videoRef.current
    if (!v) return
    v.play()
  }

  return (
    <div className={`relative rounded-sm overflow-hidden ${aspect}`}>
      <video
        ref={videoRef}
        src={src}
        controls={playing}
        playsInline
        preload="none"
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 z-10 w-full h-full cursor-pointer group"
        >
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/90 text-primary shadow-lg">
              <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
            </span>
            <span className="text-background text-sm font-medium tracking-wide uppercase">
              {t("listen")}
            </span>
          </div>
        </button>
      )}
    </div>
  )
}

export default function TestimonialsSection() {
  const t = useTranslations("Home.Testimonials")
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tm-item", { opacity: 0, y: 28, duration: 0.9, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-accent py-12 md:py-16 px-6">
      <div className="container-page max-w-5xl">
        {/* Mobile : titre + vidéo horizontale + quote */}
        <div className="md:hidden">
          <div className="text-center mb-6">
            <p className="tm-item eyebrow-dark mb-3">{t("eyebrow")}</p>
            <h2 className="tm-item font-serif font-medium text-background leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,48px)" }}>
              {t("title")}
            </h2>
          </div>
          <div className="tm-item relative rounded-sm overflow-hidden aspect-video">
            <video
              src={VIDEOS[1].src}
              poster={VIDEOS[1].poster}
              controls
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <blockquote className="tm-item text-center font-serif italic text-background text-lg leading-snug px-4 py-5">
            {t("quote")}
          </blockquote>
        </div>

        {/* Desktop : bento 3 colonnes compact */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr] gap-3 items-stretch">
          <div className="tm-item">
            <VideoCard src={VIDEOS[0].src} poster={VIDEOS[0].poster} aspect="h-full" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-center py-4">
              <p className="tm-item eyebrow-dark mb-3">{t("eyebrow")}</p>
              <h2 className="tm-item font-serif font-medium text-background leading-[1.0]" style={{ fontSize: "clamp(28px,3.5vw,52px)" }}>
                {t("title")}
              </h2>
            </div>
            <div className="tm-item">
              <VideoCard src={VIDEOS[1].src} poster={VIDEOS[1].poster} aspect="aspect-video" />
            </div>
            <blockquote className="tm-item text-center font-serif italic text-background text-base md:text-lg leading-snug px-4 py-3">
              {t("quote")}
            </blockquote>
          </div>
          <div className="tm-item">
            <VideoCard src={VIDEOS[2].src} poster={VIDEOS[2].poster} aspect="h-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
