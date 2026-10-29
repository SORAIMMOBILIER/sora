import MediaSlot from "./media-slot"
import { GRAY } from "./tokens"

// Paire de plans (rez-de-chaussée + étage) : côte à côte sur ordinateur,
// empilés sur mobile. Cadre à filet fin, fond blanc, object-fit contain,
// 480 px de haut maximum.
export default function FloorPlanPair({
  rdc,
  etage,
  rdcLabel,
  etageLabel,
  alt,
  pendingLabel,
  note,
}: {
  rdc?: string
  etage?: string
  rdcLabel: string
  etageLabel: string
  alt: string
  pendingLabel: string
  note: string
}) {
  const plans = [
    { src: rdc, label: rdcLabel },
    { src: etage, label: etageLabel },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <div key={plan.label}>
            <div className="relative w-full aspect-[4/3] max-h-[480px] border border-border bg-white">
              <MediaSlot src={plan.src} alt={`${alt} — ${plan.label}`} label={pendingLabel} fit="contain" sizes="(max-width:768px) 100vw, 530px" />
            </div>
            <p className="font-sans text-[13px] mt-2" style={{ color: GRAY }}>
              {plan.label}
            </p>
          </div>
        ))}
      </div>
      <p className="font-sans text-[12px] mt-4" style={{ color: GRAY }}>
        {note}
      </p>
    </div>
  )
}
