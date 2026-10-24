import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"
import StatRow, { type Stat } from "./stat-row"
import SwipeGallery, { type GalleryImage } from "./swipe-gallery"
import MediaSlot from "./media-slot"
import { LabelValueTable, Overline } from "./primitives"
import { GRAY } from "./tokens"

export default function ModelBlock({
  name,
  overline,
  specLine,
  gallery,
  planImage,
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
  return (
    <div id={sectionKey} className="max-w-[1060px]">
      <Overline>{overline}</Overline>
      <p className="font-sans font-light text-foreground leading-[1.1] text-[32px] md:text-[44px] mb-2">{name}</p>
      <p className="font-sans text-[14px] mb-8" style={{ color: GRAY }}>
        {specLine}
      </p>

      <SwipeGallery images={gallery} pendingLabel={pendingLabel} swipeLabel={swipeLabel} />

      <div className="relative w-full max-h-[480px] aspect-[16/10] mt-8 border border-border bg-white">
        <MediaSlot src={planImage} alt={planAlt} label={pendingPlanLabel} fit="contain" sizes="(max-width:1060px) 100vw, 1060px" />
      </div>

      <div className="mt-8 bg-foreground p-6 w-full md:w-auto md:inline-block">
        <p className="font-sans font-light text-white text-[28px]">{priceLabel}</p>
        <p className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-white/70 mt-2">{priceNote}</p>
      </div>

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
  )
}
