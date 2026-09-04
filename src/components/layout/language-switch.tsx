"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"

// Pas de [locale] dans les routes : on calcule juste l'URL /en/... (ou son
// retrait) à partir du chemin actuel. Le middleware pose le cookie de
// langue en lisant ce même préfixe — voir middleware.ts.
export default function LanguageSwitch({ className = "" }: { className?: string }) {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("LanguageSwitch")

  const isEnglish = locale === "en"
  const withoutPrefix = pathname.startsWith("/en") ? pathname.slice(3) || "/" : pathname
  const targetHref = isEnglish ? withoutPrefix : `/en${withoutPrefix === "/" ? "" : withoutPrefix}`

  return (
    <Link
      href={targetHref}
      aria-label={isEnglish ? t("switchToFr") : t("switchToEn")}
      className={`inline-flex items-center gap-1 text-[11px] tracking-[0.15em] font-semibold ${className}`}
    >
      <span className={isEnglish ? "opacity-45" : "opacity-100"}>{t("fr")}</span>
      <span className="opacity-45">/</span>
      <span className={isEnglish ? "opacity-100" : "opacity-45"}>{t("en")}</span>
    </Link>
  )
}
