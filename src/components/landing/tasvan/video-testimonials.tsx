"use client"
import { useRef, useState } from "react"
import { Play } from "lucide-react"
import { C } from "./tokens"

export type TestimonialItem = { firstName: string; quote: string; videoSrc: string; poster: string }

// Les témoignages vidéo de https://www.sora-immobilier.com/temoignages
// (mêmes vidéos, mêmes citations), dans une galerie à glisser — même
// composant que les photos : 88 % de largeur, premier calé à gauche, le
// suivant dépasse d'environ 12 % à droite.
function VideoCard({ src, poster, listenLabel }: { src: string; poster: string; listenLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-black/10">
      <video
        ref={videoRef}
        src={src}
        controls={playing}
        playsInline
        preload="metadata"
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button type="button" onClick={() => videoRef.current?.play()} className="absolute inset-0 z-10 w-full h-full group" aria-label={listenLabel}>
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#1f1f1e]">
              <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
            </span>
            <span className="text-[12px] font-medium uppercase tracking-[.16em] text-white">{listenLabel}</span>
          </div>
        </button>
      )}
    </div>
  )
}

export default function VideoTestimonials({ items, listenLabel }: { items: TestimonialItem[]; listenLabel: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 0
    const next = Math.round(ratio * (items.length - 1))
    setIndex(Math.min(Math.max(next, 0), items.length - 1))
  }

  return (
    <div className="mt-14">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <div key={i} className="shrink-0 w-[88%] sm:w-[46%] md:w-[29%] snap-start">
            <VideoCard src={t.videoSrc} poster={t.poster} listenLabel={listenLabel} />
            <p className="text-[14px] font-semibold mt-3" style={{ color: C.ink }}>
              {t.firstName}
            </p>
            <p className="text-[13px] mt-1" style={{ color: C.muted }}>
              {t.quote}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 text-[13px]" style={{ color: C.muted }}>
        <p>
          {index + 1} / {items.length}
        </p>
      </div>
    </div>
  )
}
