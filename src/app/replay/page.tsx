import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { WEBINAR_RECURRING_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import TestimonialsGrid from "@/components/sections/temoignages/testimonials-grid"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Replay du webinaire | SORA Immobilier",
  description: "Revoir la dernière session du webinaire hebdomadaire SORA sur le projet Seseh Sunset Villas.",
}

type WebinarContent = {
  title?: string
  summary?: string
  replayUrl?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
}

export default async function ReplayPage() {
  const content = await sanityFetch<WebinarContent | null>({ query: WEBINAR_RECURRING_QUERY, tags: ["webinarRecurring"] })

  const heroImageUrl = content?.mainImage?.asset
    ? urlForImage(content.mainImage).width(2400).url()
    : "/villa-render-exterior.webp"

  return (
    <main className="bg-bg">
      <section
        className="relative px-6 pt-40 md:pt-48 pb-20 md:pb-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

        <div className="relative container-page max-w-4xl mx-auto text-center">
          <p className="eyebrow-dark mx-auto mb-6">Replay</p>
          <h1
            className="font-serif font-medium text-bg leading-[1.02] mb-6"
            style={{ fontSize: "clamp(32px,4.5vw,64px)" }}
          >
            {content?.title || "Revivez la dernière session."}
          </h1>
          {content?.summary && (
            <p className="text-bg/80 leading-relaxed max-w-2xl mx-auto mb-10">{content.summary}</p>
          )}

          {content?.replayUrl ? (
            <div className="relative aspect-video w-full max-w-3xl mx-auto overflow-hidden rounded-sm bg-ink shadow-2xl">
              <video
                src={content.replayUrl}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ) : (
            <p className="text-bg/70">
              Le replay de la dernière session sera disponible ici prochainement.
            </p>
          )}

          <p className="text-bg/70 mt-10">
            Vous voulez échanger sur votre projet ?{" "}
            <Link href="/webinaire" className="text-bg underline underline-offset-4 hover:text-accent transition-colors">
              Réservez votre place au prochain webinaire
            </Link>
          </p>
        </div>
      </section>

      <TestimonialsGrid eyebrow="Ils ont assisté" title="Ce que disent les participants." />
    </main>
  )
}
