"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useTranslations } from "next-intl"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type FaqItem = { q: string; a: string }

export default function FaqSection() {
  const t = useTranslations("Home.Faq")
  const FAQ = t.raw("items") as FaqItem[]
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", { opacity: 0, y: 18, duration: 0.7, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="bg-background py-24 md:py-36 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="faq-item eyebrow text-muted-foreground mb-6">{t("eyebrow")}</p>
          <h2 className="faq-item font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
            {t("title")}
          </h2>
        </div>
        <Accordion type="single" collapsible className="faq-item w-full">
          {FAQ.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="py-6 font-serif text-lg md:text-xl text-foreground font-medium hover:no-underline hover:text-muted-foreground">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-0 text-base font-sans text-foreground/70 leading-relaxed max-w-2xl">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="faq-item mt-12 text-center text-foreground/55 text-sm">
          {t("footerText")} <a href="#contact" className="text-accent hover:opacity-70 underline underline-offset-4">{t("footerLink")}</a>.
        </p>
      </div>
    </section>
  )
}
