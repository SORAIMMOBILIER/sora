import { DISPLAY } from "./tokens"
import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"

// Bandeau noir, identique au fond du site principal (--color-primary,
// #262626), logo SORA en blanc. Bouton blanc plein (même traitement que
// les boutons du hero, sur fond sombre).
export default function TasvanHeader({ ctaLabel, anchor, page }: { ctaLabel: string; anchor: string; page: string }) {
  return (
    <header className="sticky top-0 z-40 relative overflow-hidden" style={{ background: "#262626" }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url(/pattern-fabric.webp)" }}
      />
      <div className="relative z-10 max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] h-[68px] flex items-center justify-between gap-4">
        <a href="#" className="flex items-center" style={{ fontFamily: DISPLAY }}>
          <span className="font-light text-[19px] uppercase tracking-[.42em] pt-[3px] text-white max-[520px]:text-[17px] max-[520px]:tracking-[.36em]">
            SORA
          </span>
        </a>
        <div className="max-[520px]:hidden">
          <CtaLink
            section="header"
            label={ctaLabel}
            anchor={anchor}
            page={page}
            className="!min-h-[48px] !h-auto !py-[11px] !px-[18px] !text-[11px] !font-medium !tracking-[.18em] !bg-white !border !border-white !text-[#1f1f1e] !rounded-none hover:!bg-transparent hover:!text-white"
          />
        </div>
      </div>
    </header>
  )
}
