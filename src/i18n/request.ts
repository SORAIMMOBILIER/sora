import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

export const LOCALES = ["fr", "en"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "fr"

// Pas de segment [locale] dans l'arborescence des routes : le français
// reste sur les URLs actuelles (aucun changement, zéro risque pour le
// référencement existant), l'anglais est servi via un préfixe /en/...
// réécrit en interne vers la même page (voir next.config.ts). La langue
// se déduit donc d'un cookie posé par le middleware, pas d'un paramètre
// de route.
export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const raw = cookieStore.get("NEXT_LOCALE")?.value
  const locale: Locale = raw === "en" ? "en" : DEFAULT_LOCALE

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
