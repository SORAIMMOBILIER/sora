import { C } from "./tokens"

export type Row = { label: string; value: string }

// Liste label/valeur en gras à gauche — pour "Vos garanties". Même filet
// que `.specs`, mais libellé en gras (contrat) au lieu de l'ink normal.
export default function FiletRows({ rows }: { rows: Row[] }) {
  return (
    <ul className="list-none p-0 mt-10 border-t" style={{ borderColor: C.line }}>
      {rows.map((r) => (
        <li key={r.label} className="py-5 border-b" style={{ borderColor: C.line }}>
          <p className="text-[15px] font-semibold" style={{ color: C.ink }}>
            {r.label}
          </p>
          <p className="text-[14.5px] mt-1" style={{ color: C.muted }}>
            {r.value}
          </p>
        </li>
      ))}
    </ul>
  )
}

// Lignes simples (une phrase, pas de valeur à droite) — pour "Points forts".
export function PlainLines({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 border-t" style={{ borderColor: C.line }}>
      {items.map((item) => (
        <li key={item} className="py-[14px] border-b text-[16px]" style={{ borderColor: C.line, color: C.ink }}>
          {item}
        </li>
      ))}
    </ul>
  )
}
