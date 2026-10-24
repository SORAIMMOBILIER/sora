import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"

export type Testimonial = { firstName: string; situation: string; villa: string; quote: string }

// Jamais masqué : trois cartes "Témoignage en attente" tant que la liste
// est vide, pour que la page se relise dans sa mise en page finale.
export default function TestimonialsBlock({
  overline,
  title,
  testimonials,
  ctaLabel,
  anchor,
  page,
  pendingLabel,
}: {
  overline: React.ReactNode
  title: React.ReactNode
  testimonials: Testimonial[]
  ctaLabel: string
  anchor: string
  page: string
  pendingLabel: string
}) {
  const slots = testimonials.length > 0 ? testimonials : [null, null, null]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        {overline}
        {title}
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {slots.map((t, i) =>
          t ? (
            <div key={i} className="border border-border rounded-sm p-6 bg-background">
              <p className="text-foreground/75 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-serif text-foreground text-base">{t.firstName}</p>
              <p className="text-foreground/50 text-xs mt-1">
                {t.situation} · {t.villa}
              </p>
            </div>
          ) : (
            <div
              key={i}
              className="border border-dashed border-border rounded-sm p-6 bg-background min-h-[160px] flex items-center justify-center"
            >
              <p className="metadata text-foreground/35">{pendingLabel}</p>
            </div>
          ),
        )}
      </div>
      <div className="text-center mt-10">
        <CtaLink section="temoignages" label={ctaLabel} anchor={anchor} page={page} />
      </div>
    </div>
  )
}
