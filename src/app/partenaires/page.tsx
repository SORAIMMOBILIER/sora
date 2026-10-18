import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { hreflangAlternates } from "@/lib/hreflang"
import PartenairesClient from "./partenaires-client"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Partenaires")

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: hreflangAlternates("/partenaires"),
    openGraph: { title: t("metaTitle"), description: t("metaDescription") },
    twitter: { title: t("metaTitle"), description: t("metaDescription") },
  }
}

export default function PartenairesPage() {
  return <PartenairesClient />
}
