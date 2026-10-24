import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLocale } from "next-intl/server"
import LpHeader from "@/components/landing/shared/lp-header"
import HeroCarousel from "@/components/landing/shared/hero-carousel"
import PriceLines from "@/components/landing/shared/price-lines"
import { Overline, BlockTitle, BodyText, RuleLines, LabelValueTable } from "@/components/landing/shared/primitives"
import ModelBlock from "@/components/landing/shared/model-block"
import StatRow from "@/components/landing/shared/stat-row"
import Timeline from "@/components/landing/shared/timeline"
import DistanceList from "@/components/landing/shared/distance-list"
import TeamBlock from "@/components/landing/shared/team-block"
import Disclosure from "@/components/landing/shared/disclosure"
import TestimonialsBlock from "@/components/landing/shared/testimonials-block"
import FaqAccordion from "@/components/landing/shared/faq-accordion"
import DarkTile from "@/components/landing/shared/dark-tile"
import { GRAY } from "@/components/landing/shared/tokens"
import { PriceTagIcon, ShieldIcon } from "@/components/landing/villa-seseh-bali/icons"
import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"
import StickyMobileCta from "@/components/landing/maison-seseh-bali/sticky-mobile-cta"
import ScrollDepthTracker from "@/components/landing/maison-seseh-bali/scroll-depth-tracker"
import EntretienEmbed from "@/components/landing/maison-seseh-bali/entretien-embed"
import frContent from "../../../content/villa-seseh-bali/fr"
import enContent from "../../../content/villa-seseh-bali/en"
import type { VillaSesehBaliContent } from "../../../content/villa-seseh-bali/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sora-immobilier.com"
const PAGE_NAME = "villa-seseh-bali"

const UI = {
  fr: { imagePending: "IMAGE EN ATTENTE", learnMore: "En savoir plus", learnLess: "Réduire", testimonialPending: "Témoignage en attente", sources: "Sources", swipe: (n: number) => `${n} PHOTOS · FAITES GLISSER` },
  en: { imagePending: "IMAGE PENDING", learnMore: "Learn more", learnLess: "Show less", testimonialPending: "Testimonial pending", sources: "Sources", swipe: (n: number) => `${n} PHOTOS · SWIPE` },
}

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
  const ui = UI[locale === "en" ? "en" : "fr"]

  return (
    <main className="bg-white">
      <link rel="preconnect" href="https://connect.facebook.net" />
      <ScrollDepthTracker page={PAGE_NAME} />

      <LpHeader
        ctaLabel={content.hero.ctaLabel}
        anchor={`#${ANCHOR_ID}`}
        page={PAGE_NAME}
        showLanguageSwitch={showLanguageSwitch}
        otherHref={otherHref}
        otherLabel={otherLabel}
      />

      <div className="pt-[68px]">
        {/* 1. Hero */}
        <HeroCarousel
          images={content.hero.heroImages}
          overline={content.hero.overline}
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          ctaLabel={content.hero.ctaLabel}
          anchor={`#${ANCHOR_ID}`}
          page={PAGE_NAME}
        />

        <div className="max-w-[1060px] mx-auto px-5 md:px-0">
          {/* Ligne de prix */}
          <section className="pt-20 md:pt-[120px]">
            <PriceLines
              items={content.section5.gammes.map((m) => ({
                name: m.badge ? `${m.name} · ${m.badge}` : m.name,
                spec: m.specLine,
                price: m.priceLabel.split(" ").slice(0, -2).join(" ") || m.priceLabel,
                anchor: `#villa-${m.name.toLowerCase()}`,
              }))}
              note={content.section5.priceNote}
            />
          </section>

          {/* 2. L'étape suivante */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.section2.overline}</Overline>
            <BlockTitle>{content.section2.title}</BlockTitle>
            <div className="mt-4">
              <BodyText>
                {content.section2.screenLines.map((l, i) => (
                  <p key={i}>{l}</p>
                ))}
              </BodyText>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 border-t border-border">
              {content.section2.blocks.map((block, i) => (
                <div
                  key={block.title}
                  className={`py-8 md:py-10 ${i === 0 ? "md:pr-10 md:border-r" : "md:pl-10"} border-b md:border-b-0 border-border`}
                >
                  {block.icon === "price" ? (
                    <PriceTagIcon className="w-6 h-6 text-accent mb-4" />
                  ) : (
                    <ShieldIcon className="w-6 h-6 text-accent mb-4" />
                  )}
                  <p className="font-sans font-medium text-foreground text-[18px] mb-2">{block.title}</p>
                  <p className="font-sans text-[15px] leading-[1.5]" style={{ color: GRAY }}>
                    {block.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-sans text-[16px] mt-8 max-w-[640px]" style={{ color: GRAY }}>
              {content.section2.screenClosingLine}
            </p>
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              <p className="italic">{content.section2.eligibilityNote}</p>
              {content.section2.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>{content.section2.closingParagraph}</p>
            </Disclosure>
          </section>

          {/* 3. Nos chiffres */}
          <section id={NUMBERS_ID} className="pt-20 md:pt-[120px]">
            <Overline>{content.section3.overline}</Overline>
            <BlockTitle>{content.section3.title}</BlockTitle>
            <div className="mt-8">
              <StatRow stats={content.section3.stats} />
            </div>
            <div className="mt-8">
              <LabelValueTable rows={content.section3.resaleRows} />
            </div>
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              {content.section3.facts.map((f, i) => (
                <p key={i}>{f}</p>
              ))}
            </Disclosure>
          </section>

          {/* 4. Témoignages */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.section4.overline}</Overline>
            <BlockTitle>{content.section4.title}</BlockTitle>
            <div className="mt-8">
              <TestimonialsBlock testimonials={content.section4.testimonials} pendingLabel={ui.testimonialPending} />
            </div>
          </section>

          {/* 5 & 6. Villas */}
          {content.section5.gammes.map((model, i) => (
            <div key={model.name}>
              <section className="pt-20 md:pt-[120px]">
                <ModelBlock
                  name={model.name}
                  overline={content.section5.overline}
                  specLine={model.specLine}
                  gallery={model.gallery}
                  planImage={model.planImage}
                  planAlt={model.planAlt}
                  priceLabel={model.priceLabel}
                  priceNote={model.priceNote}
                  stats={model.stats}
                  rows={model.rows}
                  ctaLabel={content.section5.ctaLabel}
                  anchor={`#${ANCHOR_ID}`}
                  page={PAGE_NAME}
                  sectionKey={`villa-${model.name.toLowerCase()}`}
                  pendingLabel={ui.imagePending}
                  pendingPlanLabel={ui.imagePending}
                  swipeLabel={ui.swipe(model.gallery.length)}
                />
                {i === content.section5.gammes.length - 1 && (
                  <>
                    <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
                      <p>{content.section5.priceIncludesText}</p>
                      <p>{content.section5.previsionnelText}</p>
                    </Disclosure>
                    {/* 7. Encart hors Seseh */}
                    <div className="mt-20 md:mt-[120px]">
                      <DarkTile
                        overline={content.section5.offSeseh.overline}
                        title={content.section5.offSeseh.title}
                        text={content.section5.offSeseh.text}
                      />
                    </div>
                  </>
                )}
              </section>
              {i < content.section5.gammes.length - 1 && <div className="max-w-[1060px] mx-auto mt-20 md:mt-[120px] border-t border-border" />}
            </div>
          ))}

          {/* 8. Le prix */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.section6.overline}</Overline>
            <BlockTitle>{content.section6.title}</BlockTitle>
            <div className="mt-8">
              <RuleLines items={content.section6.screenLines} />
            </div>
            <div className="mt-6 flex gap-6">
              {content.section6.links.map((link) => (
                <a key={link.anchor} href={link.anchor} className="font-sans text-[15px] underline underline-offset-4 text-foreground">
                  {link.label}
                </a>
              ))}
            </div>
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              {content.section6.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Disclosure>
          </section>

          {/* 9. La gestion */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.section7.overline}</Overline>
            <BlockTitle>{content.section7.title}</BlockTitle>
            <div className="mt-8">
              <RuleLines items={content.section7.neverList} />
            </div>
            <p className="font-sans text-[16px] mt-8 max-w-[640px]" style={{ color: GRAY }}>
              {content.section7.screenLine}
            </p>
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              <p>{content.section7.paragraph}</p>
            </Disclosure>
          </section>

          {/* 10. Les garanties */}
          <section id={GUARANTEES_ID} className="pt-20 md:pt-[120px]">
            <Overline>{content.section8.overline}</Overline>
            <BlockTitle>{content.section8.title}</BlockTitle>
            <div className="mt-8">
              <LabelValueTable rows={content.section8.guarantees.map((g) => ({ label: g.title.replace(/\.$/, ""), value: g.short }))} />
            </div>
            <div className="mt-8">
              <CtaLink section="garanties" label={content.section8.ctaLabel} anchor={`#${ANCHOR_ID}`} page={PAGE_NAME} />
            </div>
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              {content.section8.guarantees.map((g, i) => (
                <p key={i}>{g.body}</p>
              ))}
            </Disclosure>
          </section>

          {/* 11. Paiement */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.paiement.overline}</Overline>
            <BlockTitle>{content.paiement.title}</BlockTitle>
            <div className="mt-8">
              <Timeline steps={content.paiement.steps} />
            </div>
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              <p>{content.paiement.detail.intro}</p>
              {content.paiement.detail.steps.map((s, i) => (
                <p key={i}>{s.body ? `${s.title} ${s.body}` : s.title}</p>
              ))}
            </Disclosure>
          </section>

          {/* 12. L'équipe */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.team.overline}</Overline>
            <div className="mt-4">
              <TeamBlock
                photoSrc={content.team.photo}
                photoAlt={content.team.name}
                photoCaption={content.team.photoCaption}
                quote={content.team.quote}
                name={content.team.name}
                role={content.team.role}
                pendingLabel={ui.imagePending}
              />
            </div>
            <div className="mt-8">
              <StatRow stats={content.team.stats} />
            </div>
            <p className="font-sans text-[16px] mt-8 max-w-[640px]" style={{ color: GRAY }}>
              {content.team.screenLine}
            </p>
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              {content.team.detail.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="font-sans text-foreground">{content.team.detail.engagementsIntro}</p>
              {content.team.detail.engagements.map((e, i) => (
                <p key={`e-${i}`}>{e}</p>
              ))}
            </Disclosure>
          </section>

          {/* 13. Le lieu */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.lieu.overline}</Overline>
            <BlockTitle>{content.lieu.title}</BlockTitle>
            <div className="mt-8">
              <DistanceList entries={content.lieu.entries} pendingLabel={ui.imagePending} />
            </div>
          </section>

          {/* 14. Bali en 2027 */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.section11.overline}</Overline>
            <BlockTitle>{content.section11.title}</BlockTitle>
            <div className="mt-8">
              <LabelValueTable rows={content.section11.rows} />
            </div>
            <div className="mt-8">
              <CtaLink section="marche" label={content.section11.ctaLabel} anchor={`#${ANCHOR_ID}`} page={PAGE_NAME} />
            </div>
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              {content.section11.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="text-foreground/50 text-[13px]">
                {ui.sources} : {content.section11.sources.map((s) => s.label).join(" · ")}
              </p>
            </Disclosure>
          </section>

          {/* 15. Éligibilité */}
          <section id={ANCHOR_ID} className="pt-20 md:pt-[120px]">
            <Overline>{content.section12.overline}</Overline>
            <BlockTitle>{content.section12.title}</BlockTitle>
            <div className="mt-8">
              <EntretienEmbed embedCode={content.section12.embedCode} source={EMBED_SOURCE} />
            </div>
          </section>

          {/* 16. FAQ */}
          <section className="pt-20 md:pt-[120px] pb-20 md:pb-[120px]">
            <Overline>{content.section10.overline}</Overline>
            <BlockTitle>{content.section10.title}</BlockTitle>
            <div className="mt-8">
              <FaqAccordion items={content.section10.items} />
            </div>
          </section>
        </div>
      </div>

      {/* Pied de page */}
      <footer className="border-t border-border py-20">
        <div className="max-w-[1060px] mx-auto px-5 md:px-0 space-y-2">
          <p className="font-sans text-[12px]" style={{ color: GRAY }}>
            {content.footer.disclaimer}
          </p>
          <p className="font-sans text-[12px]" style={{ color: GRAY }}>
            <a href="/mentions-legales" rel="nofollow" className="underline underline-offset-4">
              {content.footer.mentionsLegalesLabel}
            </a>
          </p>
          <p className="font-sans text-[12px]" style={{ color: GRAY }}>
            <a href={`mailto:${content.footer.contactEmail}`} className="underline underline-offset-4">
              {content.footer.contactEmail}
            </a>
          </p>
        </div>
      </footer>

      <StickyMobileCta label={content.stickyBar.ctaLabel} anchorId={ANCHOR_ID} page={PAGE_NAME} />
    </main>
  )
}
