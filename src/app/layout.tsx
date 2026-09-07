import type { Metadata } from "next"
import { Agentation } from "agentation"
import { Hanken_Grotesk } from "next/font/google"
import localFont from "next/font/local"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { type NavRealisation } from "@/components/layout/navbar"
import { SiteChrome, ConditionalSmoothScroll, DevAgentation } from "@/components/layout/site-chrome"
import CookieBanner from "@/components/layout/cookie-banner"
import { sanityFetch } from "../../sanity/lib/fetch"
import { NAV_REALISATIONS_QUERY } from "../../sanity/lib/queries"
import { translateToEnglish } from "@/lib/translate"
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

const title = "SORA Immobilier | Investir à Bali clé en main"
const description = "Accédez à des projets immobiliers sélectionnés à Bali, avec structuration juridique, suivi terrain et gestion locative clé en main."
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sora-five-sigma.vercel.app")
const ogImageUrl = new URL("/og-image.jpg", siteUrl)
const faviconUrl = new URL("/favicon.ico", siteUrl)

// Filet de sécurité : la langue dépend d'un cookie relu à chaque requête
// (voir src/i18n/request.ts) — on interdit explicitement toute mise en
// cache statique du layout pour ne jamais servir la mauvaise langue.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  icons: {
    icon: [{ url: faviconUrl }],
    shortcut: [{ url: faviconUrl }],
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "SORA Immobilier",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 675,
        alt: "SORA Immobilier, investir à Bali clé en main",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImageUrl],
  },
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
