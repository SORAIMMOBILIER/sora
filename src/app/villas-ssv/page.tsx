import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { hreflangAlternates } from "@/lib/hreflang"
import VSLClient from "./villas-ssv-client"

// Avant ce correctif, cette page (vidéo de présentation du projet Seseh)
// n'avait aucun titre ni description dédiés : Google affichait le titre
// générique de la page d'accueil, sans jamais mentionner "Seseh".
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("VillasSSV")

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: hreflangAlternates("/villas-ssv"),
    openGraph: { title: t("metaTitle"), description: t("metaDescription") },
    twitter: { title: t("metaTitle"), description: t("metaDescription") },
  }
}

export default function VSLPage() {
  return <VSLClient />
}
