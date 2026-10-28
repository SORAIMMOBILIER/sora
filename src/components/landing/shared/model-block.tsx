import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"
import StatRow, { type Stat } from "./stat-row"
import SwipeGallery, { type GalleryImage } from "./swipe-gallery"
import MediaSlot from "./media-slot"
import FloorPlanPair from "./floor-plan-pair"
import { LabelValueTable, Overline } from "./primitives"
import { GRAY } from "./tokens"

export default function ModelBlock({
  name,
  overline,
  specLine,
  gallery,
  planImage,
  planRdc,
  planEtage,
  planRdcLabel,
  planEtageLabel,
  planNote,
  planAlt,
  priceLabel,
  priceNote,
  stats,
  rows,
  ctaLabel,
  anchor,
  page,
  sectionKey,
  pendingLabel,
  pendingPlanLabel,
  swipeLabel,
}: {
  name: string
  overline: string
  specLine: string
  gallery: GalleryImage[]
  planImage?: string
  planRdc?: string
  planEtage?: string
  planRdcLabel?: string
  planEtageLabel?: string
  planNote?: string
  planAlt: string
  priceLabel: string
  priceNote: string
  stats: Stat[]
  rows: { label: string; value: string }[]
  ctaLabel: string
  anchor: string
  page: string
  sectionKey: string
  pendingLabel: string
  pendingPlanLabel: string
  swipeLabel: string
}) {
  // Grammaire tasvanlombok, deux colonnes sur ordinateur : la version avec
  // plans RDC+étage (français, cette révision). Sans ces champs (anglais,
  // pas encore mis à jour), on garde l'ancienne mise en page une colonne —
  // voir le repli équivalent dans content/maison-seseh-bali/types.ts.
  const useTwoColLayout = Boolean(planRdc || planEtage)

  const priceTile = (
    <div className="bg-foreground p-6 w-full md:w-auto md:inline-block">
      <p className="font-sans font-light text-white text-[28px]">{priceLabel}</p>
      <p className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-white/70 mt-2">{priceNote}</p>
    </div>
  )

  return (
    <div id={sectionKey} className="max-w-[1060px]">
      <Overline>{overline}</Overline>
      <p className="font-sans font-light text-foreground leading-[1.1] text-[32px] md:text-[44px] mb-2">{name}</p>
      <p className="font-sans text-[14px] mb-8" style={{ color: GRAY }}>
        {specLine}
      </p>

      {useTwoColLayout ? (
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <SwipeGallery images={gallery} pendingLabel={pendingLabel} swipeLabel={swipeLabel} />
            <div className="mt-8">
              <FloorPlanPair
                rdc={planRdc}
                etage={planEtage}
                rdcLabel={planRdcLabel || "Rez-de-chaussée"}
                etageLabel={planEtageLabel || "Étage"}
                alt={planAlt}
                pendingLabel={pendingPlanLabel}
                note={planNote || ""}
              />
            </div>
          </div>
          <div className="md:col-span-6 mt-8 md:mt-0">
            {priceTile}
            <div className="mt-8">
              <StatRow stats={stats} />
            </div>
            <div className="mt-8">
              <LabelValueTable rows={rows} />
            </div>
            <div className="mt-8">
              <CtaLink section={sectionKey} label={ctaLabel} anchor={anchor} page={page} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <SwipeGallery images={gallery} pendingLabel={pendingLabel} swipeLabel={swipeLabel} />

          <div className="relative w-full max-h-[480px] aspect-[16/10] mt-8 border border-border bg-white">
            <MediaSlot src={planImage} alt={planAlt} label={pendingPlanLabel} fit="contain" sizes="(max-width:1060px) 100vw, 1060px" />
          </div>

          <div className="mt-8">{priceTile}</div>

          <div className="mt-8">
            <StatRow stats={stats} />
          </div>

          <div className="mt-8">
            <LabelValueTable rows={rows} />
          </div>

          <div className="mt-8">
            <CtaLink section={sectionKey} label={ctaLabel} anchor={anchor} page={page} />
          </div>
        </>
      )}
    </div>
  )
}
