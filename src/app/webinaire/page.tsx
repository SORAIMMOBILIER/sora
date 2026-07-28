import type { Metadata } from "next"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { WEBINAR_RECURRING_QUERY } from "../../../sanity/lib/queries"
import { webinarLabel } from "../../../lib/webinar"
import WebinarForm from "@/components/sections/webinar/webinar-form"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Webinaire Sora | Investir à Bali",
  description: "Chaque mardi à 18h, découvrez le projet Seseh Sunset Villas : localisation, villas disponibles, prix d'entrée et livraison.",
}

type WebinarContent = {
  title?: string
  eyebrow?: string
  summary?: string
}

const DEFAULT_TITLE = "Investir à Bali : présentation du projet Seseh Sunset Villas"
const DEFAULT_SUMMARY =
  "Une session en ligne pour découvrir le projet en détail : localisation à Seseh, nombre de villas disponibles, prix d'entrée et calendrier de livraison. Questions/réponses en direct."

export default async function WebinairePage() {
  const content = await sanityFetch<WebinarContent | null>({ query: WEBINAR_RECURRING_QUERY, tags: ["webinarRecurring"] })
  const label = webinarLabel()

  return (
    <main className="bg-bg min-h-screen pt-32 md:pt-44 pb-24 px-6">
      <div className="container-page max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <p className="eyebrow mb-6 text-ink-muted">
              {content?.eyebrow || "Webinaire hebdomadaire"}
            </p>
            <h1
              className="font-serif font-medium text-ink leading-[1.02] mb-6"
              style={{ fontSize: "clamp(32px,4.5vw,56px)" }}
            >
              {content?.title || DEFAULT_TITLE}
            </h1>
            <p className="text-lg text-ink capitalize mb-6">{label}</p>
            <p className="text-ink/70 leading-relaxed">
              {content?.summary || DEFAULT_SUMMARY}
            </p>
          </div>

          <WebinarForm />
        </div>
      </div>
    </main>
  )
}
