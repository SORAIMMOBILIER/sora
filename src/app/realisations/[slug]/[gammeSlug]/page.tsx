import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "../../../../../sanity/lib/fetch"
import { GAMME_BY_SLUG_QUERY, GAMME_SLUGS_QUERY } from "../../../../../sanity/lib/queries"
import { urlForImage } from "../../../../../sanity/lib/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/layout/footer"
import VillaExplorer, { type GalleryImage } from "@/components/villa/villa-explorer"
import { loadVillaPlan } from "@/lib/villa-plans"

const ROOM_LABELS: Record<string, string> = {
  living: "Salon",
  kitchen: "Cuisine",
  terrace: "Terrasse",
  dining: "Salle à manger",
  office: "Bureau",
  toilet: "Toilettes",
  bedroom1: "Chambre 1",
  bedroom2: "Chambre 2",
  bedroom3: "Chambre 3",
  bath1: "Salle de bain 1",
  bath2: "Salle de bain 2",
  bath3: "Salle de bain 3",
}

type SanityImage = { asset?: { _ref: string }; alt?: string; room?: string }

type GammeDetail = {
  realisationSlug: string
  realisationTitle: string
  realisationLocation?: string
  status?: string
  gamme?: {
    name?: string
    slug?: string
    price?: string
    surface?: string
    bedrooms?: string
    bathrooms?: string
    revenue?: string
    yield?: string
    pool?: string
    image?: SanityImage
    description?: string
    planKey?: string
    roomsRdc?: string[]
    roomsEtage?: string[]
    features?: string[]
    gallery?: SanityImage[]
    vrUrl?: string
    preReserveUrl?: string
  }
}

type SlugPair = {
  realisationSlug: string
  gammes?: Array<{ slug: string }>
}

export async function generateStaticParams() {
  const pairs = await sanityFetch<SlugPair[]>({ query: GAMME_SLUGS_QUERY })
  return pairs.flatMap((p) =>
    (p.gammes || []).map((g) => ({ slug: p.realisationSlug, gammeSlug: g.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; gammeSlug: string }>
}): Promise<Metadata> {
  const { slug, gammeSlug } = await params
  const data = await sanityFetch<GammeDetail | null>({
    query: GAMME_BY_SLUG_QUERY,
    params: { realisationSlug: slug, gammeSlug },
  })
  if (!data?.gamme) return {}
  const g = data.gamme
  return {
    title: `${g.name} — ${data.realisationTitle} | SORA Immobilier`,
    description: g.description,
  }
}

export default async function GammePage({
  params,
}: {
  params: Promise<{ slug: string; gammeSlug: string }>
}) {
  const { slug, gammeSlug } = await params
  const data = await sanityFetch<GammeDetail | null>({
    query: GAMME_BY_SLUG_QUERY,
    params: { realisationSlug: slug, gammeSlug },
    tags: [`realisation:${slug}`, `gamme:${gammeSlug}`],
  })
  if (!data?.gamme) notFound()

  const g = data.gamme
  const planKey = g.planKey || gammeSlug
  const [svgRdc, svgEtage] = await Promise.all([
    loadVillaPlan(planKey, "rdc"),
    loadVillaPlan(planKey, "etage"),
  ])

  const stats = [
    g.surface && { icon: "square", value: g.surface, label: "Surface" },
    g.bedrooms && { icon: "bed", value: g.bedrooms, label: "Chambre" },
    g.bathrooms && { icon: "bath", value: g.bathrooms, label: "Salle de bain" },
    g.price && { icon: "euro", value: g.price, label: "À partir de" },
  ].filter(Boolean) as { icon: string; value: string; label: string }[]

  const galleryImages = (g.gallery || []).filter((img) => img?.asset)
  const galleryClient: GalleryImage[] = galleryImages.map((img) => ({
    url: urlForImage(img).width(1200).url(),
    alt: img.alt || "",
    room: img.room,
  }))
  const hasFeatures = !!g.features && g.features.length > 0

  return (
    <main>
      <div className="bg-background pt-24 md:pt-32 pb-24 md:pb-36 px-6">
      <div className="container-page">
        <Link
          href={`/realisations/${slug}`}
          className="inline-flex items-center gap-2 metadata text-foreground/55 hover:text-accent transition-colors"
        >
          ← Retour à {data.realisationTitle}
        </Link>

        {/* Header + VR */}
        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="flex flex-col gap-6">
            <p className="eyebrow">Gamme · {data.realisationLocation}</p>
            <h1
              className="font-serif font-medium text-foreground leading-[0.95]"
              style={{ fontSize: "clamp(44px,6vw,96px)" }}
            >
              {g.name}
            </h1>
          </div>
          {g.vrUrl && (
            <Button asChild variant="default" size="lg">
              <a href={g.vrUrl} target="_blank" rel="noopener noreferrer">
                Visite virtuelle 360°
              </a>
            </Button>
          )}
        </div>

        {g.description && (
          <p className="mt-6 max-w-3xl text-foreground/70 leading-relaxed text-lg">{g.description}</p>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden border border-border">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-6 md:p-8">
                <p className="font-serif font-medium text-foreground text-3xl md:text-4xl">{s.value}</p>
                <p className="metadata text-foreground/50 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Plan interactif + image de la pièce sélectionnée */}
        <div className="mt-16 md:mt-24">
          <VillaExplorer
            svgRdc={svgRdc}
            svgEtage={svgEtage}
            gallery={galleryClient}
            gammeName={g.name || "Villa"}
          />
        </div>

        {/* Prestations */}
        {hasFeatures && (
          <div className="mt-24 md:mt-36 bg-card border border-border rounded-sm p-8 md:p-10 max-w-3xl">
            <p className="eyebrow mb-6">Prestations incluses</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {g.features!.map((f) => (
                <li key={f} className="flex gap-3 text-foreground/75 text-sm leading-relaxed">
                  <span className="text-accent mt-0.5">·</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {g.preReserveUrl && (
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-secondary rounded-sm p-8 md:p-10">
            <div>
              <p className="eyebrow mb-3">Étape suivante</p>
              <p className="font-serif text-foreground text-2xl md:text-3xl leading-tight">
                Pré-réservez {g.name} en quelques minutes.
              </p>
            </div>
            <Button asChild variant="default" size="lg">
              <a href={g.preReserveUrl} target="_blank" rel="noopener noreferrer">
                Pré-réserver
              </a>
            </Button>
          </div>
        )}

        {/* Galerie complète */}
        {galleryImages.length > 0 && (
          <section className="mt-24 md:mt-36">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div className="flex flex-col gap-4">
                <p className="eyebrow">Galerie</p>
                <h2 className="font-serif font-medium text-foreground text-3xl md:text-5xl leading-tight">
                  Espaces de vie.
                </h2>
              </div>
              <Badge variant="outline" className="text-foreground border-foreground/25 hidden md:inline-flex">
                {galleryImages.length} visuels
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-card">
                  <Image
                    src={urlForImage(img).width(1200).url()}
                    alt={img.alt || `${g.name} — visuel ${i + 1}`}
                    fill
                    quality={92}
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {img.room && (
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-primary text-background border-transparent">
                        {ROOM_LABELS[img.room] || img.room}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      </div>

      <Footer />
    </main>
  )
}
