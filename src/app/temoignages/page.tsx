import type { Metadata } from "next"
import { getTranslations, getLocale } from "next-intl/server"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { TESTIMONIALS_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import { getStaticTranslatedQuote } from "@/lib/translate"
import TestimonialCard from "@/components/sections/temoignages/testimonial-card"
import { Button } from "@/components/ui/button"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Témoignages | SORA Immobilier",
  description: "Ce que disent les investisseurs qui ont fait confiance à SORA pour investir à Bali.",
}

const WHATSAPP_URL =
  "https://wa.me/33778114797?text=J%27aimerais%20en%20savoir%20plus%20sur%20vos%20projets%20d%27investissement%20%C3%A0%20Bali."

type Testimonial = {
  _id: string
  quote: string
  author?: string
  role?: string
  videoUrlDesktop?: string
  videoUrlMobile?: string
  image?: { asset?: { _ref: string }; alt?: string }
}

export default async function TemoignagesPage() {
  const t = await getTranslations("Temoignages")
  const locale = await getLocale()
  const testimonials = await sanityFetch<Testimonial[]>({ query: TESTIMONIALS_QUERY, tags: ["testimonial"] })

  return (
    <>
      <main className="bg-bg min-h-screen pt-32 md:pt-44 pb-24 px-6 md:px-12">
        <div className="container-page">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
            <p className="eyebrow mx-auto text-ink-muted mb-6">{t("eyebrow")}</p>
            <h1 className="font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(40px,6vw,96px)" }}>
              {t("title")}
            </h1>
            <p className="text-ink/60 mt-8 leading-relaxed text-base max-w-2xl mx-auto">
              {t("body")}
            </p>
          </div>

          {testimonials.length === 0 ? (
            <p className="text-center text-ink/50">{t("empty")}</p>
          ) : (
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
          )}

          <div className="text-center max-w-2xl mx-auto mt-20 md:mt-28">
            <h2 className="font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              {t("ctaTitle")}
            </h2>
            <p className="text-ink/60 mt-4 leading-relaxed text-base">
              {t("ctaBody")}
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="mt-8 bg-[#25D366] text-white border-transparent hover:bg-[#1ebe5a] hover:text-white hover:border-transparent"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t("ctaButton")}
              </a>
            </Button>
          </div>
        </div>

        {/* Bouton WhatsApp flottant */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discuter sur WhatsApp"
          className="group fixed bottom-[18px] right-[18px] md:bottom-7 md:right-7 z-50 flex items-center bg-[#25D366] text-white rounded-full shadow-lg p-3.5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
        >
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.004 2c-5.514 0-9.997 4.483-9.997 9.997 0 1.763.462 3.486 1.34 5.004L2 22l5.117-1.343a9.96 9.96 0 0 0 4.887 1.244h.005c5.514 0 9.997-4.483 9.997-9.997C21.998 6.483 17.518 2 12.004 2zm0 18.166h-.004a8.16 8.16 0 0 1-4.158-1.14l-.298-.177-3.036.796.81-2.96-.194-.304a8.147 8.147 0 0 1-1.253-4.384c0-4.508 3.669-8.176 8.177-8.176 2.184 0 4.238.851 5.783 2.397a8.13 8.13 0 0 1 2.394 5.785c0 4.508-3.67 8.163-8.221 8.163z" />
          </svg>
          <span className="max-w-0 group-hover:max-w-[160px] group-hover:ml-2.5 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300">
            {t("floatingLabel")}
          </span>
        </a>
      </main>
      <Footer />
    </>
  )
}
