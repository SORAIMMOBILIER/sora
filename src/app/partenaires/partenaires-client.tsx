"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "@/components/localized-link"
import { gsap } from "gsap"
import { useTranslations } from "next-intl"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const CALENDLY_URL = "https://calendly.com/contact-sora-immobilier/rdv-avec-gabriel-investir-a-bali?utm_source=partenaires"

type FaqItem = { q: string; a: string }
type SocialProofItem = { value: string; label: string }
type WhyItem = { title: string; desc: string }
type SimRow = { gamme: string; prix: string; comm: string; trois: string }
type HowStep = { step: string; title: string; desc: string }
type Gamme = { name: string; price: string; surface: string; chambres: string; revenus: string; rendement: string }

const GAMME_IMG: Record<string, string> = {
  Élégance: "/villa-render-exterior.webp",
  Prestige: "/villa-pool.webp",
  Signature: "/villa-living.webp",
  Exception: "/villa-kitchen.webp",
}

const INTERIOR_SRCS = [
  "/seseh/signature/living.jpg",
  "/seseh/exception/kitchen.jpg",
  "/seseh/prestige/bedroom1.jpg",
  "/seseh/signature/terrace.jpg",
  "/seseh/exception/bath1.jpg",
  "/seseh/elegance/living.jpg",
  "/seseh/prestige/terrace.jpg",
  "/seseh/signature/dining.jpg",
]

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
      onClick={() => window.fbq?.("track", "Lead", { source: "calendly-cta-partenaires" })}
      className={`inline-block bg-accent text-background font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-10 py-4 rounded-full hover:bg-foreground hover:text-background transition-colors duration-500 ${className}`}>
      {children}
    </a>
  )
}

export default function PartenairesPage() {
  const t = useTranslations("Partenaires")
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [showVideoCta, setShowVideoCta] = useState(false)
  const exitShownRef = useRef(false)

  const SOCIAL_PROOF = t.raw("socialProof") as SocialProofItem[]
  const WHY_ITEMS = t.raw("whyItems") as WhyItem[]
  const SIM_ROWS = t.raw("simRows") as SimRow[]
  const HOW_STEPS = t.raw("howSteps") as HowStep[]
  const GAMMES = t.raw("gammes") as Gamme[]
  const CLIENTS_GET = t.raw("clientsGetItems") as string[]
  const PROFILES = t.raw("profiles") as string[]
  const INTERIOR_ALTS = t.raw("interiorAlts") as string[]
  const FAQ = t.raw("faq") as FaqItem[]

  const handleVideoClick = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.muted = false
      v.play()
      setVideoPlaying(true)
    } else {
      v.pause()
      setVideoPlaying(false)
    }
  }, [])

  useEffect(() => {
    window.fbq?.("track", "ViewContent", { content_name: "seseh-partenaires" })
    const ctx = gsap.context(() => {
      gsap.from(".vsl-fade", { opacity: 0, y: 20, duration: 0.9, stagger: 0.08, ease: "expo.out", delay: 0.2 })
    }, ref)

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 5 || exitShownRef.current) return
      if (sessionStorage.getItem("part-exit-shown")) return
      exitShownRef.current = true
      sessionStorage.setItem("part-exit-shown", "1")
      setShowExitPopup(true)
    }
    document.addEventListener("mouseleave", handleMouseLeave)

    const v = videoRef.current
    const handleTimeUpdate = () => {
      if (v && v.currentTime / v.duration >= 0.2 && !showVideoCta) {
        setShowVideoCta(true)
      }
    }
    v?.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      ctx.revert()
      document.removeEventListener("mouseleave", handleMouseLeave)
      v?.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [showVideoCta])

  return (
    <main ref={ref} className="bg-background min-h-screen">

      {/* ─── HERO : Headline + Video + CTA ─── */}
      <section className="px-6 pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="vsl-fade font-serif font-medium text-foreground/40 text-sm tracking-wide">Sora Immobilier</Link>

          <h1 className="vsl-fade font-serif font-medium text-foreground leading-[0.95] mt-8 md:mt-12 max-w-4xl" style={{ fontSize: "clamp(32px,5vw,68px)" }}>
            {t("heroTitle")}
          </h1>
          <p className="vsl-fade text-foreground/60 mt-6 text-lg md:text-xl max-w-2xl leading-relaxed">
            {t("heroBody")}
          </p>

          {/* Video */}
          <div className="vsl-fade relative aspect-video bg-muted border border-border overflow-hidden rounded-sm mt-10 cursor-pointer" onClick={handleVideoClick}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/video-thumb.webp"
              playsInline
              muted
              preload="metadata"
            >
              <source src="/vsl-partenaires.mp4" type="video/mp4" />
            </video>
            {!videoPlaying && (
              <div className="absolute inset-0 bg-foreground/25 flex flex-col items-center justify-center gap-3">
                <div className="w-20 h-20 rounded-full bg-background/90 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <p className="metadata text-background/80">{t("videoCaption")}</p>
              </div>
            )}
            {showVideoCta && videoPlaying && (
              <div className="absolute bottom-4 inset-x-4 flex justify-center" onClick={(e) => e.stopPropagation()}>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                  className="bg-accent text-background font-serif font-semibold text-[10px] tracking-[0.2em] uppercase px-8 py-3 rounded-full shadow-lg hover:bg-foreground transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {t("videoCta")}
                </a>
              </div>
            )}
          </div>

          {/* CTA #1 */}
          <div className="vsl-fade mt-8 text-center">
            <CtaButton>{t("cta1Label")}</CtaButton>
            <p className="metadata text-muted-foreground/50 mt-4">{t("cta1Note")}</p>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="bg-card border-y border-border py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          {SOCIAL_PROOF.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="font-serif font-medium text-accent text-xl">{s.value}</span>
              <span className="metadata text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POURQUOI DEVENIR PARTENAIRE ─── */}
      <section className="px-6 py-24 md:py-36">
        <div className="max-w-3xl mx-auto">
          <p className="vsl-fade eyebrow text-muted-foreground mb-6">{t("whyEyebrow")}</p>
          <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
            {t("whyTitle")}
          </h2>
          <div className="vsl-fade mt-10 space-y-6">
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <span className="text-accent/60 text-xl mt-0.5 shrink-0">+</span>
                <div>
                  <p className="font-serif font-medium text-foreground text-base">{item.title}</p>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SIMULATION REVENUS ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">{t("simEyebrow")}</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
              {t("simTitle")}
            </h2>
          </div>
          <div className="vsl-fade overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="metadata text-muted-foreground text-left py-3 pr-4">{t("simHeaderGamme")}</th>
                  <th className="metadata text-muted-foreground text-right py-3 px-4">{t("simHeaderPrix")}</th>
                  <th className="metadata text-muted-foreground text-right py-3 px-4">{t("simHeaderCommission")}</th>
                  <th className="metadata text-muted-foreground text-right py-3 pl-4">{t("simHeaderTrois")}</th>
                </tr>
              </thead>
              <tbody>
                {SIM_ROWS.map((r) => (
                  <tr key={r.gamme} className="border-b border-border/50">
                    <td className="py-3 pr-4 font-serif font-medium text-foreground">{r.gamme}</td>
                    <td className="py-3 px-4 text-muted-foreground text-right">{r.prix}</td>
                    <td className="py-3 px-4 text-accent font-medium text-right">{r.comm}</td>
                    <td className="py-3 pl-4 text-accent font-semibold text-right">{r.trois}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="vsl-fade metadata text-muted-foreground/40 mt-4 text-center">{t("simNote")}</p>
        </div>
      </section>

      {/* ─── CTA #2 ─── */}
      <section className="bg-accent/10 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="vsl-fade font-serif font-medium text-foreground text-lg md:text-xl mb-6">
            {t("cta2Text")}
          </p>
          <CtaButton>{t("cta2Label")}</CtaButton>
        </div>
      </section>

      {/* ─── QUI EST GABRIEL ─── */}
      <section className="px-6 py-24 md:py-36">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">{t("gabrielEyebrow")}</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.05]" style={{ fontSize: "clamp(24px,3.5vw,44px)" }}>
              {t("gabrielTitle")}
            </h2>
            <p className="vsl-fade text-muted-foreground mt-6 leading-relaxed">
              {t("gabrielP1")}
            </p>
            <p className="vsl-fade text-muted-foreground mt-4 leading-relaxed">
              {t("gabrielP2")}
            </p>
          </div>
          <div className="vsl-fade relative aspect-[4/3] rounded-sm overflow-hidden">
            <Image src="/gabriel-lapierre.webp" alt={t("gabrielImgAlt")} fill className="object-cover" sizes="(max-width:768px) 100vw, 500px" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-6">
              <p className="font-serif font-medium text-background text-base">Gabriel Lapierre</p>
              <p className="metadata text-background/70 mt-1">{t("gabrielCardRole")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMENT ÇA MARCHE ─── */}
      <section className="bg-foreground py-24 md:py-36 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="vsl-fade font-serif font-medium text-background text-center leading-[1.0] mb-16" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
            {t("howTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {HOW_STEPS.map((s) => (
              <div key={s.step} className="vsl-fade text-center md:text-left">
                <p className="font-serif font-medium text-accent text-2xl mb-3">{s.step}</p>
                <p className="font-serif font-medium text-background text-base mb-2">{s.title}</p>
                <p className="text-background/45 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LE PRODUIT ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">{t("productEyebrow")}</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
              {t("productTitle")}
            </h2>
          </div>
          <div className="vsl-fade grid grid-cols-1 md:grid-cols-2 gap-4">
            {GAMMES.map((g) => (
              <div key={g.name} className="group relative rounded-sm overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image src={GAMME_IMG[g.name]} alt={`Villa ${g.name}`} fill quality={90} className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="tertiary text-background/60 mb-1">{g.name}</p>
                      <p className="font-serif text-background text-2xl font-medium">{g.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="metadata text-background/55">{g.surface} / {g.chambres}</p>
                      <p className="metadata text-accent mt-1">{g.revenus}</p>
                    </div>
                  </div>
                  {g.rendement && (
                    <div className="mt-3">
                      <span className="metadata text-accent bg-accent/10 backdrop-blur-sm px-3 py-1 rounded-full">{g.rendement} net</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Urgence */}
          <div className="vsl-fade mt-8 bg-accent/10 border border-accent/20 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-serif font-medium text-foreground text-lg">{t("urgencyTitle")}</p>
              <p className="text-muted-foreground text-sm mt-1">{t("urgencyBody")}</p>
            </div>
            <CtaButton className="shrink-0">{t("urgencyCta")}</CtaButton>
          </div>
        </div>
      </section>

      {/* ─── CE QUE VOS CLIENTS OBTIENNENT ─── */}
      <section className="px-6 py-24 md:py-36">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
              {t("clientsGetTitle")}
            </h2>
          </div>
          <div className="vsl-fade grid grid-cols-1 md:grid-cols-2 gap-4">
            {CLIENTS_GET.map((item) => (
              <div key={item} className="flex gap-3 items-start bg-card border border-border rounded-sm p-4">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-foreground/70 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA #3 ─── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="vsl-fade font-serif font-medium text-foreground text-lg md:text-xl mb-2">
            {t("cta3Title")}
          </p>
          <p className="vsl-fade text-muted-foreground mb-6">
            {t("cta3Body")}
          </p>
          <CtaButton>{t("cta3Label")}</CtaButton>
        </div>
      </section>

      {/* ─── PROFILS RECHERCHÉS ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0] mb-12" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
            {t("profilesTitle")}
          </h2>
          <div className="vsl-fade grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROFILES.map((p) => (
              <div key={p} className="bg-background border border-border rounded-sm p-6 flex items-center justify-center">
                <p className="metadata text-foreground/70 text-center">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTÉRIEURS ─── */}
      <section className="bg-background py-24 md:py-36 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="vsl-fade eyebrow text-muted-foreground mb-6">{t("interiorsEyebrow")}</p>
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,52px)" }}>
              {t("interiorsTitle")}
            </h2>
          </div>
          <div className="vsl-fade grid grid-cols-2 md:grid-cols-4 gap-2">
            {INTERIOR_SRCS.map((src, i) => (
              <div key={src} className="relative aspect-square rounded-sm overflow-hidden">
                <Image src={src} alt={INTERIOR_ALTS[i]} fill quality={80} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-card px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,56px)" }}>
              {t("faqTitle")}
            </h2>
          </div>
          <Accordion type="single" collapsible className="vsl-fade w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="py-6 font-serif text-lg md:text-xl text-foreground font-medium hover:no-underline hover:text-muted-foreground text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-0 text-base font-sans text-foreground/70 leading-relaxed max-w-2xl">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="bg-background px-6 py-24 md:py-36 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="vsl-fade font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(28px,4vw,52px)" }}>
            {t("finalTitle")}
          </h2>
          <p className="vsl-fade text-muted-foreground mt-6 leading-relaxed">
            {t("finalBody")}
          </p>
          <div className="vsl-fade mt-8">
            <CtaButton>{t("finalCta")}</CtaButton>
          </div>
          <p className="vsl-fade metadata text-muted-foreground/40 mt-6">{t("finalNote")}</p>
        </div>
      </section>

      {/* ─── MICRO-FOOTER ─── */}
      <div className="bg-background border-t border-border py-8 px-6">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-foreground/30 text-sm">Sora Immobilier</p>
          <p className="metadata text-muted-foreground/30">{t("footerEmail")}</p>
        </div>
      </div>

      {/* Sticky CTA mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border/30 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
          className="block w-full text-center bg-accent text-background font-serif font-semibold text-[11px] tracking-[0.22em] uppercase py-4 rounded-full">
          {t("stickyCta")}
        </a>
      </div>

      {/* Exit intent popup */}
      {showExitPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={() => setShowExitPopup(false)} />
          <div className="relative bg-background border border-border rounded-sm max-w-md w-full p-10 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <p className="font-serif font-medium text-foreground text-xl md:text-2xl leading-tight">
              {t("exitTitle")}
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {t("exitBody")}
            </p>
            <div className="mt-8">
              <CtaButton>{t("exitCta")}</CtaButton>
            </div>
            <button onClick={() => setShowExitPopup(false)} className="mt-4 metadata text-muted-foreground/40 hover:text-muted-foreground transition-colors">
              {t("exitDecline")}
            </button>
          </div>
        </div>
      )}

    </main>
  )
}
