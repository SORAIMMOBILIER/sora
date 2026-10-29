import { DISPLAY, C } from "./tokens"

export type Founder = { name: string; role: string; portrait: string; bio: string }

// Deux colonnes, une par fondateur : portrait à gauche, texte à droite.
// Empilé sur mobile (portrait au-dessus du texte).
export default function FounderCards({ founders }: { founders: Founder[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 mt-12">
      {founders.map((f) => (
        <div key={f.name} className="grid grid-cols-[96px_1fr] gap-5 items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={f.portrait} alt={f.name} className="w-[96px] h-[96px] rounded-full object-cover" />
          <div>
            <p className="text-[18px] font-light" style={{ fontFamily: DISPLAY, color: C.ink }}>
              {f.name}
            </p>
            <p className="text-[13px] mt-[2px]" style={{ color: C.muted }}>
              {f.role}
            </p>
            <p className="text-[14.5px] mt-3 leading-[1.5]" style={{ color: C.muted }}>
              {f.bio}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
