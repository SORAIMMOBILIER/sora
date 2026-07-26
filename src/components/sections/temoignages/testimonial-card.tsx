"use client"
import { useRef, useState } from "react"
import { Play } from "lucide-react"

export type TestimonialCardProps = {
  quote: string
  author?: string
  role?: string
  videoUrl?: string
  posterUrl?: string
}

function deriveCloudinaryPoster(videoUrl: string): string | undefined {
  const match = videoUrl.match(/\/video\/upload\/(.*)\.[a-zA-Z0-9]+$/)
  if (!match) return undefined
  return `${videoUrl.slice(0, videoUrl.indexOf("/video/upload/"))}/video/upload/so_0/${match[1]}.jpg`
}

export default function TestimonialCard({ quote, author, role, videoUrl, posterUrl }: TestimonialCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const poster = posterUrl || (videoUrl ? deriveCloudinaryPoster(videoUrl) : undefined)

  const handlePlay = () => {
    videoRef.current?.play()
  }

  return (
    <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-ink">
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={poster}
          controls={playing}
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt={author || ""} className="absolute inset-0 h-full w-full object-cover" />
      ) : null}

      {videoUrl && !playing && (
        <button
          onClick={handlePlay}
          aria-label="Lire le témoignage"
          className="absolute inset-0 z-20 flex h-full w-full cursor-pointer items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bg/90 text-ink shadow-lg transition-transform group-hover:scale-105">
            <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
          </span>
        </button>
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
