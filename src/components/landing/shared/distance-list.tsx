import MediaSlot from "./media-slot"
import { LabelValueTable } from "./primitives"

export type DistanceEntry = { place: string; distance?: string; photoSrc?: string }

// Tableau lieu / distance (une entrée sans distance n'est pas pertinente
// pour ce projet) + deux images, côte à côte sur ordinateur.
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
    <div>
      <LabelValueTable rows={visible.map((e) => ({ label: e.place, value: e.distance! }))} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 max-w-[1060px]">
        {visible.slice(0, 2).map((e) => (
          <div key={e.place} className="relative aspect-[4/3]">
            <MediaSlot src={e.photoSrc} alt={e.place} label={pendingLabel} sizes="(max-width:768px) 100vw, 530px" />
          </div>
        ))}
      </div>
    </div>
  )
}
