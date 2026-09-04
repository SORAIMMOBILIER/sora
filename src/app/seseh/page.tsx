"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useTranslations } from "next-intl"
import Footer from "@/components/layout/footer"
import InteractivePlan from "@/components/sections/interactive-plan"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const GAMME_IMG: Record<string, string> = {
  Élégance: "/villa-render-exterior.webp",
  Prestige: "/villa-pool.webp",
  Signature: "/villa-living.webp",
  Exception: "/villa-kitchen.webp",
}

type Gamme = { name: string; price: string; surface: string; chambres: string; revenus: string; rendement: string; piscine: string }
type StatItem = { value: string; label: string }
type Projection = { label: string; rendement: string; ratio: string; highlight?: boolean }
type Guarantee = { value: string; label: string; desc: string }

export default function SesehPage() {
  const t = useTranslations("Seseh")
  const GAMMES = t.raw("gammes") as Gamme[]
  const STATS = t.raw("stats") as StatItem[]
  const INCLUS = t.raw("inclus") as string[]
  const PROJECTIONS = t.raw("projections") as Projection[]
  const LOCATION_ITEMS = t.raw("locationItems") as StatItem[]
  const GUARANTEES = t.raw("guarantees") as Guarantee[]
  const DOSSIER_BULLETS = t.raw("dossierBullets") as string[]
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    window.fbq?.("track", "ViewContent", { content_name: "seseh" })

    const ctx = gsap.context(() => {
      gsap.from(".ss-fade", {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.3,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "dossier-seseh", acTagId: "61", acListId: "7", freshsalesTag: "DOSSIER-SESEH" }),
      })

      if (res.ok) {
        setStatus("success")
        window.fbq?.("track", "Lead", { value: 149000, currency: "EUR" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <main ref={ref}>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-bg">
        <div className="absolute inset-0">
          <Image
            src="/villa-render-exterior.webp"
            alt="Seseh Sunset Villas"
            fill
            quality={95}
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-24 max-w-4xl">
          <p className="ss-fade eyebrow mb-6">{t("heroEyebrow")}</p>
          <h1
            className="ss-fade font-serif font-medium text-ink leading-[0.92]"
            style={{ fontSize: "clamp(40px,6vw,96px)" }}
          >
            {t("heroTitle")}
          </h1>
          <p className="ss-fade text-ink/80 mt-6 text-lg md:text-xl leading-relaxed max-w-2xl">
            {t("heroBody")}
          </p>
          <div className="ss-fade mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#dossier"
              className="cta-primary font-serif font-semibold"
            >
              {t("ctaDossier")}
            </a>
            <a
              href="#gammes"
              className="cta-outline font-serif font-semibold"
            >
              {t("ctaGammes")}
            </a>
          </div>
        </div>
      </section>

      {/* Infos projet */}
      <section className="bg-ink py-24 md:py-36 px-6">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS.map((s) => (
            <div key={s.label} className="ss-fade">
              <p className="font-serif font-medium text-bg text-3xl md:text-5xl">{s.value}</p>
              <p className="metadata text-bg/55 mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 gammes */}
      <section id="gammes" className="bg-bg-soft py-24 md:py-36 px-6">
        <div className="container-page">
          <div className="text-center mb-16 md:mb-24">
            <p className="ss-fade eyebrow mx-auto mb-6">{t("gammesEyebrow")}</p>
            <h2
              className="ss-fade font-serif font-medium text-ink leading-[1.0]"
              style={{ fontSize: "clamp(36px,5vw,72px)" }}
            >
              {t("gammesTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {GAMMES.map((g) => (
              <div
                key={g.name}
                className="ss-fade group relative rounded-sm overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={GAMME_IMG[g.name]}
                  alt={`Villa ${g.name}`}
                  fill
                  quality={95}
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="tertiary text-ink/60 mb-2">{g.name}</p>
                      <p className="font-serif text-ink text-2xl md:text-3xl font-medium">{g.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="metadata text-ink/55">{g.surface} / {g.chambres}</p>
                      <p className="metadata text-accent mt-1">{g.revenus}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <span className="metadata text-ink/50 bg-ink/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {g.piscine}
                    </span>
                    <span className="metadata text-ink/50 bg-ink/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {t("cleEnMain")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inclus */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="ss-fade eyebrow mb-6">{t("inclusEyebrow")}</p>
              <ul className="space-y-4">
                {INCLUS.map((item) => (
                  <li key={item} className="ss-fade flex gap-3 text-ink/75 text-base">
                    <span className="text-accent mt-0.5">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ss-fade relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/villa-bedroom.webp"
                alt="Intérieur villa Seseh"
                fill
                quality={95}
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Plan interactif */}
      <InteractivePlan />

      {/* Projections financières */}
      <section className="bg-bg py-24 md:py-36 px-6">
        <div className="container-page max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="ss-fade eyebrow mx-auto mb-6">{t("projectionsEyebrow")}</p>
            <h2
              className="ss-fade font-serif font-medium text-ink leading-[1.0]"
              style={{ fontSize: "clamp(32px,4vw,60px)" }}
            >
              {t("projectionsTitle")}
            </h2>
            <p className="ss-fade text-ink/60 mt-6 max-w-xl mx-auto">
              {t("projectionsBody")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PROJECTIONS.map((p) => (
              <div
                key={p.label}
                className={`ss-fade rounded-sm p-6 md:p-8 text-center ${
                  p.highlight
                    ? "bg-accent/15 border border-accent/30"
                    : "bg-bg-soft border border-line"
                }`}
              >
                <p className="font-serif font-medium text-ink text-2xl md:text-3xl">{p.rendement}</p>
                <p className="metadata text-ink/50 mt-2">{p.ratio}</p>
                <p className={`metadata mt-4 ${
                  p.highlight ? "text-accent font-semibold" : "text-ink/60"
                }`}>
                  {p.label}
                </p>
              </div>
            ))}
          </div>

          <div className="ss-fade mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-bg-soft border border-line rounded-sm p-6">
              <p className="font-serif font-medium text-ink text-xl">{t("totalPercu")}</p>
              <p className="metadata text-ink/50 mt-2">{t("totalPercuLabel")}</p>
            </div>
            <div className="bg-bg-soft border border-line rounded-sm p-6">
              <p className="font-serif font-medium text-ink text-xl">60-90%</p>
              <p className="metadata text-ink/50 mt-2">{t("occupationLabel")}</p>
            </div>
            <div className="bg-bg-soft border border-line rounded-sm p-6">
              <p className="font-serif font-medium text-ink text-xl">~70€/nuit</p>
              <p className="metadata text-ink/50 mt-2">{t("tarifMoyenLabel")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Localisation */}
      <section className="bg-ink py-24 md:py-36 px-6">
        <div className="container-page max-w-4xl mx-auto text-center">
          <p className="ss-fade eyebrow mx-auto mb-6 text-bg/50">{t("locationEyebrow")}</p>
          <h2
            className="ss-fade font-serif font-medium text-bg leading-[1.0]"
            style={{ fontSize: "clamp(32px,4vw,60px)" }}
          >
            {t("locationTitle")}
          </h2>
          <div className="ss-fade mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {LOCATION_ITEMS.map((d) => (
              <div key={d.label}>
                <p className="font-serif font-medium text-bg text-2xl md:text-3xl">{d.value}</p>
                <p className="metadata text-bg/45 mt-2">{d.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="bg-bg-soft py-24 md:py-36 px-6">
        <div className="container-page max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="ss-fade eyebrow mx-auto mb-6">{t("guaranteesEyebrow")}</p>
            <h2
              className="ss-fade font-serif font-medium text-ink leading-[1.0]"
              style={{ fontSize: "clamp(32px,4vw,60px)" }}
            >
              {t("guaranteesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GUARANTEES.map((g) => (
              <div key={g.label} className="ss-fade bg-bg border border-line rounded-sm p-8">
                <p className="font-serif font-medium text-accent text-2xl mb-2">{g.value}</p>
                <p className="font-serif font-medium text-ink text-base mb-3">{g.label}</p>
                <p className="text-xs text-ink/50 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire dossier */}
      <section id="dossier" className="bg-bg py-24 md:py-36 px-6">
        <div className="container-page max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <p className="ss-fade eyebrow mb-6">{t("dossierEyebrow")}</p>
            <h2
              className="ss-fade font-serif font-medium text-ink leading-[1.0]"
              style={{ fontSize: "clamp(32px,4vw,60px)" }}
            >
              {t("dossierTitle")}
            </h2>
            <p className="ss-fade text-ink/65 mt-6 leading-relaxed">
              {t("dossierBody")}
            </p>
            <ul className="ss-fade mt-8 space-y-3 text-ink/70 text-[15px]">
              {DOSSIER_BULLETS.map((b) => (
                <li key={b} className="flex gap-3"><span className="text-accent mt-0.5">·</span>{b}</li>
              ))}
            </ul>

            <div className="ss-fade hidden md:block mt-12 relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/villa-exterior.webp"
                alt="Villa Seseh extérieur"
                fill
                quality={95}
                className="object-cover"
                sizes="500px"
              />
            </div>
          </div>

          <div className="ss-fade">
            {status === "success" ? (
              <div className="bg-bg-soft border border-line rounded-sm p-10 md:p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-serif font-medium text-ink text-2xl mb-4">
                  {t("successTitle")}
                </h2>
                <p className="text-ink/65 leading-relaxed">
                  {t("successBody")}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-bg-soft border border-line rounded-sm p-8 md:p-12"
              >
                <h2 className="font-serif font-medium text-ink text-xl md:text-2xl mb-2">
                  {t("formTitle")}
                </h2>
                <p className="text-ink/50 text-sm mb-8">
                  {t("formBody")}
                </p>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="form-label mb-2">{t("formFirstName")}</label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
                        placeholder="Gabriel"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="form-label mb-2">{t("formLastName")}</label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
                        placeholder="Lapierre"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label mb-2">{t("formEmail")}</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
                      placeholder="gabriel@exemple.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label mb-2">{t("formPhone")}</label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full mt-8 bg-accent text-bg font-serif font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded-full hover:bg-bg hover:text-ink transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? t("formSubmitting") : t("formSubmit")}
                </button>

                {status === "error" && (
                  <p className="mt-4 text-red-400 text-sm text-center">
                    {t("formError")}
                  </p>
                )}

                <p className="mt-6 metadata text-ink/35 text-center">
                  {t("formNote")}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
