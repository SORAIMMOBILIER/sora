"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

export default function BrochureCta() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bc-item", { opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-background py-16 md:py-20 px-6">
      <div className="bc-item max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-card border border-border rounded-sm p-8 md:p-10">
        <div>
          <p className="font-serif font-medium text-foreground text-lg md:text-xl leading-tight">
            Téléchargez le dossier Seseh Sunset Villas.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Brochure complète + projections financières sur 5 ans. Accès gratuit.
          </p>
        </div>
        <Button asChild variant="accent" className="shrink-0">
          <Link href="/seseh#dossier">Recevoir le dossier</Link>
        </Button>
      </div>
    </section>
  )
}
