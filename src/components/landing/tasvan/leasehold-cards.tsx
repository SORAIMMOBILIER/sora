import { DISPLAY, C } from "./tokens"

export type LeaseholdCard = { value: string; text: string }

// "Ce que vous possédez" : trois cartes sur le leasehold (30 ans / +30 ans
// / 60 ans), dans le style des cartes de la brochure — bordées, arrondies.
export default function LeaseholdCards({ cards, bottomLine }: { cards: LeaseholdCard[]; bottomLine: string }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {cards.map((c) => (
          <article key={c.value} className="border rounded-[18px] px-7 py-[30px]" style={{ borderColor: C.line }}>
            <p className="text-[clamp(32px,3.6vw,44px)] leading-none font-light" style={{ fontFamily: DISPLAY, color: C.ink }}>
              {c.value}
            </p>
            <p className="text-[15px] mt-[18px]" style={{ color: C.muted }}>
              {c.text}
            </p>
          </article>
        ))}
      </div>
      <p className="text-[14.5px] mt-8" style={{ color: C.muted }}>
        {bottomLine}
      </p>
    </div>
  )
}
