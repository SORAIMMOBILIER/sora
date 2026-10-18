"use client"
import { useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import Footer from "@/components/layout/footer"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

type Chapter = { n: string; title: string; desc: string }
type Stat = { value: string; label: string }
type Point = { title: string; desc: string }

export default function EbookPage() {
  const t = useTranslations("Ebook")
  const CHAPTERS = t.raw("chapters") as Chapter[]
  const STATS = t.raw("stats") as Stat[]
  const POINTS = t.raw("points") as Point[]
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "ebook-guide",
          acTagId: "65",
          acListId: "7",
          freshsalesTag: "EBOOK-GUIDE",
        }),
      })

      if (res.ok) {
        setStatus("success")
        window.fbq?.("track", "Lead", { source: "ebook-guide" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
      <main className="bg-background min-h-screen">
        {/* Hero */}
        <section className="px-6 pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="eyebrow text-muted-foreground mb-6">{t("eyebrow")}</p>
              <h1
                className="font-serif font-medium text-foreground leading-[0.95]"
                style={{ fontSize: "clamp(32px,4.5vw,56px)" }}
              >
                {t("title")}
              </h1>
              <p className="text-foreground/60 mt-6 leading-relaxed text-lg">
                {t("body")}
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="font-serif font-medium text-accent text-xl">{s.value}</p>
                    <p className="metadata text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cover + Form */}
            <div>
              <div className="relative aspect-[3/4] max-w-[320px] mx-auto mb-8 rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/seseh/complexe/aerial.webp"
                  alt="Guide d'ingénierie immobilière Sora"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-foreground/40" />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div>
                    <p className="metadata text-background/60">{t("coverBrand")}</p>
                    <p className="metadata text-background/40 mt-1">{t("coverEdition")}</p>
                  </div>
                  <div>
                    <p className="metadata text-background/50 mb-2">{t("coverKicker")}</p>
                    <p className="font-serif font-medium text-background text-lg leading-tight">
                      {t("coverTitle")}
                    </p>
                    <div className="mt-4 pt-4 border-t border-background/20">
                      <p className="font-serif text-background/80 text-sm">{t("coverByline")}</p>
                      <p className="metadata text-background/40">{t("coverRole")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sommaire */}
        <section className="bg-card border-y border-border px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <p className="eyebrow text-muted-foreground mb-8">{t("chaptersEyebrow")}</p>
            <div className="space-y-0">
              {CHAPTERS.map((ch) => (
                <div key={ch.n} className="flex items-baseline gap-4 py-4 border-b border-border last:border-0">
                  <span className="font-serif text-muted-foreground/40 text-lg tabular-nums w-8 shrink-0">{ch.n}</span>
                  <span className="font-serif font-medium text-foreground text-base">{ch.title}</span>
                  <span className="hidden md:block flex-1 border-b border-dotted border-border mx-2" />
                  <span className="hidden md:block text-muted-foreground text-sm text-right">{ch.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Points clés */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {POINTS.map((p) => (
                <div key={p.title} className="bg-card border border-border rounded-sm p-6">
                  <p className="font-serif font-medium text-foreground text-base mb-3">{p.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulaire */}
        <section id="telecharger" className="bg-card border-t border-border px-6 py-16 md:py-24">
          <div className="max-w-lg mx-auto">
            {status === "success" ? (
              <div className="bg-background border border-border rounded-sm p-10 md:p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-serif font-medium text-foreground text-2xl mb-4">{t("successTitle")}</h2>
                <p className="text-foreground/65 leading-relaxed mb-8">
                  {t("successBody")}
                </p>
                <a
                  href="/ebook-guide-sora.pdf"
                  download
                  className="cta-primary font-serif font-semibold inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t("downloadCta")}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-background border border-border rounded-sm p-8 md:p-12">
                <h2 className="font-serif font-medium text-foreground text-xl md:text-2xl mb-2">
                  {t("formTitle")}
                </h2>
                <p className="text-foreground/50 text-sm mb-8">
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
                        className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
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
                        className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
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
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
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
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground text-sm focus:border-accent focus:outline-none transition-colors"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={status === "loading"} className="w-full mt-8">
                  {status === "loading" ? t("formSubmitting") : t("formSubmit")}
                </Button>

                {status === "error" && (
                  <p className="mt-4 text-destructive text-sm text-center">
                    {t("formError")}
                  </p>
                )}

                <p className="mt-6 metadata text-foreground/35 text-center">
                  {t("formNote")}
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
