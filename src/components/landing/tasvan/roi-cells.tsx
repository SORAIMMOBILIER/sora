import { DISPLAY, C } from "./tokens"

export type Stat = { value: string; label: string }

// `.roi` : cellules de chiffres bordées, arrondi 18px, filets internes.
export default function RoiCells({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid border rounded-[18px] overflow-hidden" style={{ gridTemplateColumns: `repeat(${stats.length},1fr)`, borderColor: C.line }}>
      {stats.map((s, i) => (
        <div key={i} className="px-3 py-4" style={{ borderRight: i < stats.length - 1 ? `1px solid ${C.line}` : undefined }}>
          <p className="text-[clamp(22px,6vw,30px)] leading-[1.05] font-light whitespace-nowrap" style={{ fontFamily: DISPLAY, color: C.ink }}>
            {s.value}
          </p>
          <span className="text-[12px] leading-[1.35] block mt-[6px]" style={{ color: C.muted }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}
