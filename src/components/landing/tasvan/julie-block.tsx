import MediaSlot from "@/components/landing/shared/media-slot"
import { Kicker, H2 } from "./primitives"
import FiletRows, { type Row } from "./filet-rows"
import { C } from "./tokens"

// "Un intérieur à votre image" : portrait de Julie à gauche, titre + ligne
// + les quatre étapes en lignes à filets à droite.
export default function JulieBlock({
  overline,
  title,
  line,
  portraitSrc,
  portraitCaption,
  rows,
  disclaimerLine,
  pendingLabel,
}: {
  overline: string
  title: string
  line: string
  portraitSrc?: string
  portraitCaption: string
  rows: Row[]
  disclaimerLine?: string
  pendingLabel: string
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.05fr_.95fr] gap-[clamp(40px,7vw,110px)] items-start">
      <div>
        <div className="relative w-full aspect-[4/5] max-h-[560px]">
          <MediaSlot src={portraitSrc} alt={portraitCaption} label={pendingLabel} sizes="(max-width:768px) 100vw, 480px" />
        </div>
        <p className="text-[13px] mt-2" style={{ color: C.muted }}>
          {portraitCaption}
        </p>
      </div>
      <div>
        <Kicker>{overline}</Kicker>
        <div className="mt-4">
          <H2>{title}</H2>
        </div>
        <p className="text-[16px] mt-[18px] max-w-[60ch]" style={{ color: C.muted }}>
          {line}
        </p>
        <FiletRows rows={rows} />
        {disclaimerLine && (
          <p className="text-[13px] mt-5" style={{ color: C.muted }}>
            {disclaimerLine}
          </p>
        )}
      </div>
    </div>
  )
}
