import { DISPLAY, C } from "./tokens"

// `.duo` : deux cartes bordées arrondies 18px, côte à côte. La seconde,
// sombre (`.dark`), porte un gros chiffre — ici notre garantie 7 %.
export default function DuoCards({
  leftTitle,
  leftBody,
  rightValue,
  rightLabel,
}: {
  leftTitle: string
  leftBody: string
  rightValue: string
  rightLabel: string
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
      <article className="border rounded-[18px] px-7 py-[30px]" style={{ borderColor: C.line }}>
        <h3 className="text-[32px] font-light leading-[1.08] tracking-[-.01em]" style={{ fontFamily: DISPLAY, color: C.ink }}>
          {leftTitle}
        </h3>
        <p className="text-[15px] mt-[18px]" style={{ color: C.muted }}>
          {leftBody}
        </p>
      </article>
      <article className="rounded-[18px] px-7 py-[30px]" style={{ background: C.card, color: C.cardInk }}>
        <p className="text-[clamp(52px,7vw,80px)] leading-none font-extralight" style={{ fontFamily: DISPLAY, fontWeight: 200 }}>
          {rightValue}
        </p>
        <p className="text-[12px] font-medium uppercase tracking-[.16em] mt-[10px]" style={{ color: C.cardMuted }}>
          {rightLabel}
        </p>
      </article>
    </div>
  )
}
