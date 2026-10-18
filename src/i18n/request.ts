import { getRequestConfig } from "next-intl/server"
import { headers } from "next/headers"

export const LOCALES = ["fr", "en"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "fr"

// Pas de segment [locale] dans l'arborescence des routes : le français
// reste sur les URLs actuelles (aucun changement, zéro risque pour le
// référencement existant), l'anglais est servi via un préfixe /en/...
// réécrit en interne vers la même page (voir next.config.ts). La langue
// se déduit d'un en-tête (x-locale) posé par le middleware à partir du
// préfixe d'URL — fiable dès la toute première requête, contrairement à
// un cookie. Voir middleware.ts pour le détail.
export default getRequestConfig(async () => {
  const headerStore = await headers()
  const raw = headerStore.get("x-locale")
  const locale: Locale = raw === "en" ? "en" : DEFAULT_LOCALE

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
