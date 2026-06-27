"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"

const ITEMS = [
 { title: "Accompagnement A → Z", desc: "Sélection du terrain, structures juridiques, construction et gestion locative." },
 { title: "Cadre légal sécurisé", desc: "PT PMA, baux leasehold 30 + 10 ans, contrats vérifiés par avocat local." },
 { title: "Rendement net 13%", desc: "Documenté sur les villas en gestion. Versement annuel ou trimestriel." },
 { title: "Équipe sur place", desc: "Présence permanente à Bali, suivi de chantier hebdomadaire en vidéo." },
]

export default function FounderSection() {
 const ref = useRef<HTMLElement>(null)
 useEffect(() => {
 const ctx = gsap.context(() => {
  gsap.from(".sage-item", { opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } })
 }, ref)
 return () => ctx.revert()
 }, [])

 return (
 <section ref={ref} id="fondateur" className="bg-bg-mid py-24 md:py-36 px-6">
  <div className="text-center max-w-3xl mx-auto mb-20">
  <p className="sage-item font-mono text-[10px] tracking-[0.3em] text-ink/70 mb-8">L&apos;accompagnement · 4 piliers</p>
	  <h2 className="sage-item font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,76px)" }}>
   Un seul interlocuteur,<br /><span className="">de A à Z.</span>
  </h2>
  <p className="sage-item text-ink/70 max-w-xl mx-auto mt-8 leading-relaxed text-base">
   Aucune sous-traitance commerciale entre vous et l&apos;opération. Tout passe par l&apos;équipe SORA, encadrée par Gabriel sur place.
  </p>
  </div>

  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-24">
  {ITEMS.map((it, i) => (
   <div key={it.title} className="sage-item flex gap-5 border-t border-ink/15 pt-6">
   <span className="font-mono text-[11px] tracking-[0.2em] text-ink/60">0{i + 1}</span>
   <div>
    <h3 className="font-serif text-2xl text-ink mb-2">{it.title}</h3>
    <p className="text-ink/75 text-sm leading-relaxed">{it.desc}</p>
   </div>
   </div>
  ))}
  </div>

  {/* Founder card */}
	  <div className="sage-item max-w-4xl mx-auto bg-ink/10 backdrop-blur-sm rounded-sm p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
  <div className="md:col-span-4">
   <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
	   <Image src="/video-thumb.webp" alt="Gabriel Lapierre" fill quality={82} className="object-cover object-top" sizes="(max-width:768px) 100vw, 30vw" />
   </div>
  </div>
  <div className="md:col-span-8">
   <p className="font-mono text-[10px] tracking-[0.25em] text-ink/60 mb-3">Le fondateur</p>
   <h3 className="font-serif text-3xl md:text-4xl text-ink mb-3">Gabriel Lapierre</h3>
   <p className="font-serif text-ink/90 text-lg mb-5">Arts et Métiers ParisTech · Ex-VINCI · Ex-OIKOS Immobilier · Résident à Canggu depuis 2023</p>
   <p className="text-ink/85 leading-relaxed text-sm md:text-base mb-5 max-w-lg">
   Six ans d&apos;investissement immobilier en France, Espagne, puis Bali. Chaque projet SORA passe par mes mains : choix du terrain, validation urbanistique, contrôle chantier hebdomadaire, livraison, gestion locative. Les chiffres que vous voyez ici sont ceux de mes propres villas.
   </p>
	   <p className="font-mono text-[10px] tracking-[0.2em] text-ink/60 ">Gabriel Lapierre, fondateur</p>
  </div>
  </div>
 </section>
 )
}
