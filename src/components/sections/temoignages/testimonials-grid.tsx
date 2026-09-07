import { getTranslations, getLocale } from "next-intl/server"
import { sanityFetch } from "../../../../sanity/lib/fetch"
import { TESTIMONIALS_QUERY } from "../../../../sanity/lib/queries"
import { urlForImage } from "../../../../sanity/lib/image"
import { getStaticTranslatedQuote } from "@/lib/translate"
import TestimonialCard from "./testimonial-card"

type Testimonial = {
  _id: string
  quote: string
  author?: string
  role?: string
  videoUrlDesktop?: string
  videoUrlMobile?: string
  image?: { asset?: { _ref: string }; alt?: string }
}

export default async function TestimonialsGrid({
  eyebrow,
  title,
}: {
  eyebrow?: string
  title?: string
}) {
  const t = await getTranslations("Temoignages")
  const locale = await getLocale()
  const resolvedEyebrow = eyebrow ?? t("eyebrow")
  const resolvedTitle = title ?? t("title")
  const testimonials = await sanityFetch<Testimonial[]>({ query: TESTIMONIALS_QUERY, tags: ["testimonial"] })

  if (testimonials.length === 0) return null

  return (
    <section className="bg-bg py-16 md:py-24 px-6 md:px-12">
      <div className="container-page">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow mx-auto text-ink-muted mb-6">{resolvedEyebrow}</p>
          <h2 className="font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(28px,4.5vw,56px)" }}>
            {resolvedTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item._id}
              quote={(locale === "en" && getStaticTranslatedQuote(item._id)) || item.quote}
              author={item.author}
              role={item.role}
              videoUrlDesktop={item.videoUrlDesktop}
              videoUrlMobile={item.videoUrlMobile}
              posterUrl={item.image?.asset ? urlForImage(item.image).width(800).height(1067).url() : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
