import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"
import VillaGallery, { type GalleryImage } from "./villa-gallery"
import PlanFrame from "./plan-frame"
import RoiCells from "./roi-cells"
import SpecsList from "./specs-list"
import { DISPLAY, C } from "./tokens"

export type Stat = { value: string; label: string }
export type Row = { label: string; value: string }

// `.villa` : grille 1.25fr / 1fr. Gauche : galerie + plan. Droite : nom +
// spec, deux tuiles prix sombres, trois cellules de chiffres, tableau de
// spécifications (libellé encre / valeur grise — inverse de notre ancien
// tableau), bouton plein pleine largeur.
export default function VillaBlock({
  name,
  spec,
  gallery,
  planRdc,
  planEtage,
  planRdcLabel,
  planEtageLabel,
  planNote,
  planAlt,
  priceAmount,
  priceLabel,
  stats,
  rows,
  ctaLabel,
  anchor,
  page,
  sectionKey,
  pendingLabel,
  swipeLabel,
  roiNote,
}: {
  name: string
  spec: string
  gallery: GalleryImage[]
  planRdc?: string
  planEtage?: string
  planRdcLabel: string
  planEtageLabel: string
  planNote: string
  planAlt: string
  priceAmount: string
  priceLabel: string
  stats: Stat[]
  rows: Row[]
  ctaLabel: string
  anchor: string
  page: string
  sectionKey: string
  pendingLabel: string
  swipeLabel: string
  roiNote: string
}) {
  return (
    <div id={sectionKey} className="villa-block-grid grid items-start">
      {/* Mobile : texte (nom, descriptif, prix, chiffres clés, détails,
          note de rendement) d'abord, puis galerie + plans, puis le bouton
          tout en bas (demande explicite). Ordinateur inchangé (1.25fr/1fr,
          galerie/plans à gauche sur toute la hauteur) — grid-template-areas
          nommées, indépendant de l'ordre du DOM. Row-gap à 0 sur ordinateur
          + marge fixe (mt-7) reconstituée sur le bouton pour ne rien changer
          à l'espacement d'origine entre la note de rendement et le bouton. */}
      <style>{`
        .villa-block-grid {
          grid-template-columns: 1fr;
          grid-template-areas: "infoTop" "media" "cta";
          row-gap: clamp(28px,5vw,64px);
        }
        @media (min-width: 768px) {
          .villa-block-grid {
            grid-template-columns: 1.25fr 1fr;
            grid-template-areas: "media infoTop" "media cta";
            column-gap: clamp(28px,5vw,64px);
            row-gap: 0;
          }
        }
      `}</style>

      <div style={{ gridArea: "infoTop" }}>
        <div className="mb-6">
          <h3 className="text-[clamp(34px,4.4vw,50px)] font-light leading-[1.08] tracking-[-.01em]" style={{ fontFamily: DISPLAY, color: C.ink }}>
            {name}
          </h3>
          <p className="text-[14.5px] mt-2" style={{ color: C.muted }}>
            {spec}
          </p>
        </div>

        <div className="rounded-[18px] px-[22px] pt-[22px] pb-[20px] inline-block" style={{ background: C.card, color: C.cardInk }}>
          <p className="text-[clamp(30px,3.4vw,40px)] leading-none font-light" style={{ fontFamily: DISPLAY }}>
            {priceAmount}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[.16em] mt-3" style={{ color: C.cardMuted }}>
            {priceLabel}
          </p>
        </div>

        <div className="mt-3">
          <RoiCells stats={stats} />
        </div>

        <SpecsList rows={rows} />

        <p className="text-[12.5px] mt-5 leading-[1.5]" style={{ color: C.muted }}>
          {roiNote}
        </p>
      </div>

      <div style={{ gridArea: "media" }} className="grid gap-[14px] min-w-0">
        <VillaGallery images={gallery} pendingLabel={pendingLabel} swipeLabel={swipeLabel} />
        <PlanFrame rdc={planRdc} etage={planEtage} rdcLabel={planRdcLabel} etageLabel={planEtageLabel} alt={planAlt} pendingLabel={pendingLabel} note={planNote} />
      </div>

      <div style={{ gridArea: "cta" }} className="md:mt-7">
        <CtaLink
          section={sectionKey}
          label={ctaLabel}
          anchor={anchor}
          page={page}
          className="!w-full !rounded-none !bg-[#1f1f1e] !border !border-[#1f1f1e] !text-[12.5px] !tracking-[.18em] hover:!bg-transparent hover:!text-[#1f1f1e]"
        />
      </div>
    </div>
  )
}
