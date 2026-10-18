import type { Metadata } from "next"

// Construit le bloc "alternates.languages" (balises hreflang) d'une page.
// Le français reste sur son URL actuelle (frPath) ; l'anglais est servi
// via le préfixe /en/... (voir next.config.ts), sauf cas particulier
// (ex : /fondateurs vs /en/founders) passé explicitement en enPath.
// "x-default" pointe vers le français : c'est la version "par défaut"
// historique et la plus indexée du site.
export function hreflangAlternates(frPath: string, enPath?: string): Metadata["alternates"] {
  const en = enPath ?? `/en${frPath === "/" ? "" : frPath}`
  return {
    languages: {
      "fr-FR": frPath,
      "en": en,
      "x-default": frPath,
    },
  }
}
