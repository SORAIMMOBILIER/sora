import Image from "next/image"
import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"
import LanguageSwitch from "@/components/landing/maison-seseh-bali/language-switch"

// Header fixe 68 px, fond blanc, filet dessous, visible au défilement.
// Logo non cliquable, bouton plein à droite.
export default function LpHeader({
  ctaLabel,
  anchor,
  page,
  showLanguageSwitch,
  otherHref,
  otherLabel,
}: {
  ctaLabel: string
  anchor: string
  page: string
  showLanguageSwitch: boolean
  otherHref: string
  otherLabel: string
}) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 h-[68px] bg-white border-b border-border">
      <div className="max-w-[1060px] mx-auto px-5 md:px-0 h-full flex items-center justify-between">
        <Image src="/sora-logo.svg" alt="SORA" width={705} height={159} className="h-5 w-auto" />
        <div className="flex items-center gap-5">
          {showLanguageSwitch && <LanguageSwitch href={otherHref} label={otherLabel} />}
          <CtaLink section="header" label={ctaLabel} anchor={anchor} page={page} className="!w-auto !h-11 !px-6" />
        </div>
      </div>
    </header>
  )
}
