"use client"
import { useRef, useState } from "react"
import { Play } from "lucide-react"

export type TestimonialCardProps = {
  quote: string
  author?: string
  role?: string
  videoUrlDesktop?: string
  videoUrlMobile?: string
  posterUrl?: string
}

function deriveCloudinaryPoster(videoUrl: string): string | undefined {
  const match = videoUrl.match(/\/video\/upload\/(.*)\.[a-zA-Z0-9]+$/)
  if (!match) return undefined
  return `${videoUrl.slice(0, videoUrl.indexOf("/video/upload/"))}/video/upload/so_0/${match[1]}.jpg`
}

export default function TestimonialCard({ quote, author, role, videoUrlDesktop, videoUrlMobile, posterUrl }: TestimonialCardProps) {
  const desktopRef = useRef<HTMLVideoElement>(null)
  const mobileRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const desktopSrc = videoUrlDesktop || videoUrlMobile
  const mobileSrc = videoUrlMobile || videoUrlDesktop
  const desktopPoster = posterUrl || (desktopSrc ? deriveCloudinaryPoster(desktopSrc) : undefined)
  const mobilePoster = posterUrl || (mobileSrc ? deriveCloudinaryPoster(mobileSrc) : undefined)

  const handlePlay = () => {
    desktopRef.current?.play()
    mobileRef.current?.play()
  }

  return (
    <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-ink">
      {desktopSrc ? (
        <video
          ref={desktopRef}
          src={desktopSrc}
          poster={desktopPoster}
          controls={playing}
          playsInline
          preload="metadata"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      ) : desktopPoster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={desktopPoster} alt={author || ""} className="absolute inset-0 hidden h-full w-full object-cover md:block" />
      ) : null}

      {mobileSrc ? (
        <video
          ref={mobileRef}
          src={mobileSrc}
          poster={mobilePoster}
          controls={playing}
          playsInline
          preload="metadata"
          className="absolute inset-0 block h-full w-full object-cover md:hidden"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      ) : mobilePoster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mobilePoster} alt={author || ""} className="absolute inset-0 block h-full w-full object-cover md:hidden" />
      ) : null}

      {(desktopSrc || mobileSrc) && !playing && (
        <>
          {/* Desktop : gros bouton centré */}
          <button
            onClick={handlePlay}
            aria-label="Lire le témoignage"
            className="absolute inset-0 z-20 hidden h-full w-full cursor-pointer items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35 md:flex"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bg/90 text-ink shadow-lg transition-transform group-hover:scale-105">
              <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
            </span>
          </button>

          {/* Mobile : petit bandeau en haut de la carte */}
          <button
            onClick={handlePlay}
            aria-label="Lire le témoignage"
            className="absolute left-1/2 top-3 z-20 flex -translate-x-1/2 cursor-pointer items-center gap-1.5 rounded-full bg-bg/90 px-3 py-1.5 text-ink shadow-md md:hidden"
          >
            <Play className="h-3 w-3" fill="currentColor" />
            <span className="text-[11px] font-semibold uppercase tracking-wide">Lancer le témoignage</span>
          </button>
        </>
      )}

      {!playing && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/25 to-transparent px-5 pb-5 pt-16">
          {author && <p className="font-serif text-lg text-bg leading-tight">{author}</p>}
          {role && <p className="metadata mt-1 text-bg/60">{role}</p>}
          <p className="mt-2 text-sm leading-snug text-bg/85 line-clamp-3">{quote}</p>
        </div>
      )}
    </div>
  )
}
