import MediaSlot from "./media-slot"

export type DistanceEntry = { place: string; distance?: string; photoSrc?: string }

// Liste lieu / distance, une ou deux photos. Une entrée sans distance
// renseignée n'est pas pertinente pour ce projet et n'est pas affichée ;
// une entrée renseignée s'affiche toujours, avec un visuel en attente si
// sa photo n'est pas encore fournie (voir MediaSlot).
export default function DistanceList({
  entries,
  pendingLabel,
}: {
  entries: DistanceEntry[]
  pendingLabel: string
}) {
  const visible = entries.filter((e) => e.distance)
  if (visible.length === 0) return null

  return (
    <div className="max-w-md mx-auto">
      <ul className="divide-y divide-border">
        {visible.map((e) => (
          <li key={e.place} className="flex items-baseline justify-between py-3.5 text-sm">
            <span className="text-foreground/75">{e.place}</span>
            <span className="text-foreground/50">{e.distance}</span>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {visible.slice(0, 2).map((e) => (
          <div key={e.place} className="relative aspect-[4/3] rounded-sm overflow-hidden bg-secondary/40">
            <MediaSlot src={e.photoSrc} alt={e.place} label={pendingLabel} sizes="(max-width:768px) 50vw, 300px" />
          </div>
        ))}
      </div>
    </div>
  )
}
