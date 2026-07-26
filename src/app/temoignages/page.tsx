import type { Metadata } from "next"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { TESTIMONIALS_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import TestimonialCard from "@/components/sections/temoignages/testimonial-card"

export const metadata: Metadata = {
  title: "Témoignages | SORA Immobilier",
  description: "Ce que disent les investisseurs qui ont fait confiance à SORA pour investir à Bali.",
}

type Testimonial = {
  _id: string
  quote: string
  author?: string
  role?: string
  videoUrl?: string
  image?: { asset?: { _ref: string }; alt?: string }
}

export default async function TemoignagesPage() {
  const testimonials = await sanityFetch<Testimonial[]>({ query: TESTIMONIALS_QUERY, tags: ["testimonial"] })

  return (
    <main className="bg-bg min-h-screen pt-32 md:pt-44 pb-24 px-6 md:px-12">
      <div className="container-page">
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <p className="eyebrow mx-auto text-ink-muted mb-6">Témoignages</p>
          <h1 className="font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(40px,6vw,96px)" }}>
            Ce que disent ceux qui ont investi.
          </h1>
          <p className="text-ink/60 mt-8 leading-relaxed text-base max-w-2xl mx-auto">
            Des retours d&apos;investisseurs accompagnés par Sora, sur leur expérience, du premier échange à la gestion locative.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-ink/50">Les témoignages seront affichés ici dès leur publication.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t._id}
                quote={t.quote}
                author={t.author}
                role={t.role}
                videoUrl={t.videoUrl}
                posterUrl={t.image?.asset ? urlForImage(t.image).width(800).height(1067).url() : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
