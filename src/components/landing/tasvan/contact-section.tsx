import { DISPLAY, C } from "./tokens"
import { H2 } from "./primitives"
import EntretienEmbed from "@/components/landing/maison-seseh-bali/entretien-embed"

// `.contact` : fond sombre + photo, texte blanc à gauche, formulaire (fond
// papier) à droite. Pas de code d'intégration GoHighLevel disponible ici
// (voir docs/tasvan-tokens.md) — on garde EntretienEmbed dans la carte.
export default function ContactSection({
  title,
  intro,
  photoSrc,
  formTitle,
  formHint,
  embedCode,
  embedSource,
}: {
  title: string
  intro: string
  photoSrc?: string
  formTitle: string
  formHint: string
  embedCode?: string
  embedSource: string
}) {
  return (
    <div className="relative text-white" style={{ background: "#1d2a2c" }}>
      {photoSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoSrc} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[.55]" />
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(15,20,20,.55),rgba(15,20,20,.8))" }} />
      <div className="relative z-10 max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(72px,11vw,140px)] grid grid-cols-1 md:grid-cols-2 gap-[clamp(32px,6vw,80px)] items-center">
        <div>
          <H2 light>{title}</H2>
          <p className="mt-5 max-w-[44ch] text-white/85">{intro}</p>
        </div>
        <div className="bg-white text-[#1f1f1e] p-[clamp(24px,4vw,40px)]">
          <h3 className="text-[30px] font-light" style={{ fontFamily: DISPLAY }}>
            {formTitle}
          </h3>
          <p className="text-[14px] mt-2" style={{ color: C.muted }}>
            {formHint}
          </p>
          <div className="mt-5">
            <EntretienEmbed embedCode={embedCode} source={embedSource} />
          </div>
        </div>
      </div>
    </div>
  )
}
