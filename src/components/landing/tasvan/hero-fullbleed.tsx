import { cloudinaryVideoUrl } from "@/lib/cloudinary"
import { Btn } from "./primitives"
import { DISPLAY } from "./tokens"

// Hero plein écran — page A uniquement (voir hero.tsx pour la page B,
// disposition texte/vidéo deux colonnes conservée). Vidéo de fond
// (rizières), muette, en boucle, playsinline, image d'accueil pendant le
// chargement, voile sombre pour la lisibilité du texte blanc superposé en
// bas à gauche. Sans vidéo (bgVideoUrl absent), affiche juste l'image
// d'accueil en fond.
export default function TasvanHeroFullBleed({
  overline,
  title,
  subtitle,
  bgVideoUrl,
  posterUrl,
  posterAlt,
  ctaLabel,
  anchor,
}: {
  overline: string
  title: string
  subtitle: string
  bgVideoUrl?: string
  posterUrl: string
  posterAlt: string
  ctaLabel: string
  anchor: string
}) {
  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden" style={{ minHeight: "calc(100svh - 68px)" }}>
      {bgVideoUrl ? (
        <video autoPlay muted loop playsInline preload="metadata" poster={posterUrl} className="absolute inset-0 w-full h-full object-cover">
          <source src={cloudinaryVideoUrl(bgVideoUrl)} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={posterUrl} alt={posterAlt} className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(20,20,18,.65),rgba(20,20,18,.25))" }} />
      <div className="relative z-10 flex flex-col justify-end" style={{ minHeight: "calc(100svh - 68px)" }}>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] pb-[clamp(40px,8vw,88px)] pt-[120px] w-full">
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
