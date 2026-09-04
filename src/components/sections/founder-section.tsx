"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import type { PenflowProps } from "penflow/react"
import { gsap } from "gsap"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const Penflow = dynamic<PenflowProps>(
  () => import("penflow/react").then((m) => ({ default: m.Penflow })),
  { ssr: false }
)

type FounderItem = { title: string; desc: string }

export default function FounderSection() {
  const t = useTranslations("Home.Founder")
  const ITEMS = t.raw("items") as FounderItem[]
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sage-item", { opacity: 0, y: 24, duration: 0.9, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="fondateur" className="bg-primary py-24 md:py-36 px-6">
      <div className="text-center max-w-5xl mx-auto mb-20">
        <p className="sage-item eyebrow-dark mb-8">{t("eyebrow")}</p>
        <h2 className="sage-item font-serif font-medium text-background leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,76px)" }}>
          {t("title")}
        </h2>
        <p className="sage-item text-background/70 max-w-2xl mx-auto mt-8 leading-relaxed text-base">
          {t("body")}
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 mb-24">
        {ITEMS.map((it, i) => (
          <div key={it.title} className="sage-item">
            <Separator className="bg-background/15" />
            <div className="flex gap-5 pt-6 pb-8">
              <span className="metadata text-background/60">0{i + 1}</span>
              <div>
                <h3 className="font-serif text-2xl text-background mb-2">{it.title}</h3>
                <p className="text-background/75 text-sm leading-relaxed">{it.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Founder card */}
      <Card className="sage-item max-w-5xl mx-auto bg-background/5 backdrop-blur-sm border-background/10 shadow-none overflow-hidden">
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-12 items-stretch">
          <div className="md:col-span-4 relative min-h-[280px] md:min-h-0">
            <Image src="/gabriel-lapierre.webp" alt="Gabriel Lapierre" fill quality={95} className="object-cover object-center" sizes="(max-width:768px) 100vw, 33vw" />
          </div>
          <div className="md:col-span-8 p-8 md:p-12">
            <p className="tertiary text-background/60 mb-3">{t("cardEyebrow")}</p>
            <h3 className="font-serif text-3xl md:text-4xl text-background mb-4">{t("cardName")}</h3>
            <p className="text-background/90 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
              {t("cardIntro")}
            </p>
            <div className="space-y-4 text-background/80 text-sm md:text-base leading-relaxed max-w-xl">
              <p>{t("cardP1")}</p>
              <p>{t("cardP2")}</p>
              <p>{t("cardP3")}</p>
            </div>
            <div className="mt-8 h-[70px] w-[240px] md:w-[280px]" role="img" aria-label="Signature de Gabriel Lapierre">
              <Penflow
                text="Gabriel Lapierre"
                fontUrl="/fonts/BrittanySignature.ttf"
                quality="calm"
                color="#FFFFFF"
                size={44}
                speed={0.4}
                lineHeight={1.6}
                seed="sora"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
