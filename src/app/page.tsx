import HeroSection from "@/components/sections/hero-section"
import StatsSection from "@/components/sections/stats-section"
import BrochureCta from "@/components/sections/brochure-cta"
import ProjectSection from "@/components/sections/project-section"
import CarouselSection, { type Realisation } from "@/components/sections/carousel-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import EventsSection from "@/components/sections/events-section"
import PodcastSection from "@/components/sections/podcast-section"
import FounderSection from "@/components/sections/founder-section"
import FaqSection from "@/components/sections/faq-section"
import CtaSection from "@/components/sections/cta-section"
import Footer from "@/components/layout/footer"
import { getLocale } from "next-intl/server"
import { sanityFetch } from "../../sanity/lib/fetch"
import { ALL_REALISATIONS_QUERY } from "../../sanity/lib/queries"
import { urlForImage } from "../../sanity/lib/image"
import { translateToEnglish } from "@/lib/translate"

type RealisationRaw = {
  _id: string
  slug: string
  status?: string
  location?: string
  priceLabel?: string
  cardTitle?: string
  cardDescription?: string
  cardImage?: { asset?: { _ref: string }; alt?: string }
  tags?: string[]
}

const STATUS_LABEL: Record<string, Realisation["status"]> = {
  "en-cours": "En cours",
  "prochainement": "Prochainement",
  "livre": "Livré",
}

export default async function Home() {
  const locale = await getLocale()
  const realisationsRaw = await sanityFetch<RealisationRaw[]>({ query: ALL_REALISATIONS_QUERY, tags: ["realisation"] })

  const SLUG_ORDER: Record<string, number> = { "seseh": 0, "canggu": 1, "canggu-residence-2024": 2, "uluwatu": 3 }
  const sorted = [...realisationsRaw].sort((a, b) => (SLUG_ORDER[a.slug] ?? 9) - (SLUG_ORDER[b.slug] ?? 9))

  const translatedText =
    locale === "en"
      ? await translateToEnglish(
          sorted.map((r) => ({
            slug: r.slug,
            location: r.location || "",
            title: r.cardTitle || "",
            description: r.cardDescription || "",
            tags: r.tags || [],
          })),
          "home-carousel-realisations",
        )
      : null
  const textBySlug = new Map((translatedText || []).map((r) => [r.slug, r]))

  const realisations: Realisation[] = sorted.map((r) => {
    const en = textBySlug.get(r.slug)
    return {
      slug: r.slug,
      image: r.cardImage?.asset ? urlForImage(r.cardImage).width(1600).url() : "/villa-exterior.webp",
      imageAlt: r.cardImage?.alt || r.cardTitle || "",
      location: en?.location || r.location || "",
      price: r.priceLabel || "",
      title: en?.title || r.cardTitle || "",
      description: en?.description || r.cardDescription || "",
      tags: en?.tags || r.tags || [],
      status: STATUS_LABEL[r.status || "en-cours"] || "En cours",
    }
  })


  return (
    <main>
      <HeroSection />
      <StatsSection />
      <BrochureCta />
      <ProjectSection />
      <CarouselSection realisations={realisations} />
      <TestimonialsSection />
      <EventsSection />
      <PodcastSection />
      <FounderSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
