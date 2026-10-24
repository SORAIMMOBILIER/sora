import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLocale } from "next-intl/server"
import LpHeader from "@/components/landing/shared/lp-header"
import HeroVideo from "@/components/landing/shared/hero-video"
import PriceLines from "@/components/landing/shared/price-lines"
import { Overline, BlockTitle, BodyText, LabelValueTable } from "@/components/landing/shared/primitives"
import ModelBlock from "@/components/landing/shared/model-block"
import StatRow from "@/components/landing/shared/stat-row"
import Timeline from "@/components/landing/shared/timeline"
import DistanceList from "@/components/landing/shared/distance-list"
import TeamBlock from "@/components/landing/shared/team-block"
import Disclosure from "@/components/landing/shared/disclosure"
import TestimonialsBlock from "@/components/landing/shared/testimonials-block"
import FaqAccordion from "@/components/landing/shared/faq-accordion"
import SwipeGallery from "@/components/landing/shared/swipe-gallery"
import MediaSlot from "@/components/landing/shared/media-slot"
import { GRAY } from "@/components/landing/shared/tokens"
import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"
import StickyMobileCta from "@/components/landing/maison-seseh-bali/sticky-mobile-cta"
import ScrollDepthTracker from "@/components/landing/maison-seseh-bali/scroll-depth-tracker"
import EntretienEmbed from "@/components/landing/maison-seseh-bali/entretien-embed"
import frContent from "../../../content/maison-seseh-bali/fr"
import enContent from "../../../content/maison-seseh-bali/en"
import type { MaisonSesehBaliContent } from "../../../content/maison-seseh-bali/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sora-immobilier.com"
const PAGE_NAME = "maison-seseh-bali"

const UI = {
  fr: { imagePending: "IMAGE EN ATTENTE", learnMore: "En savoir plus", learnLess: "Réduire", testimonialPending: "Témoignage en attente", sources: "Sources", swipe: (n: number) => `${n} PHOTOS · FAITES GLISSER` },
  en: { imagePending: "IMAGE PENDING", learnMore: "Learn more", learnLess: "Show less", testimonialPending: "Testimonial pending", sources: "Sources", swipe: (n: number) => `${n} PHOTOS · SWIPE` },
}

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

export default async function MaisonSesehBaliPage() {
  const locale = await getLocale()
  const content = getContent(locale)
  if (!content) notFound()

  const otherHref = locale === "en" ? "/maison-seseh-bali" : "/en/home-seseh-bali"
  const otherLabel = locale === "en" ? "FR" : content.nav.switchLabel
  const showLanguageSwitch = locale === "en" ? true : enContent !== null
  const anchorId = locale === "en" ? "consultation" : "entretien"
  const embedSource = locale === "en" ? "LP-A-EN" : "LP-A"
  const ui = UI[locale === "en" ? "en" : "fr"]

  return (
    <main className="bg-white">
      <link rel="preconnect" href="https://connect.facebook.net" />
      <ScrollDepthTracker page={PAGE_NAME} />

      <LpHeader
        ctaLabel={content.hero.ctaLabel}
        anchor={`#${anchorId}`}
        page={PAGE_NAME}
        showLanguageSwitch={showLanguageSwitch}
        otherHref={otherHref}
        otherLabel={otherLabel}
      />

      <div className="pt-[68px]">
        <div className="max-w-[1060px] mx-auto px-5 md:px-0">
          {/* 1. Hero (vidéo) */}
          <section className="pt-8 md:pt-14">
            <HeroVideo
              overline={content.hero.overline}
              title={content.hero.title}
              subtitle={content.hero.subtitle}
              videoUrl={content.hero.videoUrl}
              posterUrl={content.hero.posterImage}
              posterAlt={content.hero.title}
              ctaLabel={content.hero.ctaLabel}
              anchor={`#${anchorId}`}
              page={PAGE_NAME}
            />
          </section>

          {/* 2. Lignes de prix */}
          <section className="pt-14 md:pt-20">
            <PriceLines
              items={content.models.map((m) => ({
                name: m.name,
                spec: m.priceLineSpec || m.specLine,
                price: m.priceLabel.split(" ").slice(0, -2).join(" ") || m.priceLabel,
                anchor: `#modele-${m.name.toLowerCase()}`,
              }))}
              note={content.modelsPriceNote}
            />
          </section>

          {/* 3. Le bon moment */}
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
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              {content.section2.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Disclosure>
          </section>

          {/* 4. La maison (pas de Disclosure) */}
          <section className="pt-20 md:pt-[120px]">
            <div className="relative w-full aspect-[21/9] max-h-[60vh] mb-8">
              <MediaSlot src={content.section3.image} alt={content.section3.title} label={ui.imagePending} sizes="(max-width:1060px) 100vw, 1060px" />
            </div>
            <p className="font-sans text-[13px] mb-8" style={{ color: GRAY }}>
              {content.section3.imageCaption}
            </p>
            <Overline>{content.section3.overline}</Overline>
            <BlockTitle>{content.section3.title}</BlockTitle>
            {content.section3.rows ? (
              <div className="mt-8">
                <LabelValueTable rows={content.section3.rows} />
              </div>
            ) : (
              <div className="mt-4">
                <BodyText>
                  {content.section3.screenLines.map((l, i) => (
                    <p key={i}>{l}</p>
                  ))}
                </BodyText>
              </div>
            )}
          </section>

          {/* 5. L'intérieur (Julie) */}
          <section className="pt-20 md:pt-[120px]">
            {content.julie.gallery && (
              <SwipeGallery images={content.julie.gallery} pendingLabel={ui.imagePending} swipeLabel={ui.swipe(content.julie.gallery.length)} />
            )}

            <div className={`grid grid-cols-1 md:grid-cols-12 md:gap-10 ${content.julie.gallery ? "mt-10" : ""}`}>
              <div className="md:col-span-4">
                <div className="relative w-full aspect-[4/5] max-h-[60vh]">
                  <MediaSlot src={content.julie.image} alt={content.julie.imageCaption} label={ui.imagePending} sizes="(max-width:768px) 100vw, 320px" />
                </div>
                <p className="font-sans text-[13px] mt-2" style={{ color: GRAY }}>
                  {content.julie.imageCaption}
                </p>
              </div>
              <div className="md:col-span-8 mt-8 md:mt-0">
                <Overline>{content.julie.overline}</Overline>
                <BlockTitle>{content.julie.title}</BlockTitle>
                {content.julie.rows ? (
                  <>
                    <p className="font-sans text-[16px] leading-[1.5] mt-4 max-w-[640px]" style={{ color: GRAY }}>
                      {content.julie.screenLine}
                    </p>
                    <div className="mt-8">
                      <LabelValueTable rows={content.julie.rows} />
                    </div>
                    {content.julie.disclaimerLine && (
                      <p className="font-sans text-[14px] mt-6" style={{ color: GRAY }}>
                        {content.julie.disclaimerLine}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="mt-4">
                    <BodyText>
                      {content.julie.screenLines.map((l, i) => (
                        <p key={i}>{l}</p>
                      ))}
                    </BodyText>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 6 & 7. Modèles */}
          {content.models.map((model, i) => (
            <div key={model.name}>
              <section className="pt-20 md:pt-[120px]">
                <ModelBlock
                  name={model.name}
                  overline={content.modelsOverline || content.section3.overline}
                  specLine={model.specLine}
                  gallery={model.gallery}
                  planImage={model.planImage}
                  planAlt={model.planAlt}
                  priceLabel={model.priceLabel}
                  priceNote={model.priceNote}
                  stats={model.stats}
                  rows={model.rows}
                  ctaLabel={content.modelsCtaLabel}
                  anchor={`#${anchorId}`}
                  page={PAGE_NAME}
                  sectionKey={`modele-${model.name.toLowerCase()}`}
                  pendingLabel={ui.imagePending}
                  pendingPlanLabel={ui.imagePending}
                  swipeLabel={ui.swipe(model.gallery.length)}
                />
                {i === content.models.length - 1 && (
                  <p className="font-sans text-[12px] mt-6 max-w-[640px]" style={{ color: GRAY }}>
                    {content.modelsNote}
                  </p>
                )}
              </section>
              {i < content.models.length - 1 && <div className="max-w-[1060px] mx-auto mt-20 md:mt-[120px] border-t border-border" />}
            </div>
          ))}

          {/* 8. Les revenus */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.section4.overline}</Overline>
            <BlockTitle>{content.section4.title}</BlockTitle>
            <div className="mt-8">
              <StatRow stats={content.section4.stats} />
            </div>
            {content.section4.rows ? (
              <div className="mt-8">
                <LabelValueTable rows={content.section4.rows} />
              </div>
            ) : (
              <p className="font-sans text-[16px] mt-8 max-w-[640px]" style={{ color: GRAY }}>
                {content.section4.screenLine}
              </p>
            )}
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              {content.section4.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Disclosure>
          </section>

          {/* 9. Les garanties (bloc absent tant que non renseigné pour la langue) */}
          {content.garanties && (
            <section className="pt-20 md:pt-[120px]">
              <Overline>{content.garanties.overline}</Overline>
              <BlockTitle>{content.garanties.title}</BlockTitle>
              <div className="mt-8">
                <LabelValueTable rows={content.garanties.rows} />
              </div>
              <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
                {content.garanties.rows.map((r, i) => (
                  <p key={i}>
                    <strong className="text-foreground">{r.label}.</strong> {r.value}.
                  </p>
                ))}
              </Disclosure>
            </section>
          )}

          {/* 10. La transmission */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.section5.overline}</Overline>
            <BlockTitle>{content.section5.title}</BlockTitle>
            <div className="mt-8">
              <LabelValueTable rows={content.section5.rows} />
            </div>
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              {content.section5.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Disclosure>
          </section>

          {/* 11. Venir à Bali (bloc absent tant que non renseigné pour la langue) */}
          {content.venirABali && (
            <section className="pt-20 md:pt-[120px]">
              <div className="relative w-full aspect-[21/9] max-h-[60vh] mb-8">
                <MediaSlot src={content.venirABali.image} alt={content.venirABali.title} label={ui.imagePending} sizes="(max-width:1060px) 100vw, 1060px" />
              </div>
              <p className="font-sans text-[13px] mb-8" style={{ color: GRAY }}>
                {content.venirABali.imageCaption}
              </p>
              <Overline>{content.venirABali.overline}</Overline>
              <BlockTitle>{content.venirABali.title}</BlockTitle>
              <div className="mt-8">
                <LabelValueTable rows={content.venirABali.rows} />
              </div>
            </section>
          )}

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

          {/* 13. Témoignages */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.section7.overline}</Overline>
            <BlockTitle>{content.section7.title}</BlockTitle>
            <div className="mt-8">
              <TestimonialsBlock testimonials={content.section7.testimonials} pendingLabel={ui.testimonialPending} />
            </div>
          </section>

          {/* 14. L'accès */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.section8.overline}</Overline>
            <BlockTitle>{content.section8.title}</BlockTitle>
            <div className="mt-8">
              <Timeline
                steps={content.section8.steps.map((s, i) => ({
                  value: String(i + 1).padStart(2, "0"),
                  title: s.title,
                  body: s.body,
                }))}
              />
            </div>
          </section>

          {/* 15. Le lieu */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.lieu.overline}</Overline>
            <BlockTitle>{content.lieu.title}</BlockTitle>
            <div className="mt-8">
              <DistanceList entries={content.lieu.entries} pendingLabel={ui.imagePending} />
            </div>
          </section>

          {/* 16. Bali en 2027 */}
          <section className="pt-20 md:pt-[120px]">
            <Overline>{content.section10.overline}</Overline>
            <BlockTitle>{content.section10.title}</BlockTitle>
            <div className="mt-8">
              <LabelValueTable rows={content.section10.rows} />
            </div>
            <div className="mt-8">
              <CtaLink section="marche" label={content.section10.ctaLabel} anchor={`#${anchorId}`} page={PAGE_NAME} />
            </div>
            <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
              {content.section10.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="text-foreground/50 text-[13px]">
                {ui.sources} : {content.section10.sources.map((s) => s.label).join(" · ")}
              </p>
            </Disclosure>
          </section>

          {/* 17. Entretien */}
          <section id={anchorId} className="pt-20 md:pt-[120px]">
            <Overline>{content.section11.overline}</Overline>
            <BlockTitle>{content.section11.title}</BlockTitle>
            <div className="mt-8">
              <EntretienEmbed embedCode={content.section11.embedCode} source={embedSource} />
            </div>
          </section>

          {/* 18. FAQ */}
          <section className="pt-20 md:pt-[120px] pb-20 md:pb-[120px]">
            <Overline>{content.section9.overline}</Overline>
            <BlockTitle>{content.section9.title}</BlockTitle>
            <div className="mt-8">
              <FaqAccordion items={content.section9.items} />
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

      <StickyMobileCta label={content.stickyBar.ctaLabel} anchorId={anchorId} page={PAGE_NAME} />
    </main>
  )
}
