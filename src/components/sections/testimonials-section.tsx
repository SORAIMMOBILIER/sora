"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

// Placeholder testimonials, à remplacer par les vrais quotes investisseurs
const TESTIMONIALS = [
  {
    quote: "J'ai placé 25 000 € sur le premier lot Canggu. Suivi vidéo hebdomadaire pendant le chantier, livraison à l'heure, premier versement reçu six mois après. Aucun bullshit commercial.",
    name: "Antoine M.",
    role: "Gérant SAS · Trésorerie d'entreprise",
    metric: "+12,8% net en 2024",
  },
  {
    quote: "Ce qui m'a convaincu c'est le fait que Gabriel est ingénieur, pas commercial. Les chiffres tiennent la route, le PT PMA est béton, l'avocat local répond en 24h.",
    name: "Sophie R.",
    role: "Directrice marketing · Family office",
    metric: "+13,2% net sur 18 mois",
  },
  {
    quote: "Premier investissement étranger pour moi. Le ticket à 10 000 € m'a permis de tester sans risque démesuré. Aujourd'hui je suis sur le troisième projet avec un ticket plus élevé.",
    name: "Karim B.",
    role: "Freelance dev senior",
    metric: "+11,9% net en 2023",
  },
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tm-item", { opacity: 0, y: 28, duration: 0.9, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-bg-soft py-24 md:py-36 px-6">
	      <div className="container-page">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="tm-item font-mono text-[10px] tracking-[0.3em] uppercase text-ink-muted mb-6">Témoignages · Investisseurs vérifiés</p>
	          <h2 className="tm-item font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
            Ce qu&apos;ils en disent.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="tm-item bg-bg-mid p-8 md:p-10 rounded-sm flex flex-col">
              <p className="font-serif text-xl md:text-2xl text-ink leading-snug mb-8 flex-1">
                « {t.quote} »
              </p>
              <div className="border-t border-ink/15 pt-5">
                <p className="font-serif text-base text-ink font-semibold mb-1">{t.name}</p>
                <p className="text-xs text-ink/55 mb-3">{t.role}</p>
                <span className="inline-block font-mono text-[10px] tracking-[0.18em] uppercase text-accent border border-accent/40 px-2.5 py-1 rounded-full">{t.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
