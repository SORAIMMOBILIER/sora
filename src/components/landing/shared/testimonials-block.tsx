import { GRAY } from "./tokens"

export type Testimonial = { firstName: string; situation: string; villa: string; quote: string }

// Trois colonnes séparées par des filets (jamais masqué : trois
// placeholders "Témoignage en attente" tant que la liste est vide).
export default function TestimonialsBlock({
  testimonials,
  pendingLabel,
}: {
  testimonials: Testimonial[]
  pendingLabel: string
}) {
  const slots = testimonials.length > 0 ? testimonials : [null, null, null]

  return (
    <div className="max-w-[1060px] grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
      {slots.map((t, i) => (
        <div key={i} className="bg-background p-6 min-h-[200px] flex flex-col justify-between">
          {t ? (
            <>
              <p className="font-sans text-[15px] leading-[1.5]" style={{ color: GRAY }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-foreground/60 mt-6">
                {t.firstName} · {t.situation} · {t.villa}
              </p>
            </>
          ) : (
            <p className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-foreground/35 flex-1 flex items-center">
              {pendingLabel}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
