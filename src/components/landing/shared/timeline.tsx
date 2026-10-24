export type TimelineStep = { title: string; body: string }

// Frise verticale, étapes numérotées — un titre court et une ligne par
// étape, le détail éventuel reste dans le texte d'origine (Disclosure).
export default function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="max-w-xl mx-auto space-y-0">
      {steps.map((step, i) => (
        <li key={i} className="relative pl-12 pb-10 last:pb-0 border-l border-border last:border-transparent ml-4">
          <span className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center metadata shrink-0">
            {i + 1}
          </span>
          <p className="font-serif font-medium text-foreground text-lg mb-1.5">{step.title}</p>
          {step.body && <p className="text-foreground/65 text-sm leading-relaxed">{step.body}</p>}
        </li>
      ))}
    </ol>
  )
}
