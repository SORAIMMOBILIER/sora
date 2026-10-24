export type Stat = { value: string; label: string }

// Trois ou quatre chiffres en gros corps, une ligne (ordinateur) ou deux
// par deux (mobile).
export default function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-flow-col md:auto-cols-fr gap-x-6 gap-y-8 max-w-2xl mx-auto">
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <p
            className="font-serif font-medium text-foreground leading-none"
            style={{ fontSize: "clamp(26px,5vw,40px)" }}
          >
            {s.value}
          </p>
          <p className="metadata text-foreground/50 mt-2.5">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
