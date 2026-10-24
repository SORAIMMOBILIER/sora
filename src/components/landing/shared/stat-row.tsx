import { GRAY } from "./tokens"

export type Stat = { value: string; label: string }

// Ligne de cellules bordées, filets entre les cellules. Trois ou quatre
// cellules ; sur mobile, quatre cellules passent en deux lignes de deux.
export default function StatRow({ stats }: { stats: Stat[] }) {
  const cols = stats.length === 4 ? "grid-cols-2 md:grid-cols-4" : stats.length === 3 ? "grid-cols-3" : "grid-cols-2"
  return (
    <div className={`max-w-[640px] grid ${cols} gap-px bg-border border border-border`}>
      {stats.map((s, i) => (
        <div key={i} className="bg-background p-5">
          <p className="font-sans font-light text-foreground text-[24px] leading-tight">{s.value}</p>
          <p className="font-sans text-[12px] mt-2 leading-snug" style={{ color: GRAY }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}
