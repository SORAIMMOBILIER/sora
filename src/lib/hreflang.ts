import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import type { Locale } from "@/i18n/request"

// Construit le bloc "alternates" (canonical + hreflang) d'une page.
// Le français reste sur son URL actuelle (frPath) ; l'anglais est servi
// via le préfixe /en/... (voir next.config.ts), sauf cas particulier
// (ex : /fondateurs vs /en/founders) passé explicitement en enPath.
// "x-default" pointe vers le français : c'est la version "par défaut"
// historique et la plus indexée du site.
//
// canonical = frPath ou enPath selon la langue réellement servie (déduite
// de l'en-tête x-locale posé par le middleware, voir src/i18n/request.ts).
// Avant ce correctif, aucune page du site (sauf /fondateurs, qui le
// calculait à la main) ne posait de balise canonique : Google choisissait
// lui-même une URL parmi les variantes (http/https, avec/sans www,
// avec/sans paramètres de tracking) — c'est exactement ce que Search
// Console signale comme "page en double sans URL canonique sélectionnée".
export async function hreflangAlternates(frPath: string, enPath?: string): Promise<Metadata["alternates"]> {
  const en = enPath ?? `/en${frPath === "/" ? "" : frPath}`
  const locale = (await getLocale()) as Locale
  return {
    canonical: locale === "en" ? en : frPath,
    languages: {
      "fr-FR": frPath,
      "en": en,
      "x-default": frPath,
    },
  }
}
