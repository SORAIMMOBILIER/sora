"use client"
import Link from "@/components/localized-link"
import Image from "next/image"
import type { MouseEvent } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  const t = useTranslations("Footer")
  const locale = useLocale()

  const SECTIONS = [
    { href: "/", label: t("navAccueil") },
    { href: "/seseh", label: t("navSeseh") },
    { href: "/events", label: t("navEvenements") },
    { href: "/#fondateur", label: t("navFondateur"), anchorId: "fondateur" },
    { href: "/fonctionnement", label: t("navFonctionnement") },
    { href: "/masterclass", label: t("navReplay") },
    { href: "/contact", label: t("navAppelOffert") },
    { href: "/seseh#dossier", label: t("navDossier") },
  ]

  const CONTACT = [
    { href: "/contact", label: t("contactRdv") },
    { href: "tel:+33633517746", label: "+33 6 33 51 77 46" },
    { href: "mailto:contact@sora-immobilier.com", label: "contact@sora-immobilier.com" },
    { href: "https://www.instagram.com/gabriel_lapierre_/", label: "Instagram" },
    { href: "https://linkedin.com/in/gabriel-lapierre", label: "LinkedIn" },
    { href: "https://www.youtube.com/@GABRIEL_LAPIERRE", label: "YouTube" },
    { href: "https://wa.me/message/U6SAMFGVWDQDO1", label: "WhatsApp" },
  ]

  const scrollTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goToHomeAnchor = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const homePath = locale === "en" ? "/en" : "/"
    const href = `${homePath}#${id}`
    if (window.location.pathname !== homePath) {
      window.location.assign(href)
      return
    }

    window.history.pushState(null, "", href)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <footer className="bg-primary min-h-screen px-8 md:px-16 pt-16 md:pt-20 pb-8 md:pb-10 flex flex-col">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="SORA Immobilier" className="block">
          <Image src="/sora-logo.svg" alt="SORA" width={705} height={159} className="no-outline block h-16 md:h-24 w-auto" />
        </Link>
        <Button asChild variant="inverse">
          <Link href="/contact">
            {t("contactUs")}
          </Link>
        </Button>
      </div>

      <Separator className="mt-10 md:mt-14 bg-background/15" />

      {/* Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 py-16 md:py-24">
        <div>
          <p className="text-[12px] tracking-[0.25em] uppercase text-background font-semibold mb-12">{t("navigationTitle")}</p>
          <ul className="space-y-7 text-background/65">
            {SECTIONS.map((s) => (
              <li key={s.label}>
                <Link href={s.href} onClick={s.anchorId ? goToHomeAnchor(s.anchorId) : undefined} className="text-lg hover:text-background transition-colors duration-300">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[12px] tracking-[0.25em] uppercase text-background font-semibold mb-12">{t("contactTitle")}</p>
          <ul className="space-y-7 text-background/65">
            {CONTACT.map((c) => (
              <li key={c.label}>
                {c.href.startsWith("/") ? (
                  <Link href={c.href} className="text-lg hover:text-background transition-colors duration-300">{c.label}</Link>
                ) : (
                  <a href={c.href} className="text-lg hover:text-background transition-colors duration-300">{c.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:text-right">
          <p className="text-[12px] tracking-[0.25em] uppercase text-background font-semibold mb-12">{t("locationTitle")}</p>
          <div className="space-y-12 text-background/65">
            <div>
              <p className="tertiary text-background/55 mb-3">{t("officeLabel")}</p>
              <p className="text-lg leading-relaxed">
                {t("address")}<br />
                {t("coordinates")}
              </p>
            </div>
            <div>
              <p className="text-[12px] tracking-[0.25em] uppercase text-background font-semibold mb-3">{t("availabilityTitle")}</p>
              <p className="text-lg leading-relaxed">
                {t("availability")}<br />
                {t("availabilityHours")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-background/15" />

      {/* Bottom row */}
      <div className="pt-8 md:pt-10 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        <button
          onClick={scrollTop}
          className="text-[11px] tracking-[0.22em] uppercase font-semibold text-background hover:text-accent transition-colors duration-300 justify-self-start"
        >
          {t("backToTop")}
        </button>
        <Link href="/mentions-legales" className="hidden md:block metadata text-background/55 justify-self-end text-right hover:text-background transition-colors duration-300">
          {t("legal")}
        </Link>
      </div>
    </footer>
  )
}
