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

function localize(href: Props["href"], locale: string): Props["href"] {
  if (locale !== "en") return href
  if (typeof href !== "string") return href // objets Url complexes : non concernés ici
  if (href.startsWith("/en")) return href // déjà préfixé
  if (!href.startsWith("/")) return href // externe, ancre pure #xxx, mailto:, tel:
  return `/en${href}`
}

export default function Link({ href, ...props }: Props) {
  const locale = useLocale()
  return <NextLink href={localize(href, locale)} {...props} />
}
