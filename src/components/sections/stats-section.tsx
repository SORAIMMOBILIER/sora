"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function StatsSection() {
 const ref = useRef<HTMLElement>(null)
 useEffect(() => {
 const ctx = gsap.context(() => {
  gsap.from(".st-item", { opacity: 0, y: 28, duration: 1, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } })
 }, ref)
 return () => ctx.revert()
 }, [])

 return (
 <section ref={ref} className="relative bg-ink py-32 md:py-44 px-6 text-center overflow-hidden">
  <div className="relative z-10">
  <p className="st-item font-mono text-[10px] tracking-[0.3em] text-bg/50 mb-8">Track record · Depuis 2020</p>
	  <h2 className="st-item font-serif font-medium text-bg leading-[1.0] max-w-3xl mx-auto" style={{ fontSize: "clamp(38px,5.5vw,84px)" }}>
   13% net moyen.<br /><span className="">3 projets livrés.</span>
  </h2>
  <p className="st-item text-bg/65 max-w-xl mx-auto mt-8 leading-relaxed text-base">
   40 investisseurs nous ont rejoints sur trois opérations à Canggu. Chaque opération est structurée de A à Z : sélection foncière, PT PMA, construction, gestion locative. Aucun intermédiaire entre vous et l&apos;équipe terrain.
  </p>
  <a href="#projet" className="st-item inline-block mt-12 bg-bg text-ink font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded-full hover:bg-accent transition-colors duration-500">
   Voir Canggu Oasis
  </a>
  </div>
 </section>
 )
}
