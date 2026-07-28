import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { WEBINAR_RECURRING_QUERY } from "../../../sanity/lib/queries"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Replay du webinaire | SORA Immobilier",
  description: "Revoir la dernière session du webinaire hebdomadaire SORA sur le projet Seseh Sunset Villas.",
}

type WebinarContent = {
  title?: string
  replayUrl?: string
}

export default async function ReplayPage() {
  const content = await sanityFetch<WebinarContent | null>({ query: WEBINAR_RECURRING_QUERY, tags: ["webinarRecurring"] })

  return (
    <main className="bg-bg min-h-screen pt-32 md:pt-44 pb-24 px-6">
      <div className="container-page max-w-4xl mx-auto text-center">
        <p className="eyebrow mx-auto text-ink-muted mb-6">Replay</p>
        <h1
          className="font-serif font-medium text-ink leading-[1.02] mb-10"
          style={{ fontSize: "clamp(32px,4.5vw,56px)" }}
        >
          {content?.title || "Revivez la dernière session."}
        </h1>

        {content?.replayUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-ink">
            <video
              src={content.replayUrl}
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : (
          <p className="text-ink/60">
            Le replay de la dernière session sera disponible ici prochainement.
          </p>
        )}

        <p className="text-ink/60 mt-10">
          Vous voulez échanger sur votre projet ?{" "}
          <Link href="/webinaire" className="text-ink underline underline-offset-4 hover:text-accent transition-colors">
            Réservez votre place au prochain webinaire
          </Link>
        </p>
      </div>
    </main>
  )
}
