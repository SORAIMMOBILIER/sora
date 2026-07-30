import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { sanityFetch } from "../../../../sanity/lib/fetch"
import { WEBINAR_RECURRING_QUERY } from "../../../../sanity/lib/queries"
import { urlForImage } from "../../../../sanity/lib/image"
import { Button } from "@/components/ui/button"
import TestimonialsGrid from "@/components/sections/temoignages/testimonials-grid"
import {
  GAMMES,
  GARANTIES,
  CONFIANCE_PARTENAIRES,
  CALENDLY_URL,
  WHATSAPP_URL,
} from "@/components/sections/webinar/webinar-content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Replay du webinaire | Seseh Sunset Villas — SORA Immobilier",
  description: "Revoir le webinaire sur le projet Seseh Sunset Villas à Bali, et réserver un appel avec l'équipe Sora.",
}

type WebinarContent = {
  title?: string
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

export default async function ReplayPage() {
  const content = await sanityFetch<WebinarContent | null>({ query: WEBINAR_RECURRING_QUERY, tags: ["webinarRecurring"] })

  const heroImageUrl = content?.mainImage?.asset
    ? urlForImage(content.mainImage).width(2400).url()
    : "/seseh/exception/exterior.webp"

  return (
    <main className="bg-bg">
      {/* 1-2. Hero compact + vidéo */}
      <section
        className="relative px-6 pt-[72px] pb-4 md:pt-28 md:pb-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-center p-6 md:p-8">
          <Link href="/" aria-label="SORA Immobilier">
            <Image src="/sora-logo.svg" alt="SORA Immobilier" width={705} height={159} className="h-[34px] md:h-10 w-auto" />
          </Link>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

        <div className="relative container-page max-w-3xl mx-auto text-center">
          <h1
            className="font-serif font-medium text-bg leading-[1.05] mb-4"
            style={{ fontSize: "clamp(22px,4.5vw,44px)" }}
          >
            {content?.title || "Seseh Sunset Villas"}
          </h1>
          <p className="eyebrow-dark mx-auto mb-3 md:mb-4">Replay du webinaire</p>
          <div className="text-bg/80 text-sm leading-relaxed max-w-xl mx-auto mb-3 md:mb-5 space-y-2">
            <p>26 villas d&apos;exception dans l&apos;une des dernières zones encore préservées de l&apos;île, avec des rendements locatifs parmi les plus attractifs du marché.</p>
            <p>Un projet clé en main, entièrement géré à distance de l&apos;acquisition jusqu&apos;à la revente. La façon la plus simple de diversifier votre patrimoine hors zone euro.</p>
          </div>

          <div
            className="mx-auto rounded-sm overflow-hidden bg-ink shadow-2xl aspect-video w-[min(78vw,calc(16vh*16/9))] md:w-[min(100%,calc(24vh*16/9))]"
          >
            <iframe
              src="https://www.youtube.com/embed/02qIyCZ7_FM?modestbranding=1&rel=0&iv_load_policy=3"
              title="Replay du webinaire SORA x Lybox — Seseh Sunset Villas"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0 block"
            />
          </div>
        </div>
      </section>

      <article className="container-page px-6 pt-2 md:pt-8">
        {/* 3. Continuez maintenant — définir / échanger / whatsapp */}
        <div className="space-y-3 md:space-y-6 mb-20 md:mb-28">
          <div id="definir-projet" className="bg-bg-soft border border-line rounded-sm p-4 md:p-10 scroll-mt-28">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <span className="w-6 h-6 rounded-full bg-accent text-bg flex items-center justify-center text-[11px] font-bold shrink-0">1</span>
              <h3 className="font-serif text-xl md:text-2xl text-ink">Définissez votre projet d&apos;investissement</h3>
            </div>
            <p className="text-ink/70 text-sm leading-relaxed max-w-xl mb-3 md:mb-6">
              En quelques minutes, précisez ce que vous recherchez (villa, budget, objectifs). Nous vous préparons une projection personnalisée adaptée à votre profil.
            </p>
            <a
              href="https://form.typeform.com/to/m5hp2paw"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary font-serif font-semibold"
            >
              Définir mon projet
            </a>
          </div>

          <div id="echanger" className="bg-bg-soft border border-line rounded-sm p-4 md:p-10 scroll-mt-28">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <span className="w-6 h-6 rounded-full bg-accent text-bg flex items-center justify-center text-[11px] font-bold shrink-0">2</span>
              <h3 className="font-serif text-xl md:text-2xl text-ink">Échangeons de vive voix</h3>
            </div>
            <p className="text-ink/70 text-sm leading-relaxed max-w-xl mb-3 md:mb-6">
              Vous préférez poser vos questions directement ? Réservez un créneau avec l&apos;équipe SORA. On fait le point sur votre projet, le programme Seseh Sunset Villas et les modalités d&apos;investissement.
            </p>
            <div className="bg-bg rounded-sm overflow-hidden -mx-4 md:-mx-10">
              <iframe
                src={CALENDLY_URL}
                title="Réserver un appel avec l'équipe SORA"
                loading="lazy"
                className="w-full h-[660px] md:h-[720px] border-0 block"
              />
            </div>
          </div>

          <div id="whatsapp" className="bg-bg-soft border border-line rounded-sm p-4 md:p-10 scroll-mt-28">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <span className="w-6 h-6 rounded-full bg-accent text-bg flex items-center justify-center text-[11px] font-bold shrink-0">3</span>
              <h3 className="font-serif text-xl md:text-2xl text-ink">Une question rapide ?</h3>
            </div>
            <p className="text-ink/70 text-sm leading-relaxed max-w-xl mb-3 md:mb-6">
              Écrivez-nous directement sur WhatsApp, on vous répond dans la journée.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-[#25D366] text-white border-transparent hover:bg-[#1ebe5a] hover:text-white hover:border-transparent"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Discuter sur WhatsApp
              </a>
            </Button>
          </div>
        </div>

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
            26 villas clé en main à 300 m de la plage de Seseh, Bali. À partir de 149 000 €. Livraison prévue en mars 2028.
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

        {/* 6. Prochaine étape */}
        <section className="mb-20 md:mb-28">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow text-ink-muted mb-6">Prochaine étape</p>
            <h2 className="font-serif font-medium text-ink leading-[1.05]" style={{ fontSize: "clamp(28px,3.5vw,48px)" }}>
              Continuez votre projet.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="#definir-projet" className="border border-line rounded-sm p-6 hover:border-accent transition-colors">
              <p className="font-serif text-lg text-ink mb-2">Définir mon projet d&apos;investissement</p>
              <p className="text-ink/60 text-sm">Précisez votre projet en quelques minutes</p>
            </a>
            <a href="#echanger" className="border border-line rounded-sm p-6 hover:border-accent transition-colors">
              <p className="font-serif text-lg text-ink mb-2">Échanger de vive voix</p>
              <p className="text-ink/60 text-sm">Réserver un créneau avec l&apos;équipe Sora</p>
            </a>
            <a href="#whatsapp" className="border border-line rounded-sm p-6 hover:border-accent transition-colors">
              <p className="font-serif text-lg text-ink mb-2">Poser vos questions</p>
              <p className="text-ink/60 text-sm">Discuter directement sur WhatsApp</p>
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

        {/* 8. Continuez maintenant — définir / échanger / whatsapp (rappel de fin de page) */}
        <div className="space-y-3 md:space-y-6">
          <div className="bg-bg-soft border border-line rounded-sm p-4 md:p-10">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <span className="w-6 h-6 rounded-full bg-accent text-bg flex items-center justify-center text-[11px] font-bold shrink-0">1</span>
              <h3 className="font-serif text-xl md:text-2xl text-ink">Définissez votre projet d&apos;investissement</h3>
            </div>
            <p className="text-ink/70 text-sm leading-relaxed max-w-xl mb-3 md:mb-6">
              En quelques minutes, précisez ce que vous recherchez (villa, budget, objectifs). Nous vous préparons une projection personnalisée adaptée à votre profil.
            </p>
            <a
              href="https://form.typeform.com/to/m5hp2paw"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary font-serif font-semibold"
            >
              Définir mon projet
            </a>
          </div>

          <div className="bg-bg-soft border border-line rounded-sm p-4 md:p-10">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <span className="w-6 h-6 rounded-full bg-accent text-bg flex items-center justify-center text-[11px] font-bold shrink-0">2</span>
              <h3 className="font-serif text-xl md:text-2xl text-ink">Échangeons de vive voix</h3>
            </div>
            <p className="text-ink/70 text-sm leading-relaxed max-w-xl mb-3 md:mb-6">
              Vous préférez poser vos questions directement ? Réservez un créneau avec l&apos;équipe SORA. On fait le point sur votre projet, le programme Seseh Sunset Villas et les modalités d&apos;investissement.
            </p>
            <div className="bg-bg rounded-sm overflow-hidden -mx-4 md:-mx-10">
              <iframe
                src={CALENDLY_URL}
                title="Réserver un appel avec l'équipe SORA"
                loading="lazy"
                className="w-full h-[660px] md:h-[720px] border-0 block"
              />
            </div>
          </div>

          <div className="bg-bg-soft border border-line rounded-sm p-4 md:p-10">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <span className="w-6 h-6 rounded-full bg-accent text-bg flex items-center justify-center text-[11px] font-bold shrink-0">3</span>
              <h3 className="font-serif text-xl md:text-2xl text-ink">Une question rapide ?</h3>
            </div>
            <p className="text-ink/70 text-sm leading-relaxed max-w-xl mb-3 md:mb-6">
              Écrivez-nous directement sur WhatsApp, on vous répond dans la journée.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-[#25D366] text-white border-transparent hover:bg-[#1ebe5a] hover:text-white hover:border-transparent"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Discuter sur WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </article>

      <TestimonialsGrid eyebrow="Ils nous ont fait confiance" title="Ce que disent nos investisseurs." />

      {/* Bouton WhatsApp flottant */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter sur WhatsApp"
        className="group fixed bottom-[18px] right-[18px] md:bottom-7 md:right-7 z-50 flex items-center bg-[#25D366] text-white rounded-full shadow-lg p-3.5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      >
        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.004 2c-5.514 0-9.997 4.483-9.997 9.997 0 1.763.462 3.486 1.34 5.004L2 22l5.117-1.343a9.96 9.96 0 0 0 4.887 1.244h.005c5.514 0 9.997-4.483 9.997-9.997C21.998 6.483 17.518 2 12.004 2zm0 18.166h-.004a8.16 8.16 0 0 1-4.158-1.14l-.298-.177-3.036.796.81-2.96-.194-.304a8.147 8.147 0 0 1-1.253-4.384c0-4.508 3.669-8.176 8.177-8.176 2.184 0 4.238.851 5.783 2.397a8.13 8.13 0 0 1 2.394 5.785c0 4.508-3.67 8.163-8.221 8.163z" />
        </svg>
        <span className="max-w-0 group-hover:max-w-[160px] group-hover:ml-2.5 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300">
          Une question ?
        </span>
      </a>
    </main>
  )
}
