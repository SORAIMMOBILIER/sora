import MediaSlot from "@/components/landing/shared/media-slot"
import { Kicker, H2 } from "./primitives"
import { DISPLAY, BODY, C } from "./tokens"

// `.team` : photo pleine largeur 16:8, citation en display 300, nom en
// capitales grises.
export default function TeamSection({
  overline,
  title,
  intro,
  photoSrc,
  photoAlt,
  quote,
  name,
  role,
  pendingLabel,
}: {
  overline: string
  title: string
  intro: string
  photoSrc?: string
  photoAlt: string
  quote: string
  name: string
  role: string
  pendingLabel: string
}) {
  return (
    <div>
      <Kicker>{overline}</Kicker>
      <div className="mt-4">
        <H2>{title}</H2>
      </div>
      <p className="text-[16px] mt-[18px] max-w-[60ch]" style={{ color: C.muted }}>
        {intro}
      </p>
      <div className="relative w-full aspect-[16/8] mt-12">
        <MediaSlot src={photoSrc} alt={photoAlt} label={pendingLabel} sizes="100vw" />
      </div>
      <blockquote
        className="text-[clamp(22px,2.8vw,32px)] font-light leading-[1.35] max-w-[36ch] mt-10 not-italic"
        style={{ fontFamily: DISPLAY, color: C.ink }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      <cite className="block not-italic text-[13px] uppercase tracking-[.16em] mt-[22px]" style={{ fontFamily: BODY, color: C.muted }}>
        {name}, {role}
      </cite>
    </div>
  )
}
