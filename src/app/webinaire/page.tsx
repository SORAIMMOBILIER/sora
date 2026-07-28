import type { Metadata } from "next"
import Image from "next/image"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { WEBINAR_RECURRING_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import { webinarLabel } from "../../../lib/webinar"
import WebinarForm from "@/components/sections/webinar/webinar-form"
import TestimonialsGrid from "@/components/sections/temoignages/testimonials-grid"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Webinaire Sora | Investir à Bali",
  description: "Chaque mardi à 18h, découvrez le projet Seseh Sunset Villas : localisation, villas disponibles, prix d'entrée et livraison.",
}

type WebinarContent = {
  title?: string
  eyebrow?: string
  summary?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
}

const DEFAULT_TITLE = "Investir à Bali : présentation du projet Seseh Sunset Villas"
const DEFAULT_SUMMARY =
  "Une session en ligne pour découvrir le projet en détail : localisation à Seseh, nombre de villas disponibles, prix d'entrée et calendrier de livraison. Questions/réponses en direct."

export default async function WebinairePage() {
  const content = await sanityFetch<WebinarContent | null>({ query: WEBINAR_RECURRING_QUERY, tags: ["webinarRecurring"] })
  const label = webinarLabel()

  const heroImageUrl = content?.mainImage?.asset
    ? urlForImage(content.mainImage).width(1800).url()
    : "/villa-render-exterior.webp"

  return (
    <main className="bg-bg pt-32 md:pt-44 pb-24 px-6">
      <article className="container-page">
        <header className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end mb-14">
          <div className="md:col-span-7">
            <p className="eyebrow text-ink-muted mb-6">{content?.eyebrow || "Webinaire ce mardi"}</p>
            <h1 className="font-serif font-medium text-ink leading-[1.0] mb-8" style={{ fontSize: "clamp(38px,5vw,82px)" }}>
              {content?.title || DEFAULT_TITLE}
            </h1>
            <p className="text-lg md:text-xl text-ink/75 leading-relaxed max-w-2xl">
              {content?.summary || DEFAULT_SUMMARY}
            </p>
          </div>

          <aside className="md:col-span-5 bg-bg-soft border border-line rounded-sm p-6 md:p-8">
            <dl className="space-y-5 mb-8">
              <div>
                <dt className="metadata text-ink/45 mb-1">Date</dt>
                <dd className="text-ink leading-relaxed capitalize">{label}</dd>
              </div>
              <div>
                <dt className="metadata text-ink/45 mb-1">Heure</dt>
                <dd className="text-ink">
                  18h00 <span className="text-ink/50 text-sm ml-2">(heure de Paris)</span>
                </dd>
              </div>
              <div>
                <dt className="metadata text-ink/45 mb-1">Lieu</dt>
                <dd className="text-ink">En ligne (Google Meet)</dd>
              </div>
            </dl>
            <WebinarForm />
          </aside>
        </header>

        <div className="relative w-full h-[420px] md:h-[560px] rounded-sm overflow-hidden mb-16 bg-bg-mid">
          <Image
            src={heroImageUrl}
            alt={content?.mainImage?.alt || content?.title || "Webinaire Sora"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-transparent" />
        </div>
      </article>

      <div className="-mx-6">
        <TestimonialsGrid eyebrow="Ils ont assisté" title="Ce que disent les participants." />
      </div>
    </main>
  )
}
