"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "@/components/localized-link"
import { gsap } from "gsap"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export default function CtaSection() {
  const t = useTranslations("Home.Cta")
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-item", { opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="contact" className="bg-background py-24 md:py-44 px-6 text-center">
      <div className="cta-item max-w-md mx-auto relative aspect-square rounded-full overflow-hidden mb-12">
        <Image src="/villa-render-bedroom.webp" alt="Vue sur l'océan depuis une villa Seseh" fill quality={95} className="object-cover" sizes="(max-width:768px) 80vw, 500px" />
      </div>
      <p className="cta-item eyebrow text-muted-foreground mb-8">{t("eyebrow")}</p>
      <h2 className="cta-item font-serif font-medium text-foreground leading-[1.0] max-w-5xl mx-auto" style={{ fontSize: "clamp(40px,6vw,96px)" }}>
        {t("title")}
      </h2>
      <p className="cta-item text-muted-foreground max-w-xl mx-auto mt-8 leading-relaxed">
        {t("body1")}
      </p>
      <p className="cta-item text-foreground/70 max-w-lg mx-auto mt-6 leading-relaxed text-sm md:text-base">
        {t("body2")}
      </p>
      <div className="cta-item mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="accent">
          <a href="https://calendly.com/contact-sora-immobilier/rdv-avec-gabriel-investir-a-bali?utm_source=homepage"
            onClick={() => window.fbq?.("track", "Lead", { source: "calendly-cta-homepage" })}>
            {t("ctaPrimary")}
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/seseh#dossier">{t("ctaSecondary")}</Link>
        </Button>
      </div>
      <p className="cta-item mt-6 metadata text-foreground/45">
        {t("footnote")}
      </p>
    </section>
  )
}
