import RoiCells, { type Stat } from "./roi-cells"
import { H2, Kicker } from "./primitives"
import { C } from "./tokens"

// Titre, intro et les six lignes d'abord, les trois cellules `.roi` de
// chiffres en dessous (demande explicite).
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
      <Kicker>{overline}</Kicker>
      <div className="mt-4">
        <H2>{title}</H2>
      </div>
      <p className="text-[16px] mt-[18px] max-w-[60ch]" style={{ color: C.muted }}>
        {intro}
      </p>
      <ul className="list-none p-0 mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-7">
        {lines.map((l) => (
          <li key={l} className="py-[14px] border-b text-[14.5px]" style={{ borderColor: C.line, color: C.ink }}>
            {l}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <RoiCells stats={stats} />
      </div>
    </div>
  )
}
