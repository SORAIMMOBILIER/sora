import RoiCells, { type Stat } from "./roi-cells"
import { H2, Kicker } from "./primitives"
import { C } from "./tokens"

// `.mgmt` adapté : nos trois cellules `.roi` au-dessus du titre, puis la
// liste en deux colonnes (demande explicite, remplace le gros chiffre
// unique de Tasvan).
export default function GestionBlock({
  overline,
  title,
  intro,
  stats,
  lines,
}: {
  overline: string
  title: string
  intro: string
  stats: Stat[]
  lines: string[]
}) {
  return (
    <div>
      <RoiCells stats={stats} />
      <div className="mt-10">
        <Kicker>{overline}</Kicker>
        <div className="mt-4">
          <H2>{title}</H2>
        </div>
        <p className="text-[16px] mt-[18px] max-w-[60ch]" style={{ color: C.muted }}>
          {intro}
        </p>
      </div>
      <ul className="list-none p-0 mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-7">
        {lines.map((l) => (
          <li key={l} className="py-[14px] border-b text-[14.5px]" style={{ borderColor: C.line, color: C.ink }}>
            {l}
          </li>
        ))}
      </ul>
    </div>
  )
}
