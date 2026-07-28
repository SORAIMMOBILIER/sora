import type { Metadata } from "next"
import Link from "next/link"
import { PhoneCall } from "lucide-react"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { WEBINAR_RECURRING_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import { Button } from "@/components/ui/button"
import TestimonialsGrid from "@/components/sections/temoignages/testimonials-grid"
import {
  GAMMES,
  GARANTIES,
  CONFIANCE_PARTENAIRES,
  CALENDLY_URL,
  WHATSAPP_URL,
  DOSSIER_URL,
} from "@/components/sections/webinar/webinar-content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Replay du webinaire | Seseh Sunset Villas — SORA Immobilier",
  description: "Revoir le webinaire sur le projet Seseh Sunset Villas à Bali, et réserver un appel avec l'équipe Sora.",
}

type WebinarContent = {
  title?: string
  summary?: string
  replayUrl?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
  villasDisponibles?: number
}

const PROGRAMME = [
  "Le marché de Bali et la zone de Seseh",
  "Le projet Seseh Sunset Villas",
  "Le cadre légal et fiscal (leasehold, société locale)",
  "Garanties et sécurisation",
  "Questions des participants",
]

const FAQ = [
  { q: "Comment se passe un rendez-vous ?", a: "Un échange de 30 minutes avec l'équipe Sora pour faire le point sur votre projet et répondre à vos questions précises." },
  { q: "Suis-je engagé ?", a: "Non, le rendez-vous est un échange sans engagement de votre part." },
  { q: "Puis-je co-investir ?", a: "Oui, le co-investissement est possible dès 20 000 €. On en parle en détail au rendez-vous." },
]

export default async function ReplayPage() {
  const content = await sanityFetch<WebinarContent | null>({ query: WEBINAR_RECURRING_QUERY, tags: ["webinarRecurring"] })

  const heroImageUrl = content?.mainImage?.asset
    ? urlForImage(content.mainImage).width(2400).url()
    : "/seseh/exception/exterior.webp"

  return (
    <main className="bg-bg">
      {/* 1-2. Hero + lecteur vidéo */}
      <section
        className="relative px-6 pt-40 md:pt-48 pb-20 md:pb-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

        <div className="relative container-page max-w-4xl mx-auto text-center">
          <p className="eyebrow-dark mx-auto mb-6">Replay du webinaire</p>
          <h1
            className="font-serif font-medium text-bg leading-[1.02] mb-6"
            style={{ fontSize: "clamp(32px,4.5vw,64px)" }}
          >
            {content?.title || "Revoir le webinaire — Seseh Sunset Villas"}
          </h1>
          <p className="text-bg/80 leading-relaxed max-w-2xl mx-auto mb-10">
            {content?.summary || "Le projet Seseh Sunset Villas présenté en détail, questions des participants incluses."}
          </p>

          {content?.replayUrl ? (
            <div className="relative aspect-video w-full max-w-3xl mx-auto overflow-hidden rounded-sm bg-ink shadow-2xl">
              <video
                src={content.replayUrl}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ) : (
            <p className="text-bg/70">
              Le replay de la dernière session sera disponible ici prochainement.
            </p>
          )}
        </div>
      </section>

      <article className="container-page px-6 pt-16 md:pt-24">
        {/* 3. CTA principal */}
        <section className="bg-bg-soft border border-line rounded-sm p-8 md:p-12 text-center mb-20 md:mb-28">
          <p className="eyebrow text-ink-muted mx-auto mb-6">Aller plus loin</p>
          <h2 className="font-serif font-medium text-ink leading-[1.05] mb-10" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>
            Des questions sur le projet ? Réservez un appel.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <PhoneCall className="w-4 h-4" />
                Réserver un appel
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Échanger sur WhatsApp
              </a>
            </Button>
          </div>
        </section>

        {/* 4. Au programme du webinaire */}
        <section className="mb-20 md:mb-28 max-w-3xl">
          <p className="eyebrow text-ink-muted mb-6">Récap</p>
          <h2 className="font-serif font-medium text-ink leading-[1.05] mb-10" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
            Au programme du webinaire.
          </h2>
          <ul className="space-y-4">
            {PROGRAMME.map((item, i) => (
              <li key={item} className="flex gap-4">
                <span className="metadata text-accent w-8 shrink-0 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-ink/80 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Le projet en bref */}
        <section className="bg-bg-soft border border-line rounded-sm p-8 md:p-12 mb-20 md:mb-28">
          <p className="eyebrow text-ink-muted mb-6">Le projet en bref</p>
          <h2 className="font-serif font-medium text-ink leading-[1.05] mb-6" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
            Seseh Sunset Villas.
          </h2>
          <p className="text-ink/75 leading-relaxed max-w-2xl mb-10">
            26 villas clé en main à 300 m de la plage de Seseh, Bali. À partir de 149 000 €, co-investissement possible dès 20 000 €. Livraison prévue en mars 2028.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {GAMMES.map((g) => (
              <div key={g.name} className="bg-bg border border-line rounded-sm p-5">
                <p className="font-serif text-xl text-ink mb-1">{g.name}</p>
                <p className="text-accent font-medium">{g.price}</p>
              </div>
            ))}
          </div>
          {typeof content?.villasDisponibles === "number" && (
            <p className="text-accent font-medium mt-8">
              Plus que {content.villasDisponibles} villas disponibles sur 26
            </p>
          )}
        </section>

        {/* 6. Aller plus loin */}
        <section className="mb-20 md:mb-28">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow text-ink-muted mb-6">Prochaine étape</p>
            <h2 className="font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
              Continuez votre projet.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href={DOSSIER_URL} className="border border-line rounded-sm p-6 hover:border-accent transition-colors">
              <p className="font-serif text-lg text-ink mb-2">SSV — Le dossier d&apos;investissement</p>
              <p className="text-ink/60 text-sm">Recevoir le dossier complet par email</p>
            </Link>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="border border-line rounded-sm p-6 hover:border-accent transition-colors">
              <p className="font-serif text-lg text-ink mb-2">Réserver un appel</p>
              <p className="text-ink/60 text-sm">Échanger directement avec l&apos;équipe Sora</p>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="border border-line rounded-sm p-6 hover:border-accent transition-colors">
              <p className="font-serif text-lg text-ink mb-2">Rejoindre le groupe WhatsApp</p>
              <p className="text-ink/60 text-sm">Suivre l&apos;actualité du projet</p>
            </a>
          </div>
        </section>

        {/* 7. Bandeau confiance */}
        <section className="mb-20 md:mb-28">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow text-ink-muted mb-6">Sécurisation</p>
            <h2 className="font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
              Un cadre sécurisé.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {GARANTIES.map((g) => (
              <div key={g.label} className="border border-line rounded-sm p-6">
                <p className="font-serif text-3xl text-ink mb-2">{g.value}</p>
                <p className="text-ink font-medium mb-1">{g.label}</p>
                <p className="text-ink/60 text-sm">{g.description}</p>
              </div>
            ))}
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CONFIANCE_PARTENAIRES.map((p) => (
              <li key={p} className="text-ink/70 text-sm flex gap-2">
                <span className="text-accent">—</span> {p}
              </li>
            ))}
          </ul>
        </section>

        {/* 8. FAQ */}
        <section className="mb-20 md:mb-28 max-w-3xl">
          <p className="eyebrow text-ink-muted mb-6">FAQ</p>
          <h2 className="font-serif font-medium text-ink leading-[1.05] mb-10" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
            Questions fréquentes.
          </h2>
          <div className="divide-y divide-line border-t border-b border-line">
            {FAQ.map((item) => (
              <div key={item.q} className="py-6">
                <p className="font-serif text-lg text-ink mb-2">{item.q}</p>
                <p className="text-ink/65 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      <TestimonialsGrid eyebrow="Ils ont assisté" title="Ce que disent les participants." />
    </main>
  )
}
