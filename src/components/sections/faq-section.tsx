"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const FAQ = [
  {
    q: "Comment je récupère mon argent au bout de l'investissement ?",
	    a: "Chaque opération a une durée de 18 à 24 mois. À la livraison, vous percevez un revenu locatif annuel (versement annuel ou trimestriel). À la revente du bien, si vous la souhaitez, vous récupérez votre part proportionnelle du prix de cession.",
  },
  {
    q: "Le cadre légal indonésien, c'est solide pour un Français ?",
    a: "Chaque investisseur entre via une structure PT PMA (Penanaman Modal Asing) avec un bail leasehold 30+10 ans, contrôlée par notre avocat local indépendant. Vos droits sont protégés par contrat indonésien et reconnus en droit français. Documentation complète remise avant tout engagement.",
  },
  {
    q: "Que se passe-t-il si la villa ne se loue pas comme prévu ?",
	    a: "Nos rendements documentés (13% net moyen) sont basés sur des taux d'occupation prudents (~75-80%). En cas de sous-performance, nous activons notre réseau de distribution (Booking, Airbnb, agences locales premium). Aucune garantie de rendement n'est promise, les chiffres réels sont publiés trimestriellement.",
  },
  {
    q: "Quelle fiscalité française sur les revenus locatifs perçus ?",
    a: "Les revenus distribués par votre PT PMA sont imposables en France (convention fiscale France-Indonésie de 1979 anti-double imposition). Selon votre situation, traitement en BIC, BNC ou via une holding. Le sujet est détaillé dans la masterclass et un comptable partenaire peut vous accompagner.",
  },
  {
    q: "Le ticket à 10 000 €, c'est vraiment l'entrée minimum ?",
    a: "Oui. Sur les opérations en co-investissement (type Canggu Oasis), nous fractionnons les villas pour permettre l'entrée à 10 000 € minimum. Pour une villa privée détenue à 100%, le ticket démarre à environ 180 000 €.",
  },
  {
    q: "Pourquoi SORA plutôt qu'un concurrent francophone à Bali ?",
	    a: "Gabriel Lapierre, le fondateur, est ingénieur Arts et Métiers résident à Canggu. Il pilote chaque chaîne : sélection du terrain, validation urbanistique, contrôle chantier, gestion locative. Aucun intermédiaire commercial. Les chiffres affichés sont ceux de ses propres opérations, vérifiables.",
  },
]

export default function FaqSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", { opacity: 0, y: 18, duration: 0.7, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-bg py-24 md:py-36 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="faq-item font-mono text-[10px] tracking-[0.3em] uppercase text-ink-muted mb-6">Questions fréquentes</p>
	          <h2 className="faq-item font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
            Ce que vous voulez savoir<br />avant d&apos;investir.
          </h2>
        </div>
        <div>
          {FAQ.map((item, i) => (
            <details key={i} className="faq-item group border-t border-ink/12 last:border-b last:border-ink/12 py-6">
              <summary className="cursor-pointer flex items-start justify-between gap-6 list-none">
                <span className="font-serif text-lg md:text-xl text-ink font-medium pr-4">{item.q}</span>
                <span className="font-serif text-2xl text-ink/40 transition-transform duration-300 group-open:rotate-45 shrink-0 leading-none">+</span>
              </summary>
              <p className="mt-5 text-ink/70 leading-relaxed text-base max-w-2xl">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="faq-item mt-12 text-center text-ink/55 text-sm">
          Une autre question ? <a href="#contact" className="text-accent hover:text-accent-soft underline underline-offset-4">Posez-la dans la masterclass</a>.
        </p>
      </div>
    </section>
  )
}
