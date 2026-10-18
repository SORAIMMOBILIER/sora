import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { hreflangAlternates } from "@/lib/hreflang"
import MasterclassClient from "./masterclass-client"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Masterclass")

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: hreflangAlternates("/masterclass"),
    openGraph: { title: t("metaTitle"), description: t("metaDescription") },
    twitter: { title: t("metaTitle"), description: t("metaDescription") },
  }
}

export default function MasterclassPage() {
  return <MasterclassClient />
}
