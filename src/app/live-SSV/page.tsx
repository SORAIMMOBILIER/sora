import type { Metadata } from "next"
import Image from "next/image"
import { MapPin, Home, Key, Scale, ShieldCheck, MessageCircle, Compass, Briefcase, FileCheck2, Mic } from "lucide-react"
import { getTranslations, getLocale } from "next-intl/server"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { WEBINAR_RECURRING_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import { webinarLabel } from "../../../lib/webinar"
import WebinarForm from "@/components/sections/webinar/webinar-form"
import TestimonialsGrid from "@/components/sections/temoignages/testimonials-grid"
import { translateToEnglish } from "@/lib/translate"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Webinaire live | Investir à Bali — Seseh Sunset Villas",
  description: "Webinaire gratuit en direct : découvrez le projet Seseh Sunset Villas à Bali, 26 villas clé en main à 300 m de la plage.",
}

type WebinarContent = {
  title?: string
  eyebrow?: string
  summary?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
  villasDisponibles?: number
}

type Gamme = { name: string; price: string; surface: string; chambres: string; equipement: string }
type Garantie = { label: string; value: string; description: string }
type FaqItem = { q: string; a: string }

const DECOUVERTE_ICONS = [MapPin, Home, Key, Scale, ShieldCheck, MessageCircle]
const PROFILS_ICONS = [Compass, Briefcase, FileCheck2, Mic]

export default async function WebinairePage() {
  const t = await getTranslations("LiveSSV")
  const tw = await getTranslations("Webinar")
  const locale = await getLocale()
  const content = await sanityFetch<WebinarContent | null>({ query: WEBINAR_RECURRING_QUERY, tags: ["webinarRecurring"] })
  const label = webinarLabel(undefined, locale === "en" ? "en" : "fr")

  if (locale === "en" && content) {
    const en = await translateToEnglish(
      { eyebrow: content.eyebrow, summary: content.summary },
      "webinar-recurring-content",
    )
    content.eyebrow = en.eyebrow
    content.summary = en.summary
  }

  const GAMMES = tw.raw("gammes") as Gamme[]
  const GARANTIES = tw.raw("garanties") as Garantie[]
  const CONFIANCE_PARTENAIRES = tw.raw("confiancePartenaires") as string[]
  const CREDIBILITE = tw.raw("credibilite") as { projets: string; villas: string; investisseurs: string; roadshows: string }
  const DECOUVERTE = t.raw("decouverte") as string[]
  const PROFILS = t.raw("profils") as string[]
  const FAQ = t.raw("faq") as FaqItem[]

  const heroImageUrl = content?.mainImage?.asset
    ? urlForImage(content.mainImage).width(1800).url()
    : "/seseh-vue-aerienne.jpg"

  return (
    <main className="bg-bg pt-32 md:pt-44 pb-24 px-6">
      <article className="container-page">
        {/* 1. Hero + bloc date/urgence */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start mb-14">
          <div className="md:col-span-7">
            <p className="eyebrow text-ink-muted mb-6">{content?.eyebrow || t("defaultEyebrow")}</p>
            <h1 className="font-serif font-medium text-ink leading-[1.0] mb-8" style={{ fontSize: "clamp(38px,5vw,72px)" }}>
              {content?.title || t("defaultTitle")}
            </h1>
            <p className="text-lg text-ink/75 leading-relaxed max-w-2xl mb-8">
              {content?.summary || t("defaultSummary")}
            </p>
            <div className="inline-flex flex-col gap-1 bg-primary rounded-sm px-6 py-4 mb-6">
              <span className="metadata text-background/60">{t("nextSession")}</span>
              <span className="text-background text-lg capitalize">{label} <span className="text-background/60 text-sm">{t("parisTime")}</span></span>
            </div>
            {typeof content?.villasDisponibles === "number" && (
              <p className="text-accent font-medium">
                {t("villasRemaining", { n: content.villasDisponibles })}
              </p>
            )}
          </div>

          <aside className="md:col-span-5 bg-bg-soft border border-line rounded-sm p-6 md:p-8">
            <WebinarForm />
          </aside>
        </header>

        <div className="relative w-full h-[320px] md:h-[480px] rounded-sm overflow-hidden mb-20 md:mb-28 bg-bg-mid">
          <Image
            src={heroImageUrl}
            alt={content?.mainImage?.alt || content?.title || "Seseh Sunset Villas"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-transparent" />
        </div>

        {/* 3. Ce que vous allez découvrir */}
        <section className="mb-20 md:mb-28">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow text-ink-muted mb-6">{t("programEyebrow")}</p>
            <h2 className="font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
              {t("programTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {DECOUVERTE.map((text, i) => {
              const Icon = DECOUVERTE_ICONS[i]
              return (
                <div key={text} className="flex gap-4">
                  <Icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <p className="text-ink/80 leading-relaxed">{text}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* 4. Le projet Seseh Sunset Villas */}
        <section className="bg-bg-soft border border-line rounded-sm p-8 md:p-12 mb-20 md:mb-28">
          <p className="eyebrow text-ink-muted mb-6">{t("projectEyebrow")}</p>
          <h2 className="font-serif font-medium text-ink leading-[1.05] mb-6" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
            {t("projectTitle")}
          </h2>
          <p className="text-ink/75 leading-relaxed max-w-2xl mb-8">
            {t("projectBody")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {GAMMES.map((g) => (
              <div key={g.name} className="bg-bg border border-line rounded-sm p-5">
                <p className="font-serif text-xl text-ink mb-1">{g.name}</p>
                <p className="text-accent font-medium mb-3">{g.price}</p>
                <p className="text-ink/60 text-sm">{g.surface} · {g.chambres}</p>
                <p className="text-ink/60 text-sm">{g.equipement}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. À qui s'adresse ce webinaire */}
        <section className="mb-20 md:mb-28">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow text-ink-muted mb-6">{t("forWhoEyebrow")}</p>
            <h2 className="font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
              {t("forWhoTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {PROFILS.map((text, i) => {
              const Icon = PROFILS_ICONS[i]
              return (
                <div key={text} className="flex gap-4 bg-bg-soft border border-line rounded-sm p-6">
                  <Icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <p className="text-ink/80 leading-relaxed">{text}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* 6. Qui anime */}
        <section className="mb-20 md:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-primary rounded-sm p-8 md:p-12">
            <div className="md:col-span-4 relative h-80 md:h-full min-h-[260px] rounded-sm overflow-hidden">
              <Image src="/gabriel-lapierre.webp" alt="Gabriel Lapierre" fill className="object-cover object-top" sizes="(max-width:768px) 100vw, 33vw" />
            </div>
            <div className="md:col-span-8">
              <p className="tertiary text-background/60 mb-3">{t("hostEyebrow")}</p>
              <h3 className="font-serif text-3xl text-background mb-4">Gabriel Lapierre</h3>
              <div className="space-y-3 text-background/85 leading-relaxed mb-6 max-w-xl">
                <p>
                  {t("hostP1")}
                </p>
                <p className="text-background/70 text-sm">
                  {t("hostP2")}
                </p>
                <p className="text-background/70 text-sm">
                  {t("hostP3")}
                </p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-background/70 text-sm">
                <span>{CREDIBILITE.projets}</span>
                <span>·</span>
                <span>{CREDIBILITE.villas}</span>
                <span>·</span>
                <span>{CREDIBILITE.investisseurs}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Bandeau confiance */}
        <section className="mb-20 md:mb-28">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow text-ink-muted mb-6">{t("securityEyebrow")}</p>
            <h2 className="font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
              {t("securityTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {GARANTIES.map((g) => (
              <div key={g.label} className="border border-line rounded-sm p-6">
                <p className="font-serif text-3xl text-ink mb-2">{g.value}</p>
                <p className="text-ink font-medium mb-1">{g.label}</p>
                <p className="text-ink/60 text-sm">{g.description}</p>
              </div>
            ))}
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CONFIANCE_PARTENAIRES.map((p) => (
              <li key={p} className="text-ink/70 text-sm flex gap-2">
                <span className="text-accent">—</span> {p}
              </li>
            ))}
          </ul>
        </section>

        {/* 8. FAQ */}
        <section className="mb-20 md:mb-28 max-w-3xl">
          <p className="eyebrow text-ink-muted mb-6">{t("faqEyebrow")}</p>
          <h2 className="font-serif font-medium text-ink leading-[1.05] mb-10" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
            {t("faqTitle")}
          </h2>
          <div className="divide-y divide-line border-t border-b border-line">
            {FAQ.map((item) => (
              <div key={item.q} className="py-6">
                <p className="font-serif text-lg text-ink mb-2">{item.q}</p>
                <p className="text-ink/65 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. CTA final */}
        <section id="inscription" className="bg-bg-soft border border-line rounded-sm p-8 md:p-12 text-center">
          <p className="text-ink capitalize mb-6">{t("finalSession", { label })}</p>
          <h2 className="font-serif font-medium text-ink leading-[1.05] mb-8" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
            {t("finalTitle")}
          </h2>
          <div className="max-w-md mx-auto text-left">
            <WebinarForm showHeading={false} />
          </div>
        </section>
      </article>

      <div className="-mx-6 mt-20 md:mt-28">
        <TestimonialsGrid eyebrow={t("testimonialsEyebrow")} title={t("testimonialsTitle")} />
      </div>

      <section className="container-page px-6 mt-20 md:mt-28">
        <div className="bg-primary rounded-sm p-8 md:p-16">
          <div className="text-center mb-10">
            <p className="text-background/60 capitalize mb-6">{t("finalSession", { label })}</p>
            <h2 className="font-serif font-medium text-background leading-[1.05]" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
              {t("bottomCtaTitle")}
            </h2>
          </div>
          <div className="max-w-md mx-auto bg-bg-soft border border-line rounded-sm p-6 md:p-8 text-left">
            <WebinarForm showHeading={false} />
          </div>
        </div>
      </section>
    </main>
  )
}
