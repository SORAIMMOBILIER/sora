"use client"
import { useRef, useState } from "react"
import { Play } from "lucide-react"
import { cloudinaryVideoUrl, cloudinaryPosterUrl } from "@/lib/cloudinary"

// Mêmes trois témoignages vidéo que la home (src/components/sections/
// testimonials-section.tsx), sans GSAP/ScrollTrigger : ces pages de
// campagne ont délibérément retiré GSAP pour la performance (voir
// ConditionalSmoothScroll). Version allégée, même données.
const VIDEOS = [
  {
    src: cloudinaryVideoUrl("https://res.cloudinary.com/dfpaw573r/video/upload/v1783822918/Il_investit_en_3_e%CC%81tapes_cinbuf.mp4"),
    poster: cloudinaryPosterUrl("https://res.cloudinary.com/dfpaw573r/video/upload/so_0/v1783822918/Il_investit_en_3_e%CC%81tapes_cinbuf.jpg", 600),
  },
  {
    src: cloudinaryVideoUrl("https://res.cloudinary.com/dfpaw573r/video/upload/v1783822922/Investir_a%CC%80_Bali_Cle%CC%81mentine_raconte_son_expe%CC%81rience_dans_l_immobilier_a%CC%80_Canggu._vycims.mp4"),
    poster: cloudinaryPosterUrl("https://res.cloudinary.com/dfpaw573r/video/upload/so_0/v1783822922/Investir_a%CC%80_Bali_Cle%CC%81mentine_raconte_son_expe%CC%81rience_dans_l_immobilier_a%CC%80_Canggu._vycims.jpg", 1000),
  },
  {
    src: cloudinaryVideoUrl("https://res.cloudinary.com/dfpaw573r/video/upload/v1783822919/Bali_a%CC%80_la_hauteur_des_meilleurs_marche%CC%81s_jdkzln.mp4"),
    poster: cloudinaryPosterUrl("https://res.cloudinary.com/dfpaw573r/video/upload/so_0/v1783822919/Bali_a%CC%80_la_hauteur_des_meilleurs_marche%CC%81s_jdkzln.jpg", 600),
  },
]

function VideoCard({ src, poster, listenLabel }: { src: string; poster: string; listenLabel: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden bg-black/10">
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
            <Play className="h-9 w-9 text-background" fill="currentColor" />
            <span className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-background">{listenLabel}</span>
          </div>
        </button>
      )}
    </div>
  )
}

export default function VideoTestimonials({ quote, listenLabel }: { quote: string; listenLabel: string }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {VIDEOS.map((v, i) => (
          <VideoCard key={i} src={v.src} poster={v.poster} listenLabel={listenLabel} />
        ))}
      </div>
      <blockquote className="font-serif italic text-background text-[18px] md:text-[20px] leading-snug mt-8 max-w-[640px] mx-auto">
        {quote}
      </blockquote>
    </div>
  )
}
