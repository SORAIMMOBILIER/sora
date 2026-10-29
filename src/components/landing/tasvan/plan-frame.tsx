import { C } from "./tokens"

// Plans RDC + étage, côte à côte (rez-de-chaussée à gauche, étage à
// droite) sur ordinateur ; l'un sous l'autre sur mobile. Plus de galerie
// à glisser — demande explicite. Légende affichée en surimpression sur
// chaque plan, 640 px de haut maximum pour lire les pièces sans zoomer.
export default function PlanFrame({
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
  ].filter((p) => p.src)

  if (plans.length === 0) {
    return (
      <div className="mt-[14px] bg-white border p-4 h-[320px] flex items-center justify-center" style={{ borderColor: C.line, color: C.muted }}>
        <span className="text-[12px] font-medium uppercase tracking-[.16em]">{pendingLabel}</span>
      </div>
    )
  }

  return (
    <div className="mt-[14px]">
      <div className={`grid grid-cols-1 gap-3 ${plans.length > 1 ? "md:grid-cols-2" : ""}`}>
        {plans.map((p) => (
          <div key={p.label} className="relative bg-white border p-4 flex items-center justify-center" style={{ borderColor: C.line }}>
            <span
              className="absolute top-4 left-4 bg-white px-2 py-1 text-[12px] font-medium uppercase tracking-[.14em]"
              style={{ color: C.ink, border: `1px solid ${C.line}` }}
            >
              {p.label}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={`${alt} — ${p.label}`}
              className="block mx-auto w-auto h-auto max-w-full"
              style={{ maxHeight: "640px" }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <p className="text-[12px] mt-[10px]" style={{ color: C.muted }}>
        {note}
      </p>
    </div>
  )
}
