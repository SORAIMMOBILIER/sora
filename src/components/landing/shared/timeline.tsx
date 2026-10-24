import { GRAY } from "./tokens"

export type TimelineStep = { value: string; title: string; body: string }

// Frise : chaque étape sur une ligne à filet, colonne de gauche avec la
// valeur en gros, titre + détail à droite.
export default function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="max-w-[1060px] border-t border-border">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-6 md:gap-10 py-6 border-b border-border">
          <div className="w-[80px] md:w-[120px] shrink-0">
            <p className="font-sans font-light text-foreground text-[40px] leading-none">{step.value}</p>
          </div>
          <div className="max-w-[640px]">
            <p className="font-sans font-medium text-foreground text-[18px] mb-1.5">{step.title}</p>
            {step.body && (
              <p className="font-sans text-[15px] leading-[1.5]" style={{ color: GRAY }}>
                {step.body}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
