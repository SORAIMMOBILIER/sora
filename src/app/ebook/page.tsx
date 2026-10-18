import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { hreflangAlternates } from "@/lib/hreflang"
import EbookClient from "./ebook-client"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Ebook")

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: hreflangAlternates("/ebook"),
    openGraph: { title: t("metaTitle"), description: t("metaDescription") },
    twitter: { title: t("metaTitle"), description: t("metaDescription") },
  }
}

export default function EbookPage() {
  return <EbookClient />
}
