import type { Metadata } from "next"
import Image from "next/image"
import { MapPin, Home, Key, Scale, ShieldCheck, MessageCircle, Compass, Briefcase, FileCheck2, Mic } from "lucide-react"
import { sanityFetch } from "../../../sanity/lib/fetch"
import { WEBINAR_RECURRING_QUERY } from "../../../sanity/lib/queries"
import { urlForImage } from "../../../sanity/lib/image"
import { webinarLabel } from "../../../lib/webinar"
import WebinarForm from "@/components/sections/webinar/webinar-form"
import TestimonialsGrid from "@/components/sections/temoignages/testimonials-grid"
import { GAMMES, GARANTIES, CONFIANCE_PARTENAIRES, CREDIBILITE } from "@/components/sections/webinar/webinar-content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Webinaire live | Investir à Bali — Seseh Sunset Villas",
  description: "Webinaire gratuit en direct : découvrez le projet Seseh Sunset Villas à Bali, 26 villas clé en main à 300 m de la plage.",
}

type WebinarContent = {
  title?: string
  eyebrow?: string
  summary?: string
  mainImage?: { asset?: { _ref: string }; alt?: string }
  villasDisponibles?: number
}

const DEFAULT_TITLE = "Investir dans l'immobilier à Bali — le projet Seseh Sunset Villas"
const DEFAULT_SUMMARY =
  "Découvrez comment investir dans une villa à Bali avec un rendement net projeté jusqu'à 13,8%. Présentation du projet Seseh Sunset Villas avec Gabriel Lapierre, fondateur de Sora Immobilier."

const DECOUVERTE = [
  { icon: MapPin, text: "Le marché immobilier à Bali et pourquoi la zone de Seseh" },
  { icon: Home, text: "Le projet Seseh Sunset Villas : 26 villas clé en main à 300 m de la plage" },
  { icon: Key, text: "Le fonctionnement clé en main : construction, mobilier, gestion locative déléguée" },
  { icon: Scale, text: "Le cadre légal et fiscal d'un achat à Bali (leasehold 30+30 ans, société locale type PT PMA)" },
  { icon: ShieldCheck, text: "Les garanties et la sécurisation du projet" },
  { icon: MessageCircle, text: "Session questions/réponses en direct" },
]

const PROFILS = [
  { icon: Compass, text: "Vous découvrez l'investissement immobilier à Bali et voulez comprendre comment ça marche" },
  { icon: Briefcase, text: "Vous cherchez un actif clé en main à l'étranger sans gérer la construction ni la location" },
  { icon: FileCheck2, text: "Vous voulez un cadre légal et fiscal clair avant de vous lancer" },
  { icon: Mic, text: "Vous préférez poser vos questions en direct plutôt que lire une brochure" },
]

const FAQ = [
  { q: "C'est vraiment gratuit ?", a: "Oui, l'inscription et la participation au webinaire sont entièrement gratuites." },
  { q: "Combien de temps dure le webinaire ?", a: "Environ 50 minutes, suivies d'une session de questions/réponses." },
  { q: "Je reçois un replay si je ne peux pas être présent ?", a: "Oui, le replay est envoyé automatiquement à toutes les personnes inscrites." },
  { q: "Faut-il déjà avoir un budget défini ?", a: "Non, ce webinaire est aussi fait pour comprendre le fonctionnement avant de se projeter." },
  { q: "Ça se passe où ?", a: "En ligne, le lien de connexion est envoyé par email après l'inscription." },
]

export default async function WebinairePage() {
  const content = await sanityFetch<WebinarContent | null>({ query: WEBINAR_RECURRING_QUERY, tags: ["webinarRecurring"] })
  const label = webinarLabel()

  const heroImageUrl = content?.mainImage?.asset
    ? urlForImage(content.mainImage).width(1800).url()
    : "/seseh-vue-aerienne.jpg"

  return (
    <main className="bg-bg pt-32 md:pt-44 pb-24 px-6">
      <article className="container-page">
        {/* 1. Hero + bloc date/urgence */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start mb-14">
          <div className="md:col-span-7">
            <p className="eyebrow text-ink-muted mb-6">{content?.eyebrow || "Webinaire live gratuit"}</p>
            <h1 className="font-serif font-medium text-ink leading-[1.0] mb-8" style={{ fontSize: "clamp(38px,5vw,72px)" }}>
              {content?.title || DEFAULT_TITLE}
            </h1>
            <p className="text-lg text-ink/75 leading-relaxed max-w-2xl mb-8">
              {content?.summary || DEFAULT_SUMMARY}
            </p>
            <div className="inline-flex flex-col gap-1 bg-primary rounded-sm px-6 py-4 mb-6">
              <span className="metadata text-background/60">Prochaine session</span>
              <span className="text-background text-lg capitalize">{label} <span className="text-background/60 text-sm">(heure de Paris)</span></span>
            </div>
            {typeof content?.villasDisponibles === "number" && (
              <p className="text-accent font-medium">
                Plus que {content.villasDisponibles} villas disponibles sur 26
              </p>
            )}
          </div>

          <aside className="md:col-span-5 bg-bg-soft border border-line rounded-sm p-6 md:p-8">
            <WebinarForm />
          </aside>
        </header>

        <div className="relative w-full h-[320px] md:h-[480px] rounded-sm overflow-hidden mb-20 md:mb-28 bg-bg-mid">
          <Image
            src={heroImageUrl}
            alt={content?.mainImage?.alt || content?.title || "Seseh Sunset Villas"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/45 via-transparent to-transparent" />
        </div>

        {/* 3. Ce que vous allez découvrir */}
        <section className="mb-20 md:mb-28">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow text-ink-muted mb-6">Programme</p>
            <h2 className="font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
              Ce que vous allez découvrir.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {DECOUVERTE.map((item) => (
              <div key={item.text} className="flex gap-4">
                <item.icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <p className="text-ink/80 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Le projet Seseh Sunset Villas */}
        <section className="bg-bg-soft border border-line rounded-sm p-8 md:p-12 mb-20 md:mb-28">
          <p className="eyebrow text-ink-muted mb-6">Le projet</p>
          <h2 className="font-serif font-medium text-ink leading-[1.05] mb-6" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
            Seseh Sunset Villas.
          </h2>
          <p className="text-ink/75 leading-relaxed max-w-2xl mb-8">
            26 villas au sein d&apos;une communauté privée gérée par Sora (parties communes, sécurité), à 300 m de la plage de Seseh, Bali. Construction en une seule tranche, pour une livraison uniforme du projet en mars 2028 et une mise en location immédiate, sans nuisances de chantier. Mobilier et équipement inclus, gestion locative déléguée.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {GAMMES.map((g) => (
              <div key={g.name} className="bg-bg border border-line rounded-sm p-5">
                <p className="font-serif text-xl text-ink mb-1">{g.name}</p>
                <p className="text-accent font-medium mb-3">{g.price}</p>
                <p className="text-ink/60 text-sm">{g.surface} · {g.chambres}</p>
                <p className="text-ink/60 text-sm">{g.equipement}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. À qui s'adresse ce webinaire */}
        <section className="mb-20 md:mb-28">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow text-ink-muted mb-6">Pour qui</p>
            <h2 className="font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
              À qui s&apos;adresse ce webinaire.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {PROFILS.map((p) => (
              <div key={p.text} className="flex gap-4 bg-bg-soft border border-line rounded-sm p-6">
                <p.icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <p className="text-ink/80 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Qui anime */}
        <section className="mb-20 md:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-primary rounded-sm p-8 md:p-12">
            <div className="md:col-span-4 relative h-80 md:h-full min-h-[260px] rounded-sm overflow-hidden">
              <Image src="/gabriel-lapierre.webp" alt="Gabriel Lapierre" fill className="object-cover object-top" sizes="(max-width:768px) 100vw, 33vw" />
            </div>
            <div className="md:col-span-8">
              <p className="tertiary text-background/60 mb-3">Qui anime</p>
              <h3 className="font-serif text-3xl text-background mb-4">Gabriel Lapierre</h3>
              <div className="space-y-3 text-background/85 leading-relaxed mb-6 max-w-xl">
                <p>
                  Ingénieur de formation (Arts et Métiers), fondateur de Sora, installé à Bali depuis 2023 — présent sur place pour les visites de chantier, pas derrière un écran.
                </p>
                <p className="text-background/70 text-sm">
                  Entouré d&apos;un écosystème d&apos;experts locaux (notaire, cabinet juridique, maître d&apos;œuvre, architecte d&apos;intérieur, gestionnaire) et d&apos;un réseau de clients construit sur plus de 15 ans.
                </p>
                <p className="text-background/70 text-sm">
                  Des villas déjà livrées et en exploitation, des closings réalisés sur place : un projet qui avance concrètement, pas une promesse sur plan.
                </p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-background/70 text-sm">
                <span>{CREDIBILITE.projets}</span>
                <span>·</span>
                <span>{CREDIBILITE.villas}</span>
                <span>·</span>
                <span>{CREDIBILITE.investisseurs}</span>
              </div>
            </div>
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

        {/* 9. CTA final */}
        <section id="inscription" className="bg-bg-soft border border-line rounded-sm p-8 md:p-12 text-center">
          <p className="text-ink capitalize mb-6">Prochaine session : {label}</p>
          <h2 className="font-serif font-medium text-ink leading-[1.05] mb-8" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
            Je réserve ma place.
          </h2>
          <div className="max-w-md mx-auto text-left">
            <WebinarForm showHeading={false} />
          </div>
        </section>
      </article>

      <div className="-mx-6 mt-20 md:mt-28">
        <TestimonialsGrid eyebrow="Ils nous ont fait confiance" title="Ce que disent nos investisseurs." />
      </div>

      <section className="container-page px-6 mt-20 md:mt-28">
        <div className="bg-primary rounded-sm p-8 md:p-16">
          <div className="text-center mb-10">
            <p className="text-background/60 capitalize mb-6">Prochaine session : {label}</p>
            <h2 className="font-serif font-medium text-background leading-[1.05]" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
              Vous aussi, venez découvrir le projet Seseh Sunset Villas et poser vos questions en direct.
            </h2>
          </div>
          <div className="max-w-md mx-auto bg-bg-soft border border-line rounded-sm p-6 md:p-8 text-left">
            <WebinarForm showHeading={false} />
          </div>
        </div>
      </section>
    </main>
  )
}
