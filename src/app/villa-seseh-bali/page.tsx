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
import { PriceTagIcon, ShieldIcon } from "@/components/landing/villa-seseh-bali/icons"
import ModelBlock from "@/components/landing/shared/model-block"
import StatRow from "@/components/landing/shared/stat-row"
import Timeline from "@/components/landing/shared/timeline"
import DistanceList from "@/components/landing/shared/distance-list"
import TeamBlock from "@/components/landing/shared/team-block"
import Disclosure from "@/components/landing/shared/disclosure"
import TestimonialsBlock from "@/components/landing/shared/testimonials-block"
import { UI_STRINGS } from "@/components/landing/shared/ui-strings"
import frContent from "../../../content/villa-seseh-bali/fr"
import enContent from "../../../content/villa-seseh-bali/en"
import type { VillaSesehBaliContent } from "../../../content/villa-seseh-bali/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sora-immobilier.com"
const PAGE_NAME = "villa-seseh-bali"

function getContent(locale: string): VillaSesehBaliContent | null {
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif font-medium leading-[1.05] text-foreground"
      style={{ fontSize: "clamp(26px,4vw,42px)" }}
    >
      {children}
    </h2>
  )
}

export default async function VillaSesehBaliPage() {
  const locale = await getLocale()
  const content = getContent(locale)
  if (!content) notFound()

  const otherHref = locale === "en" ? "/villa-seseh-bali" : "/en/villa-seseh-bali"
  const otherLabel = locale === "en" ? "FR" : content.nav.switchLabel
  const showLanguageSwitch = locale === "en" ? true : enContent !== null
  const ANCHOR_ID = locale === "en" ? "eligibility" : "eligibilite"
  const NUMBERS_ID = locale === "en" ? "numbers" : "chiffres"
  const GUARANTEES_ID = locale === "en" ? "guarantees" : "garanties"
  const EMBED_SOURCE = locale === "en" ? "LP-B-EN" : "LP-B"
  const ui = UI_STRINGS[locale === "en" ? "en" : "fr"]

  return (
    <main className="bg-background pb-24 md:pb-0">
      <link rel="preconnect" href="https://connect.facebook.net" />
      <ScrollDepthTracker page={PAGE_NAME} />

      {/* Header minimal : logo non cliquable, pas de nav */}
      <header className="px-6 md:px-10 py-6 flex items-center justify-between">
        <Image src="/sora-logo.svg" alt="SORA" width={705} height={159} className="h-6 w-auto" />
        {showLanguageSwitch && <LanguageSwitch href={otherHref} label={otherLabel} />}
      </header>

      {/* 1. Hero */}
      <section className="px-6 md:px-10 pt-6 md:pt-10">
        <div className="max-w-5xl mx-auto text-center mb-8">
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

        <div className="max-w-4xl mx-auto relative aspect-[3/4] md:aspect-[16/8] rounded-sm overflow-hidden bg-secondary/40">
          <HeroMedia
            videoUrl={content.hero.videoUrl}
            posterImage={content.hero.posterImage}
            posterAlt={content.hero.title}
            page={PAGE_NAME}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center mt-10">
          <CtaLink section="hero" label={content.hero.ctaLabel} anchor={`#${ANCHOR_ID}`} page={PAGE_NAME} />
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

      {/* 2. L'étape suivante */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center">
          <Overline>{content.section2.overline}</Overline>
          <SectionTitle>{content.section2.title}</SectionTitle>
          <div className="mt-7 space-y-3 text-foreground/75 text-base leading-relaxed">
            {content.section2.screenLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {content.section2.blocks.map((block) => (
            <div key={block.title} className="border border-border rounded-sm p-7 bg-card">
              {block.icon === "price" ? (
                <PriceTagIcon className="w-7 h-7 text-accent mb-5" />
              ) : (
                <ShieldIcon className="w-7 h-7 text-accent mb-5" />
              )}
              <p className="font-serif font-medium text-foreground text-lg mb-2">{block.title}</p>
              <p className="text-foreground/65 text-sm leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto text-center mt-8">
          <p className="text-foreground/60 text-sm">{content.section2.screenClosingLine}</p>
          <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
            <p className="italic">{content.section2.eligibilityNote}</p>
            {content.section2.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>{content.section2.closingParagraph}</p>
          </Disclosure>
        </div>
      </section>

      {/* 3. Nos chiffres */}
      <section id={NUMBERS_ID} className="px-6 md:px-10 py-16 md:py-24 bg-card">
        <div className="max-w-xl mx-auto text-center mb-10">
          <Overline>{content.section3.overline}</Overline>
          <SectionTitle>{content.section3.title}</SectionTitle>
        </div>
        <StatRow stats={content.section3.stats} />
        <div className="max-w-xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {content.section3.resaleCartouches.map((c) => (
            <div key={c} className="border border-border rounded-sm px-5 py-4 text-foreground/75 text-sm bg-background">
              {c}
            </div>
          ))}
        </div>
        <div className="max-w-xl mx-auto">
          <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
            {content.section3.facts.map((f, i) => (
              <p key={i}>{f}</p>
            ))}
          </Disclosure>
        </div>
      </section>

      {/* 4. Témoignages (jamais masqué) */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <TestimonialsBlock
          overline={<Overline>{content.section4.overline}</Overline>}
          title={<SectionTitle>{content.section4.title}</SectionTitle>}
          testimonials={content.section4.testimonials}
          ctaLabel={content.section4.ctaLabel}
          anchor={`#${ANCHOR_ID}`}
          page={PAGE_NAME}
          pendingLabel={ui.testimonialPending}
        />
      </section>

      {/* 5 & 6. Villas + 7. Encart hors Seseh */}
      <section className="px-6 md:px-10 py-16 md:py-24 bg-card">
        <div className="max-w-xl mx-auto text-center mb-14">
          <Overline>{content.section5.overline}</Overline>
          <SectionTitle>{content.section5.title}</SectionTitle>
        </div>

        <div className="space-y-20">
          {content.section5.gammes.map((model) => (
            <ModelBlock
              key={model.name}
              name={model.name}
              badge={model.badge}
              specLine={model.specLine}
              gallery={model.gallery}
              planImage={model.planImage}
              planAlt={model.planAlt}
              priceLabel={model.priceLabel}
              priceNote={model.priceNote}
              stats={model.stats}
              features={model.features}
              ctaLabel={content.section5.ctaLabel}
              anchor={`#${ANCHOR_ID}`}
              page={PAGE_NAME}
              sectionKey={`villa-${model.name.toLowerCase()}`}
              pendingLabel={ui.imagePending}
            />
          ))}
        </div>

        <div className="max-w-xl mx-auto mt-14">
          <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
            <p>{content.section5.priceIncludesText}</p>
            <p>{content.section5.previsionnelText}</p>
          </Disclosure>
        </div>

        <div className="max-w-xl mx-auto mt-16 border border-accent/30 rounded-sm bg-accent/10 p-8 text-center">
          <Overline>{content.section5.offSeseh.overline}</Overline>
          <p className="font-serif font-medium text-foreground text-xl mb-3">{content.section5.offSeseh.title}</p>
          <p className="text-foreground/70 text-sm leading-relaxed">{content.section5.offSeseh.text}</p>
        </div>
      </section>

      {/* 8. Le prix */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center">
          <Overline>{content.section6.overline}</Overline>
          <SectionTitle>{content.section6.title}</SectionTitle>
          <div className="mt-7 space-y-3 text-foreground/75 text-base leading-relaxed">
            {content.section6.screenLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="mt-6 flex gap-6 justify-center text-sm">
            {content.section6.links.map((link) => (
              <a key={link.anchor} href={link.anchor} className="underline underline-offset-4 text-foreground/60 hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
            {content.section6.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Disclosure>
        </div>
      </section>

      {/* 9. La gestion */}
      <section className="px-6 md:px-10 py-16 md:py-24 bg-card">
        <div className="max-w-xl mx-auto text-center">
          <Overline>{content.section7.overline}</Overline>
          <SectionTitle>{content.section7.title}</SectionTitle>
          <ul className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            {content.section7.neverList.map((item) => (
              <li key={item} className="px-4 py-2 rounded-full border border-border text-foreground/60 line-through">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-foreground/75 text-base">{content.section7.screenLine}</p>
          <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
            <p>{content.section7.paragraph}</p>
          </Disclosure>
        </div>
      </section>

      {/* 10. Les garanties */}
      <section id={GUARANTEES_ID} className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center mb-12">
          <Overline>{content.section8.overline}</Overline>
          <SectionTitle>{content.section8.title}</SectionTitle>
        </div>
        <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {content.section8.guarantees.map((g) => (
            <div key={g.title} className="border border-border rounded-sm px-5 py-4 bg-card">
              <p className="font-serif font-medium text-foreground text-sm mb-1">{g.title}</p>
              <p className="text-foreground/65 text-sm leading-relaxed">{g.short}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <CtaLink section="garanties" label={content.section8.ctaLabel} anchor={`#${ANCHOR_ID}`} page={PAGE_NAME} />
        </div>
        <div className="max-w-xl mx-auto">
          <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
            {content.section8.guarantees.map((g, i) => (
              <p key={i}>
                <strong className="text-foreground">{g.title}</strong> {g.body}
              </p>
            ))}
          </Disclosure>
        </div>
      </section>

      {/* 11. Paiement */}
      <section className="px-6 md:px-10 py-16 md:py-24 bg-card">
        <div className="max-w-xl mx-auto text-center mb-12">
          <Overline>{content.paiement.overline}</Overline>
          <SectionTitle>{content.paiement.title}</SectionTitle>
        </div>
        <Timeline steps={content.paiement.steps} />
        <div className="max-w-xl mx-auto">
          <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
            <p>{content.paiement.detail.intro}</p>
            {content.paiement.detail.steps.map((step, i) => (
              <p key={i}>
                <strong className="text-foreground">{step.title}</strong> {step.body}
              </p>
            ))}
          </Disclosure>
        </div>
      </section>

      {/* 12. L'équipe */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center mb-10">
          <Overline>{content.team.overline}</Overline>
        </div>
        <TeamBlock
          photoSrc={content.team.photo}
          photoAlt={content.team.name}
          quote={content.team.quote}
          name={content.team.name}
          role={content.team.role}
          pendingLabel={ui.imagePending}
        />
        <div className="mt-10">
          <StatRow stats={content.team.stats} />
        </div>
        <p className="text-foreground/75 text-base text-center mt-8 max-w-xl mx-auto">{content.team.screenLine}</p>
        <div className="max-w-xl mx-auto">
          <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
            {content.team.detail.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="font-serif font-medium text-foreground text-base pt-2">{content.team.detail.engagementsIntro}</p>
            <ul className="space-y-2">
              {content.team.detail.engagements.map((e, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-accent mt-0.5">·</span>
                  {e}
                </li>
              ))}
            </ul>
          </Disclosure>
        </div>
      </section>

      {/* 13. Le lieu */}
      <section className="px-6 md:px-10 py-16 md:py-24 bg-card">
        <div className="max-w-xl mx-auto text-center mb-12">
          <Overline>{content.lieu.overline}</Overline>
          <SectionTitle>{content.lieu.title}</SectionTitle>
        </div>
        <DistanceList entries={content.lieu.entries} pendingLabel={ui.imagePending} />
      </section>

      {/* 14. Bali en 2027 */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center">
          <Overline>{content.section11.overline}</Overline>
          <SectionTitle>{content.section11.title}</SectionTitle>
          <div className="mt-7 space-y-3 text-foreground/75 text-base leading-relaxed">
            {content.section11.screenLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="mt-8">
            <CtaLink section="marche" label={content.section11.ctaLabel} anchor={`#${ANCHOR_ID}`} page={PAGE_NAME} />
          </div>
          <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
            {content.section11.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="text-foreground/45 text-xs pt-2">
              Sources : {content.section11.sources.map((s) => s.label).join(" · ")}
            </p>
          </Disclosure>
        </div>
      </section>

      {/* 15. Éligibilité */}
      <section id={ANCHOR_ID} className="px-6 md:px-10 py-16 md:py-24 bg-card">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <Overline>{content.section12.overline}</Overline>
          <SectionTitle>{content.section12.title}</SectionTitle>
        </div>
        <div className="max-w-2xl mx-auto">
          <EntretienEmbed embedCode={content.section12.embedCode} source={EMBED_SOURCE} />
        </div>
      </section>

      {/* 16. FAQ */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Overline>{content.section10.overline}</Overline>
          <SectionTitle>{content.section10.title}</SectionTitle>
        </div>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible>
            {content.section10.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-serif text-foreground text-base">{item.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/65 text-sm leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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

      <StickyMobileCta label={content.stickyBar.ctaLabel} anchorId={ANCHOR_ID} page={PAGE_NAME} />
    </main>
  )
}
