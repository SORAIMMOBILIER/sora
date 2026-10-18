import type { Metadata } from "next"
import { Agentation } from "agentation"
import { Hanken_Grotesk } from "next/font/google"
import localFont from "next/font/local"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import type { Locale } from "@/i18n/request"
import { type NavRealisation } from "@/components/layout/navbar"
import { SiteChrome, ConditionalSmoothScroll, DevAgentation } from "@/components/layout/site-chrome"
import CookieBanner from "@/components/layout/cookie-banner"
import { sanityFetch } from "../../sanity/lib/fetch"
import { NAV_REALISATIONS_QUERY } from "../../sanity/lib/queries"
import { translateToEnglish } from "@/lib/translate"
import { organizationJsonLd } from "@/lib/structured-data"
import { hreflangAlternates } from "@/lib/hreflang"
import "./globals.css"

const eightly = localFont({
  src: [
    { path: "../../public/fonts/eightlyteenage-light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/eightlyteenage-lightitalic.otf", weight: "300", style: "italic" },
    { path: "../../public/fonts/eightlyteenage-regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/eightlyteenage-italic.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/eightlyteenage-medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/eightlyteenage-mediumitalic.otf", weight: "500", style: "italic" },
    { path: "../../public/fonts/eightlyteenage-semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/eightlyteenage-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-eightly",
  display: "swap",
})

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.sora-immobilier.com")
const ogImageUrl = new URL("/og-image.jpg", siteUrl)
const faviconUrl = new URL("/favicon.ico", siteUrl)

// Filet de sécurité : la langue dépend d'un en-tête relu à chaque requête
// (voir src/i18n/request.ts) — on interdit explicitement toute mise en
// cache statique du layout pour ne jamais servir la mauvaise langue.
export const dynamic = "force-dynamic"

// Titre/description "de secours" du site : utilisés tels quels par toute
// page qui ne définit pas son propre generateMetadata (ex : la page
// d'accueil elle-même). Avant ce correctif, ce bloc était figé en
// français même sur les URLs /en/... — Google recevait alors un titre
// français sur des pages anglaises. Il est maintenant recalculé par
// langue via generateMetadata ci-dessous.
const SITE_META: Record<Locale, { title: string; description: string; ogAlt: string; ogLocale: string }> = {
  fr: {
    title: "SORA Immobilier | Investir à Bali clé en main",
    description: "Accédez à des projets immobiliers sélectionnés à Bali, avec structuration juridique, suivi terrain et gestion locative clé en main.",
    ogAlt: "SORA Immobilier, investir à Bali clé en main",
    ogLocale: "fr_FR",
  },
  en: {
    title: "SORA Immobilier | Invest in Bali, Turnkey",
    description: "Access selected real estate projects in Bali, with legal structuring, on-the-ground oversight and turnkey rental management.",
    ogAlt: "SORA Immobilier, invest in Bali turnkey",
    ogLocale: "en_US",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale
  const m = SITE_META[locale] ?? SITE_META.fr

  return {
    metadataBase: siteUrl,
    title: m.title,
    description: m.description,
    alternates: hreflangAlternates("/"),
    // Balise de vérification Google Search Console — posée une seule
    // fois ici, dans le layout racine, elle est donc présente dans le
    // <head> de TOUTES les pages du site automatiquement.
    verification: {
      google: "XeZC83ix4I_SR8OuTOC93uxpBsobTsEHPYxk675z2HY",
    },
    icons: {
      icon: [{ url: faviconUrl }],
      shortcut: [{ url: faviconUrl }],
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: siteUrl,
      siteName: "SORA Immobilier",
      locale: m.ogLocale,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 675,
          alt: m.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [ogImageUrl],
    },
  }
}

const STATUS_LABEL: Record<string, NavRealisation["status"]> = {
  "en-cours": "En cours",
  "prochainement": "Prochainement",
  "livre": "Livré",
}

type NavRealisationRaw = {
  slug: string
  status?: string
  location?: string
  cardTitle?: string
  heroTitle?: string
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()

  // Le layout racine wrappe aussi /studio (Sanity Studio, page "force-static").
  // Ce fetch + cette traduction ne servent qu'au menu Réalisations de la
  // navbar (masquée sur /studio) — jamais essentiels au rendu de la page.
  // Protégés par un try/catch pour ne jamais faire planter une route qui
  // n'a même pas besoin de cette donnée.
  let navRealisations: NavRealisation[] = []
  try {
    const raw = await sanityFetch<NavRealisationRaw[]>({ query: NAV_REALISATIONS_QUERY, tags: ["realisation"] })

    const translatedText =
      locale === "en"
        ? await translateToEnglish(
            raw.map((r) => ({ slug: r.slug, location: r.location || "", title: r.cardTitle || r.heroTitle || "" })),
            "home-carousel-realisations",
          )
        : null
    const navTextBySlug = new Map((translatedText || []).map((r) => [r.slug, r]))

    navRealisations = raw.map((r) => {
      const en = navTextBySlug.get(r.slug)
      return {
        slug: r.slug,
        status: STATUS_LABEL[r.status || "en-cours"] || "En cours",
        location: en?.location || r.location || "",
        title: en?.title || r.cardTitle || r.heroTitle || "",
      }
    })
  } catch {
    navRealisations = []
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${eightly.variable} ${hanken.variable}`}>
      <body>
        {/* Organization/RealEstateAgent (schema.org) : une seule fois,
            commune à tout le site — voir src/lib/structured-data.ts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ConditionalSmoothScroll>
            <SiteChrome realisations={navRealisations} />
            {children}
            {process.env.NODE_ENV === "development" && (
              <DevAgentation>
                <Agentation />
              </DevAgentation>
            )}
            <CookieBanner />
          </ConditionalSmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
