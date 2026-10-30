import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLocale } from "next-intl/server"
import TasvanPage from "./tasvan-page"
import frContent from "../../../content/maison-seseh-bali/fr"
import enContent from "../../../content/maison-seseh-bali/en"
import type { MaisonSesehBaliContent } from "../../../content/maison-seseh-bali/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sora-immobilier.com"

function getContent(locale: string): MaisonSesehBaliContent | null {
  return locale === "en" ? enContent : frContent
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const content = getContent(locale)
  if (!content) notFound()

  const ogImage = new URL(content.hero.posterImage, SITE_URL).toString()

  return {
    title: content.meta.title,
    description: content.meta.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      images: [{ url: ogImage, width: 1200, height: 675 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: [ogImage],
    },
  }
}

export default async function MaisonSesehBaliPage() {
  const locale = await getLocale()
  const content = getContent(locale)
  if (!content) notFound()

  // Branche design-tasvan : même composant pour les deux langues, le
  // choix FR/EN se fait à l'intérieur (voir tasvan-page.tsx).
  return <TasvanPage />
}
