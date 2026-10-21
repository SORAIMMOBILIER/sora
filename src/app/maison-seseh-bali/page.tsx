import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getLocale } from "next-intl/server"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import HeroMedia from "@/components/landing/maison-seseh-bali/hero-media"
import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"
import StickyMobileCta from "@/components/landing/maison-seseh-bali/sticky-mobile-cta"
import ScrollDepthTracker from "@/components/landing/maison-seseh-bali/scroll-depth-tracker"
import EntretienEmbed from "@/components/landing/maison-seseh-bali/entretien-embed"
import LanguageSwitch from "@/components/landing/maison-seseh-bali/language-switch"
import frContent from "../../../content/maison-seseh-bali/fr"
import enContent from "../../../content/maison-seseh-bali/en"
import type { MaisonSesehBaliContent } from "../../../content/maison-seseh-bali/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sora-immobilier.com"

function getContent(locale: string): MaisonSesehBaliContent | null {
  return locale === "en" ? enContent : frContent
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const content = getContent(locale)
  if (!content) notFound()

  const ogImage = new URL(content.hero.posterImage, SITE_URL).toString()

  return {
    title: content.meta.title,
    description: content.meta.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      images: [{ url: ogImage, width: 1200, height: 675 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: [ogImage],
    },
  }
}

function Overline({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mx-auto mb-5">{children}</p>
}

function SectionTitle({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2
      className={`font-serif font-medium leading-[1.05] ${dark ? "text-background" : "text-foreground"}`}
      style={{ fontSize: "clamp(28px,4vw,48px)" }}
    >
      {children}
    </h2>
  )
}

export default async function MaisonSesehBaliPage() {
  const locale = await getLocale()
  const content = getContent(locale)
  if (!content) notFound()

  const otherHref = locale === "en" ? "/maison-seseh-bali" : "/en/home-seseh-bali"
  const otherLabel = locale === "en" ? "FR" : content.nav.switchLabel
  // Lien discret affiché uniquement quand la version EN existe (côté FR :
  // conditionné à enContent ; côté EN, le fait d'être sur cette page prouve
  // déjà que le contenu existe).
  const showLanguageSwitch = locale === "en" ? true : enContent !== null
  // Ancre de la section "entretien" et tag source du formulaire GoHighLevel :
  // différents par langue (id="consultation"/"LP-A-EN" en anglais).
  const anchorId = locale === "en" ? "consultation" : "entretien"
  const embedSource = locale === "en" ? "LP-A-EN" : "LP-A"

  return (
    <main className="bg-background pb-24 md:pb-0">
      {/* Accélère la résolution DNS/TLS du pixel Meta (chargé par le layout
          racine, voir cookie-banner.tsx) pour qu'il ne retarde pas l'image
          du hero, prioritaire pour le LCP. */}
      <link rel="preconnect" href="https://connect.facebook.net" />
      <ScrollDepthTracker />

      {/* Header minimal : logo non cliquable, pas de nav */}
      <header className="px-6 md:px-10 py-6 flex items-center justify-between">
        <Image src="/sora-logo.svg" alt="SORA" width={705} height={159} className="h-6 w-auto" />
        {showLanguageSwitch && <LanguageSwitch href={otherHref} label={otherLabel} />}
      </header>

      {/* Section 1 — Hero */}
      <section className="px-6 md:px-10 pt-6 md:pt-10">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <p className="eyebrow mx-auto mb-6">{content.hero.overline}</p>
          <h1
            className="font-serif font-medium text-foreground leading-[1.05]"
            style={{ fontSize: "clamp(32px,5.5vw,64px)" }}
          >
            {content.hero.title}
          </h1>
          <p className="text-foreground/70 mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {content.hero.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative aspect-[4/3] md:aspect-video rounded-sm overflow-hidden bg-card">
          <HeroMedia
            videoUrl={content.hero.videoUrl}
            posterImage={content.hero.posterImage}
            posterAlt={content.hero.title}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center mt-10">
          <CtaLink section="hero" label={content.hero.ctaLabel} anchor={`#${anchorId}`} />
          <p className="text-foreground/50 text-sm mt-4">{content.hero.ctaNote}</p>
        </div>

        <div className="max-w-4xl mx-auto mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center pb-14 md:pb-20 border-b border-border">
          {content.hero.bandItems.map((item) => (
            <p key={item} className="metadata text-foreground/55">
              {item}
            </p>
          ))}
        </div>
      </section>

      {/* Section 2 — Le bon moment */}
      <section className="px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <Overline>{content.section2.overline}</Overline>
          <SectionTitle>{content.section2.title}</SectionTitle>
          <div className="mt-8 space-y-5 text-foreground/70 text-base leading-relaxed text-left">
            {content.section2.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — La maison */}
      <section className="px-6 md:px-10 py-20 md:py-28 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <Overline>{content.section3.overline}</Overline>
            <SectionTitle>{content.section3.title}</SectionTitle>
          </div>
          <div className="mt-8 space-y-5 text-foreground/70 text-base leading-relaxed max-w-2xl mx-auto">
            {content.section3.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Galerie — façades, terrasses, intérieurs uniquement (jamais de vue aérienne) */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {content.section3.images.map((img) => (
              <figure key={img.src} className="relative aspect-[4/3] rounded-sm overflow-hidden bg-background">
                <Image src={img.src} alt={img.alt} fill quality={90} className="object-cover" sizes="(max-width:768px) 50vw, 33vw" />
                <figcaption className="absolute bottom-2 right-3 text-background/80 text-[10px] tracking-wide uppercase" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
                  {content.footer.disclaimer}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Collection / tarifs */}
          <div className="mt-14">
            <p className="text-foreground/70 text-base leading-relaxed max-w-2xl mx-auto text-center mb-8">
              {content.section3.gammesIntro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {content.section3.gammes.map((gamme) => (
                <div key={gamme.name} className="border border-border rounded-sm p-8 bg-background">
                  <p className="font-serif font-medium text-foreground text-2xl mb-4">{gamme.name}</p>
                  <ul className="space-y-1.5 text-foreground/65 text-sm mb-6">
                    {gamme.specsLines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <p className="font-serif font-medium text-foreground text-lg">{gamme.priceBeforeLabel}</p>
                  <p className="text-foreground/50 text-sm mt-1">{gamme.priceAfterLabel}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-foreground/45 text-sm text-center mt-10 italic">{content.section3.confidentialNote}</p>

          <div className="text-center mt-10">
            <CtaLink section="maison" label={content.section3.ctaLabel} anchor={`#${anchorId}`} />
          </div>
        </div>
      </section>

      {/* Section 4 — Les revenus */}
      <section className="px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <Overline>{content.section4.overline}</Overline>
          <SectionTitle>{content.section4.title}</SectionTitle>
          <div className="mt-8 space-y-5 text-foreground/70 text-base leading-relaxed text-left">
            {content.section4.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — La transmission */}
      <section className="px-6 md:px-10 py-20 md:py-28 bg-card">
        <div className="max-w-2xl mx-auto text-center">
          <Overline>{content.section5.overline}</Overline>
          <SectionTitle>{content.section5.title}</SectionTitle>
          <div className="mt-8 space-y-5 text-foreground/70 text-base leading-relaxed text-left">
            {content.section5.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — La confiance */}
      <section className="px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <Overline>{content.section6.overline}</Overline>
          <SectionTitle>{content.section6.title}</SectionTitle>
          <div className="mt-8 space-y-5 text-foreground/70 text-base leading-relaxed text-left">
            {content.section6.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-10 text-left">
            <p className="font-serif font-medium text-foreground text-lg mb-4">{content.section6.engagementsIntro}</p>
            <ul className="space-y-3 text-foreground/70 text-sm leading-relaxed">
              {content.section6.engagements.map((e, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-accent mt-0.5">·</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7 — Témoignages (masquée si vide) */}
      {content.section7.testimonials.length > 0 && (
        <section className="px-6 md:px-10 py-20 md:py-28 bg-card">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <Overline>{content.section7.overline}</Overline>
              <SectionTitle>{content.section7.title}</SectionTitle>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.section7.testimonials.map((t, i) => (
                <div key={i} className="border border-border rounded-sm p-6 bg-background">
                  <p className="text-foreground/75 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <p className="font-serif text-foreground text-base">{t.firstName}</p>
                  <p className="text-foreground/50 text-xs mt-1">{t.situation} · {t.villa}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <CtaLink section="temoignages" label={content.section7.ctaLabel} anchor={`#${anchorId}`} />
            </div>
          </div>
        </section>
      )}

      {/* Section 8 — L'accès */}
      <section className="px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <Overline>{content.section8.overline}</Overline>
          <SectionTitle>{content.section8.title}</SectionTitle>
          <p className="text-foreground/70 mt-6 text-base leading-relaxed">{content.section8.intro}</p>
        </div>
        <div className="max-w-2xl mx-auto mt-12 space-y-8 text-left">
          {content.section8.steps.map((step, i) => (
            <div key={i} className="flex gap-5">
              <span className="metadata text-foreground/40 pt-1">0{i + 1}</span>
              <div>
                <p className="font-serif font-medium text-foreground text-lg mb-1.5">{step.title}</p>
                <p className="text-foreground/65 text-sm leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9 — FAQ (accordéon) */}
      <section className="px-6 md:px-10 py-20 md:py-28 bg-card">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Overline>{content.section9.overline}</Overline>
          <SectionTitle>{content.section9.title}</SectionTitle>
        </div>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible>
            {content.section9.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-serif text-foreground text-base">{item.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/65 text-sm leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Section 10 — Le marché */}
      <section className="px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <Overline>{content.section10.overline}</Overline>
          <SectionTitle>{content.section10.title}</SectionTitle>
          <div className="mt-8 space-y-5 text-foreground/70 text-base leading-relaxed text-left">
            {content.section10.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-10">
            <CtaLink section="marche" label={content.section10.ctaLabel} anchor={`#${anchorId}`} />
          </div>
          <p className="text-foreground/35 text-xs mt-10 leading-relaxed">
            Sources : {content.section10.sources.map((s) => s.label).join(" · ")}
          </p>
        </div>
      </section>

      {/* Section 11 — Entretien (ancre #entretien en FR, #consultation en EN) */}
      <section id={anchorId} className="px-6 md:px-10 py-20 md:py-28 bg-card">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <Overline>{content.section11.overline}</Overline>
          <SectionTitle>{content.section11.title}</SectionTitle>
        </div>
        <div className="max-w-2xl mx-auto">
          <EntretienEmbed embedCode={content.section11.embedCode} source={embedSource} />
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="px-6 md:px-10 py-10 border-t border-border">
        <div className="max-w-2xl mx-auto text-center text-foreground/45 text-xs space-y-2">
          <p>{content.footer.disclaimer}</p>
          <p>
            <a href="/mentions-legales" rel="nofollow" className="underline underline-offset-4 hover:text-foreground transition-colors">
              {content.footer.mentionsLegalesLabel}
            </a>
            {" · "}
            <a href={`mailto:${content.footer.contactEmail}`} className="underline underline-offset-4 hover:text-foreground transition-colors">
              {content.footer.contactEmail}
            </a>
          </p>
        </div>
      </footer>

      <StickyMobileCta label={content.stickyBar.ctaLabel} anchorId={anchorId} />
    </main>
  )
}
