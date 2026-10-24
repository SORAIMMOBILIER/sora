import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"
import StatRow, { type Stat } from "./stat-row"
import SwipeGallery, { type GalleryImage } from "./swipe-gallery"
import MediaSlot from "./media-slot"

// Bloc modèle réutilisé pour chaque gamme (Signature/Exception,
// Élégance/Prestige...) : galerie à glisser, plan, prix en gros avec le
// prix de l'année suivante en dessous, trois chiffres clés, quatre
// caractéristiques, bouton. Prend ses données d'un objet par modèle.
export default function ModelBlock({
  name,
  badge,
  specLine,
  gallery,
  planImage,
  planAlt,
  priceLabel,
  priceNote,
  stats,
  features,
  ctaLabel,
  anchor,
  page,
  sectionKey,
  pendingLabel,
}: {
  name: string
  badge?: string
  specLine: string
  gallery: GalleryImage[]
  planImage?: string
  planAlt: string
  priceLabel: string
  priceNote: string
  stats: Stat[]
  features: string[]
  ctaLabel: string
  anchor: string
  page: string
  sectionKey: string
  pendingLabel: string
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        {badge && <p className="metadata text-accent mb-3">{badge}</p>}
        <p className="font-serif font-medium text-foreground text-3xl mb-2">{name}</p>
        <p className="text-foreground/55 text-sm">{specLine}</p>
      </div>

      <SwipeGallery images={gallery} pendingLabel={pendingLabel} />

      <div className="relative aspect-[4/3] md:aspect-video rounded-sm overflow-hidden bg-secondary/40 mt-6">
        <MediaSlot src={planImage} alt={planAlt} label={pendingLabel} sizes="(max-width:768px) 100vw, 768px" />
      </div>

      <div className="text-center mt-10">
        <p className="font-serif font-medium text-foreground text-2xl md:text-3xl">{priceLabel}</p>
        <p className="text-foreground/50 text-sm mt-1.5">{priceNote}</p>
      </div>

      <div className="mt-10">
        <StatRow stats={stats} />
      </div>

      <ul className="mt-10 space-y-2.5 text-foreground/70 text-sm max-w-xs mx-auto">
        {features.map((f) => (
          <li key={f} className="flex gap-3">
            <span className="text-accent mt-0.5">·</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="text-center mt-10">
        <CtaLink section={sectionKey} label={ctaLabel} anchor={anchor} page={page} />
      </div>
    </div>
  )
}
