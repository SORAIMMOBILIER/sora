import { C } from "./tokens"

export type Row = { label: string; value: string }

// `.specs` : libellé en encre normale à gauche, VALEUR grisée à droite —
// inverse de notre ancien tableau libellé-gris/valeur-foncée. `light` :
// variante blanche pour un fond sombre (bande vidéo "Le lieu").
export default function SpecsList({ rows, light }: { rows: Row[]; light?: boolean }) {
  const lineColor = light ? "rgba(255,255,255,.3)" : C.line
  const labelColor = light ? "#fff" : C.ink
  const valueColor = light ? "rgba(255,255,255,.7)" : C.muted
  return (
    <ul className="list-none p-0 mt-[26px] border-t" style={{ borderColor: lineColor }}>
      {rows.map((r) => (
        <li key={r.label} className="flex justify-between gap-5 py-3 border-b text-[14.5px]" style={{ borderColor: lineColor, color: labelColor }}>
          <span>{r.label}</span>
          <span className="text-right" style={{ color: valueColor }}>
            {r.value}
          </span>
        </li>
      ))}
    </ul>
  )
}
