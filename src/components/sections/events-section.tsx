import Image from "next/image"
import Link from "next/link"
import { getTranslations, getLocale } from "next-intl/server"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { FEATURED_EVENTS_QUERY, WEBINAR_RECURRING_CARD_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import { webinarLabel } from "../../../lib/webinar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type EventItem = {
  _id: string
  title: string
  slug: string
  status?: string
  summary?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
  startsAt?: string
  duration?: string
}

type WebinarCard = {
  title?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
}

// Webinaire récurrent du mardi masqué en attendant qu'on le reprenne —
// repasser à true pour le réafficher, tout le reste est déjà en place.
const SHOW_TUESDAY_WEBINAR = false

function formatEventDate(date: string | undefined, locale: string, fallback: string) {
  if (!date) return fallback

  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export default async function EventsSection() {
  const t = await getTranslations("Home.Events")
  const locale = await getLocale()
  const STATUS_LABELS: Record<string, string> = {
    "en-cours": t("statusEnCours"),
    prochainement: t("statusProchainement"),
    termine: t("statusTermine"),
  }
  const [events, webinar] = await Promise.all([
    sanityFetch<EventItem[]>({ query: FEATURED_EVENTS_QUERY, tags: ["event"] }),
    sanityFetch<WebinarCard | null>({ query: WEBINAR_RECURRING_CARD_QUERY, tags: ["webinarRecurring"] }),
  ])

  return (
    <section className="bg-card py-24 md:py-36 px-6 overflow-hidden">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-16">
          <div className="max-w-4xl">
            <p className="eyebrow text-muted-foreground mb-6">{t("eyebrow")}</p>
            <h2 className="font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(36px,5vw,72px)" }}>
              {t("title")}
            </h2>
            <p className="text-foreground/65 max-w-2xl mt-6 leading-relaxed">
              {t("body")}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/events">{t("viewAll")}</Link>
          </Button>
        </div>

        <div className="scrollbar-hidden -mx-6 overflow-x-auto snap-x snap-mandatory">
          <div className="flex gap-4 md:gap-6 px-6 min-w-full">
            {SHOW_TUESDAY_WEBINAR && (
              <Link href="/live-SSV" className="group snap-start shrink-0 w-[82vw] sm:w-[60vw] md:w-[420px]">
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                    {webinar?.mainImage?.asset ? (
                      <Image
                        src={urlForImage(webinar.mainImage).width(840).height(630).url()}
                        alt={webinar.mainImage.alt || webinar.title || "Webinaire Sora"}
                        fill
                        sizes="(max-width:768px) 82vw, 420px"
                        className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                      />
                    ) : (
                      <Image
                        src="/villa-render-exterior.webp"
                        alt=""
                        fill
                        sizes="(max-width:768px) 82vw, 420px"
                        className="object-cover opacity-65 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                    <Badge variant="outline" className="absolute top-4 left-4 bg-background/85 backdrop-blur-sm border-border">
                      {t("statusProchainement")}
                    </Badge>
                  </div>
                  <CardContent className="p-6 md:p-7 flex flex-1 flex-col">
                    <p className="metadata text-foreground/45 mb-4 capitalize">{webinarLabel()} / 60 min</p>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-snug group-hover:text-accent transition-colors duration-300 mb-4">
                      {webinar?.title || t("webinarFallbackTitle")}
                    </h3>
                    <p className="text-sm text-foreground/65 leading-relaxed mb-8">
                      {t("webinarBody")}
                    </p>
                    <p className="metadata text-accent mt-auto">{t("signUp")}</p>
                  </CardContent>
                </Card>
              </Link>
            )}
            {events.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event.slug}`}
                className="group snap-start shrink-0 w-[82vw] sm:w-[60vw] md:w-[420px]"
              >
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                    {event.mainImage?.asset ? (
                      <Image
                        src={urlForImage(event.mainImage).width(840).height(630).url()}
                        alt={event.mainImage.alt || event.title}
                        fill
                        sizes="(max-width:768px) 82vw, 420px"
                        className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                      />
                    ) : (
                      <Image
                        src="/villa-render-exterior.webp"
                        alt=""
                        fill
                        sizes="(max-width:768px) 82vw, 420px"
                        className="object-cover opacity-65 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                    {event.status && (
                      <Badge variant="outline" className="absolute top-4 left-4 bg-background/85 backdrop-blur-sm border-border">
                        {STATUS_LABELS[event.status] || event.status}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6 md:p-7 flex flex-1 flex-col">
                    <p className="metadata text-foreground/45 mb-4">
                      {formatEventDate(event.startsAt, locale, t("dateToBeAnnounced"))}
                      {event.duration ? ` / ${event.duration}` : ""}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-snug group-hover:text-accent transition-colors duration-300 mb-4">
                      {event.title}
                    </h3>
                    {event.summary && <p className="text-sm text-foreground/65 leading-relaxed mb-8">{event.summary}</p>}
                    <p className="metadata text-accent mt-auto">
                      {event.status === "termine" ? t("viewReplay") : t("viewSession")}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
