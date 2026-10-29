import MediaSlot from "@/components/landing/shared/media-slot"
import { Kicker, H2 } from "./primitives"
import FiletRows, { type Row } from "./filet-rows"
import { C } from "./tokens"

// "Un intérieur à votre image" : portrait de Julie à gauche, titre + ligne
// + les quatre étapes en lignes à filets à droite, sur ordinateur —
// inchangé. Sur mobile uniquement (demande explicite) : titre, puis
// photo, puis texte — via grid-template-areas nommées (ordre indépendant
// du DOM), row-gap à 0 et marges internes identiques à l'ancienne
// version pour ne rien changer visuellement sur ordinateur.
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
    <div className="julie-grid grid gap-y-0 items-start">
      <style>{`
        .julie-grid {
          grid-template-columns: 1fr;
          grid-template-areas: "kicker" "title" "photo" "line" "rows" "disclaimer";
        }
        @media (min-width: 768px) {
          .julie-grid {
            column-gap: clamp(40px,7vw,110px);
            grid-template-columns: 1.05fr .95fr;
            grid-template-areas: "photo kicker" "photo title" "photo line" "photo rows" "photo disclaimer";
          }
        }
      `}</style>
      <div style={{ gridArea: "kicker" }}>
        <Kicker>{overline}</Kicker>
      </div>
      <div style={{ gridArea: "title" }} className="mt-4">
        <H2>{title}</H2>
      </div>
      <div style={{ gridArea: "photo" }} className="mt-6 md:mt-0">
        <div className="relative w-full aspect-[4/5] max-h-[560px]">
          <MediaSlot src={portraitSrc} alt={portraitCaption} label={pendingLabel} sizes="(max-width:768px) 100vw, 480px" />
        </div>
        <p className="text-[13px] mt-2" style={{ color: C.muted }}>
          {portraitCaption}
        </p>
      </div>
      <p style={{ gridArea: "line", color: C.muted }} className="text-[16px] mt-[18px] max-w-[60ch]">
        {line}
      </p>
      <div style={{ gridArea: "rows" }}>
        <FiletRows rows={rows} />
      </div>
      {disclaimerLine && (
        <p style={{ gridArea: "disclaimer", color: C.muted }} className="text-[13px] mt-5">
          {disclaimerLine}
        </p>
      )}
    </div>
  )
}
