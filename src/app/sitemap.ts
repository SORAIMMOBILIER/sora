import type { MetadataRoute } from "next"
import { sanityFetch } from "../../sanity/lib/fetch"
import {
  SITEMAP_EVENTS_QUERY,
  SITEMAP_GAMMES_QUERY,
  SITEMAP_POSTS_QUERY,
  SITEMAP_REALISATIONS_QUERY,
} from "../../sanity/lib/queries"

export const revalidate = 3600

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>

type StaticRoute = {
  path: string
  changeFrequency: ChangeFrequency
  priority: number
}

type CmsRoute = {
  slug?: string
  updatedAt?: string
}

type GammeGroup = {
  realisationSlug?: string
  updatedAt?: string
  gammes?: Array<{ slug?: string }>
}

// Même adresse canonique que layout.tsx / robots.ts / structured-data.ts
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.sora-immobilier.com")

const staticRoutes: StaticRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/fondateurs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/fonctionnement", changeFrequency: "monthly", priority: 0.8 },
  { path: "/partenaires", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/events", changeFrequency: "weekly", priority: 0.7 },
  { path: "/masterclass", changeFrequency: "monthly", priority: 0.6 },
  { path: "/villas-ssv", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  // "/event/lybox" retiré : cette adresse n'a jamais correspondu à une
  // vraie page du site (404), Google tombait dessus pour rien.
]

function toUrl(path: string) {
  return new URL(path, siteUrl).toString()
}

// Même mapping FR -> EN que src/lib/hreflang.ts et src/components/localized-link.tsx
// (un seul cas particulier aujourd'hui : /fondateurs -> /en/founders).
const EN_PATH_OVERRIDES: Record<string, string> = {
  "/fondateurs": "/en/founders",
}

function toEnUrl(path: string) {
  return toUrl(EN_PATH_OVERRIDES[path] ?? `/en${path === "/" ? "" : path}`)
}

// Ajoute, pour chaque adresse du sitemap, ses versions FR/EN "sœurs" —
// c'est ce qui permet à Google de découvrir les pages /en/... via le
// sitemap, en plus des balises hreflang déjà présentes sur chaque page.
function withLanguageAlternates<T extends { url: string }>(entry: T, path: string): T {
  return {
    ...entry,
    alternates: { languages: { "fr-FR": toUrl(path), "en": toEnUrl(path) } },
  }
}

function cleanSlug(slug?: string) {
  return slug?.replace(/^\/+|\/+$/g, "")
}

function toDate(date?: string) {
  return date ? new Date(date) : new Date()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, events, realisations, gammeGroups] = await Promise.all([
    sanityFetch<CmsRoute[]>({ query: SITEMAP_POSTS_QUERY, tags: ["post"] }),
    sanityFetch<CmsRoute[]>({ query: SITEMAP_EVENTS_QUERY, tags: ["event"] }),
    sanityFetch<CmsRoute[]>({ query: SITEMAP_REALISATIONS_QUERY, tags: ["realisation"] }),
    sanityFetch<GammeGroup[]>({ query: SITEMAP_GAMMES_QUERY, tags: ["realisation"] }),
  ])

  return [
    ...staticRoutes.map((route) =>
      withLanguageAlternates(
        {
          url: toUrl(route.path),
          lastModified: new Date(),
          changeFrequency: route.changeFrequency,
          priority: route.priority,
        },
        route.path,
      ),
    ),
    ...posts.flatMap((post) => {
      const slug = cleanSlug(post.slug)
      if (!slug) return []
      const path = `/blog/${slug}`

      return withLanguageAlternates(
        {
          url: toUrl(path),
          lastModified: toDate(post.updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
        path,
      )
    }),
    ...events.flatMap((event) => {
      const slug = cleanSlug(event.slug)
      if (!slug) return []
      const path = `/events/${slug}`

      return withLanguageAlternates(
        {
          url: toUrl(path),
          lastModified: toDate(event.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        },
        path,
      )
    }),
    ...realisations.flatMap((realisation) => {
      const slug = cleanSlug(realisation.slug)
      if (!slug) return []
      const path = `/realisations/${slug}`

      return withLanguageAlternates(
        {
          url: toUrl(path),
          lastModified: toDate(realisation.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.9,
        },
        path,
      )
    }),
    ...gammeGroups.flatMap((group) => {
      const realisationSlug = cleanSlug(group.realisationSlug)
      if (!realisationSlug) return []

      return (group.gammes || []).flatMap((gamme) => {
        const gammeSlug = cleanSlug(gamme.slug)
        if (!gammeSlug) return []
        const path = `/realisations/${realisationSlug}/${gammeSlug}`

        return withLanguageAlternates(
          {
            url: toUrl(path),
            lastModified: toDate(group.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.75,
          },
          path,
        )
      })
    }),
  ]
}
