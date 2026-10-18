"use client"
import NextLink from "next/link"
import { useLocale } from "next-intl"
import type { ComponentProps } from "react"

// Remplace next/link partout dans l'app : garde la langue courante quand
// on navigue d'une page à l'autre (sans ça, chaque lien interne ramenait
// systématiquement vers la version française, même depuis /en/...).
// Composant client ("use client") mais utilisable tel quel depuis un
// Server Component parent — Next.js le sert normalement au premier
// rendu, useLocale() lit le contexte déjà posé par NextIntlClientProvider
// dans le layout racine.
type Props = ComponentProps<typeof NextLink>

// Quelques pages ont, volontairement, une adresse anglaise différente du
// simple préfixe /en/... (ex : /fondateurs -> /en/founders, un mot anglais
// plus naturel pour le référencement anglophone que "/en/fondateurs").
// Voir la même table dans next.config.ts (rewrites) pour le mapping inverse.
const SLUG_OVERRIDES: Record<string, string> = {
  "/fondateurs": "/en/founders",
}

function localize(href: Props["href"], locale: string): Props["href"] {
  if (locale !== "en") return href
  if (typeof href !== "string") return href // objets Url complexes : non concernés ici
  if (href.startsWith("/en")) return href // déjà préfixé
  if (!href.startsWith("/")) return href // externe, ancre pure #xxx, mailto:, tel:
  if (href in SLUG_OVERRIDES) return SLUG_OVERRIDES[href]
  return `/en${href}`
}

export default function Link({ href, ...props }: Props) {
  const locale = useLocale()
  return <NextLink href={localize(href, locale)} {...props} />
}
