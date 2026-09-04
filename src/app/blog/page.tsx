import Link from "@/components/localized-link"
import Image from "next/image"
import { getTranslations, getLocale } from "next-intl/server"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { ALL_POSTS_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import { translateToEnglish } from "@/lib/translate"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | SORA Immobilier",
  description: "Analyses, retours d'expérience et données réelles du marché immobilier balinais.",
}

type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
  publishedAt: string
  author?: { name: string }
  categories?: Array<{ title: string; slug: string }>
}

export default async function BlogIndexPage() {
  const t = await getTranslations("Blog")
  const locale = await getLocale()
  const posts = await sanityFetch<Post[]>({ query: ALL_POSTS_QUERY, tags: ["post"] })

  const translatedText =
    locale === "en" && posts.length > 0
      ? await translateToEnglish(
          posts.map((p) => ({ id: p._id, title: p.title, excerpt: p.excerpt, categories: p.categories?.map((c) => c.title) })),
          "blog-index",
        )
      : null
  const textById = new Map((translatedText || []).map((p) => [p.id, p]))

  return (
    <main className="bg-bg min-h-screen pt-32 md:pt-44 pb-24 px-6 md:px-12">
      <div className="max-w-[1504px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="eyebrow text-ink-muted mb-6">{t("eyebrow")}</p>
          <h1 className="font-serif font-medium text-ink leading-[1.0]" style={{ fontSize: "clamp(40px,6vw,96px)" }}>
            {t("title")}
          </h1>
          <p className="text-ink/60 mt-8 leading-relaxed text-base max-w-xl mx-auto">
            {t("body")}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-ink/55 text-sm">
            {t("empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((p) => {
              const en = textById.get(p._id)
              const title = en?.title || p.title
              const excerpt = en?.excerpt || p.excerpt
              const categoryTitles = en?.categories || p.categories?.map((c) => c.title)
              return (
              <Link key={p._id} href={`/blog/${p.slug}`} className="group flex flex-col">
                {p.mainImage?.asset && (
                  <div className="relative aspect-[4/5] rounded-sm overflow-hidden mb-6">
                    <Image
                      src={urlForImage(p.mainImage).width(800).height(1000).url()}
                      alt={p.mainImage.alt || title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                    />
                  </div>
                )}
                {categoryTitles && categoryTitles.length > 0 && (
                  <p className="metadata text-ink/45 mb-3">
                    {categoryTitles.join(" / ")}
                  </p>
                )}
                <h2 className="font-serif text-2xl md:text-3xl text-ink group-hover:text-accent transition-colors duration-300 mb-3">
                  {title}
                </h2>
                {excerpt && <p className="text-ink/65 text-sm leading-relaxed mb-4">{excerpt}</p>}
                <p className="mt-auto metadata text-ink/40">
                  {new Date(p.publishedAt).toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  {p.author?.name ? ` / ${p.author.name}` : ""}
                </p>
              </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
