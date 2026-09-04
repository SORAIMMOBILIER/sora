"use client"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"

// Pas de [locale] dans les routes : on calcule juste l'URL /en/... (ou son
// retrait) à partir du chemin actuel. Le middleware pose le cookie de
// langue en lisant ce même préfixe — voir middleware.ts.
//
// <a> volontairement, PAS <Link> : le changement de langue dépend d'un
// cookie relu par le serveur (middleware + i18n/request.ts). La
// navigation "douce" de <Link> réutilise le rendu déjà en cache côté
// client et ne redéclenche pas ce cycle serveur — le contenu restait
// dans l'ancienne langue malgré l'URL qui changeait. Un vrai lien force
// un rechargement complet, donc un aller-retour serveur à chaque fois.
export default function LanguageSwitch({ className = "" }: { className?: string }) {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("LanguageSwitch")

  const isEnglish = locale === "en"
  const withoutPrefix = pathname.startsWith("/en") ? pathname.slice(3) || "/" : pathname
  const targetHref = isEnglish ? withoutPrefix : `/en${withoutPrefix === "/" ? "" : withoutPrefix}`

  return (
    <a
      href={targetHref}
      aria-label={isEnglish ? t("switchToFr") : t("switchToEn")}
      className={`inline-flex items-center gap-1 text-[11px] tracking-[0.15em] font-semibold ${className}`}
    >
      <span className={isEnglish ? "opacity-45" : "opacity-100"}>{t("fr")}</span>
      <span className="opacity-45">/</span>
      <span className={isEnglish ? "opacity-100" : "opacity-45"}>{t("en")}</span>
    </a>
  )
}
