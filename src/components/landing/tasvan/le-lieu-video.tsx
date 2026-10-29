import SpecsList, { type Row } from "./specs-list"
import { Kicker, H2 } from "./primitives"

// "Le lieu" : vidéo du hero du site principal en fond, lecture automatique,
// en boucle, sans son, voile sombre pour la lisibilité du texte par-dessus.
export default function LeLieuVideo({
  overline,
  title,
  videoSrc,
  posterSrc,
  rows,
}: {
  overline: string
  title: string
  videoSrc: string
  posterSrc: string
  rows: Row[]
}) {
  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden" style={{ minHeight: "640px" }}>
      <video autoPlay muted loop playsInline preload="metadata" poster={posterSrc} className="absolute inset-0 w-full h-full object-cover">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: "rgba(38,38,38,.6)" }} />
      <div className="relative z-10 max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(72px,11vw,140px)]">
        <Kicker light>{overline}</Kicker>
        <div className="mt-4">
          <H2 light>{title}</H2>
        </div>
        <div className="mt-10 max-w-[560px]" style={{ color: "#fff" }}>
          <SpecsList rows={rows} light />
        </div>
      </div>
    </div>
  )
}
