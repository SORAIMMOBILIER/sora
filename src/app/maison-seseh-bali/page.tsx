import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLocale } from "next-intl/server"
import LpHeader from "@/components/landing/shared/lp-header"
import HeroVideo from "@/components/landing/shared/hero-video"
import PriceLines from "@/components/landing/shared/price-lines"
import { Overline, BlockTitle, BodyText, LabelValueTable, TwoColBlock } from "@/components/landing/shared/primitives"
import ModelBlock from "@/components/landing/shared/model-block"
import ShowMore from "@/components/landing/shared/show-more"
import StatRow from "@/components/landing/shared/stat-row"
import Timeline from "@/components/landing/shared/timeline"
import DistanceList from "@/components/landing/shared/distance-list"
import TeamBlock from "@/components/landing/shared/team-block"
import Disclosure from "@/components/landing/shared/disclosure"
import SectionBand from "@/components/landing/shared/section-band"
import VideoTestimonials from "@/components/landing/shared/video-testimonials"
import TestimonialsBlock from "@/components/landing/shared/testimonials-block"
import FaqAccordion from "@/components/landing/shared/faq-accordion"
import MediaSlot from "@/components/landing/shared/media-slot"
import { GRAY } from "@/components/landing/shared/tokens"
import CtaLink from "@/components/landing/maison-seseh-bali/cta-link"
import StickyMobileCta from "@/components/landing/maison-seseh-bali/sticky-mobile-cta"
import ScrollDepthTracker from "@/components/landing/maison-seseh-bali/scroll-depth-tracker"
import EntretienEmbed from "@/components/landing/maison-seseh-bali/entretien-embed"
import TasvanPage from "./tasvan-page"
import frContent from "../../../content/maison-seseh-bali/fr"
import enContent from "../../../content/maison-seseh-bali/en"
import type { MaisonSesehBaliContent } from "../../../content/maison-seseh-bali/types"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sora-immobilier.com"
const PAGE_NAME = "maison-seseh-bali"

const UI = {
  fr: {
    imagePending: "IMAGE EN ATTENTE",
    learnMore: "En savoir plus",
    learnLess: "Réduire",
    testimonialPending: "Témoignage en attente",
    sources: "Sources",
    swipe: (n: number) => `${n} PHOTOS · FAITES GLISSER`,
    rdc: "Rez-de-chaussée",
    etage: "Étage",
    listen: "Écouter le témoignage",
  },
  en: {
    imagePending: "IMAGE PENDING",
    learnMore: "Learn more",
    learnLess: "Show less",
    testimonialPending: "Testimonial pending",
    sources: "Sources",
    swipe: (n: number) => `${n} PHOTOS · SWIPE`,
    rdc: "Ground floor",
    etage: "Upper floor",
    listen: "Listen to the testimonial",
  },
}

function getContent(locale: string): MaisonSesehBaliContent | null {
  // Branche design-tasvan : l'anglais reste en 404 tant que les textes
  // alignés sur la nouvelle structure n'ont pas été fournis.
  return locale === "en" ? null : frContent
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

  // Branche design-tasvan : nouvelle structure, français uniquement.
  if (locale !== "en") {
    return <TasvanPage />
  }

  const otherHref = locale === "en" ? "/maison-seseh-bali" : "/en/home-seseh-bali"
  const otherLabel = locale === "en" ? "FR" : content.nav.switchLabel
  const showLanguageSwitch = locale === "en" ? true : enContent !== null
  const anchorId = locale === "en" ? "consultation" : "entretien"
  const embedSource = locale === "en" ? "LP-A-EN" : "LP-A"
  const ui = UI[locale === "en" ? "en" : "fr"]

  const extraModels = content.modelsExtra || []
  // Les vidéos témoignages (données réelles, reprises de la home) ne sont
  // disponibles qu'en français pour l'instant — périmètre de cette révision.
  const videoTestimonialQuote = "« Il y a 3 ans, j'aurais jamais pensé pouvoir faire ça… »"

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
              extraItems={extraModels.map((m) => ({
                name: m.name,
                spec: m.priceLineSpec || m.specLine,
                price: m.priceLabel.split(" ").slice(0, -2).join(" ") || m.priceLabel,
                anchor: `#modele-${m.name.toLowerCase()}`,
              }))}
              toggleLabel={content.modelsPriceToggleLabel}
              note={content.modelsPriceNote}
            />
          </section>

          {/* 3. Le bon moment — bande pleine largeur sombre, en français
              (périmètre de cette révision). L'anglais garde l'ancienne mise
              en page (une colonne, avec Disclosure), inchangée. */}
          <section className="pt-16 md:pt-24">
            {locale === "en" ? (
              <>
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
              </>
            ) : (
              <SectionBand variant="dark" overline={content.section2.overline} title={content.section2.title}>
                <div className="space-y-4 max-w-[640px] mx-auto">
                  {content.section2.screenLines.map((l, i) => (
                    <p key={i} className="font-sans text-[16px] leading-[1.5] text-white/80">
                      {l}
                    </p>
                  ))}
                </div>
              </SectionBand>
            )}
          </section>

          {/* 4. La maison (pas de Disclosure) */}
          <section className="pt-16 md:pt-24">
            <div className="relative w-full aspect-[21/9] max-h-[60vh] mb-8">
              <MediaSlot src={content.section3.image} alt={content.section3.title} label={ui.imagePending} sizes="(max-width:1060px) 100vw, 1060px" />
            </div>
            <p className="font-sans text-[13px] mb-8" style={{ color: GRAY }}>
              {content.section3.imageCaption}
            </p>
            {content.section3.rows ? (
              <TwoColBlock overline={content.section3.overline} title={content.section3.title}>
                <LabelValueTable rows={content.section3.rows} />
              </TwoColBlock>
            ) : (
              <>
                <Overline>{content.section3.overline}</Overline>
                <BlockTitle>{content.section3.title}</BlockTitle>
                <div className="mt-4">
                  <BodyText>
                    {content.section3.screenLines.map((l, i) => (
                      <p key={i}>{l}</p>
                    ))}
                  </BodyText>
                </div>
              </>
            )}
          </section>

          {/* 5. L'intérieur (Julie) : portrait à gauche, texte + tableau à droite */}
          <section className="pt-16 md:pt-24">
            <div className="grid grid-cols-1 md:grid-cols-12 md:gap-10">
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
                    <p className="font-sans text-[16px] leading-[1.5] mt-4" style={{ color: GRAY }}>
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

          {/* 6 & 7. Modèles — Signature et Exception toujours visibles, Élégance
              et Prestige cachés derrière "Voir les autres gammes du projet" */}
          {content.models.map((model, i) => (
            <div key={model.name}>
              <section className="pt-16 md:pt-24">
                <ModelBlock
                  name={model.name}
                  overline={content.modelsOverline || content.section3.overline}
                  specLine={model.specLine}
                  gallery={model.gallery}
                  planImage={model.planImage}
                  planRdc={model.planRdc}
                  planEtage={model.planEtage}
                  planRdcLabel={ui.rdc}
                  planEtageLabel={ui.etage}
                  planNote={content.modelsPlanNote}
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
                {i === content.models.length - 1 && extraModels.length > 0 && (
                  <div className="mt-10">
                    <ShowMore label={content.modelsExtraCtaLabel || content.modelsPriceToggleLabel || ""}>
                      <div className="space-y-20 md:space-y-24">
                        {extraModels.map((extra) => (
                          <div key={extra.name} className="pt-10 md:pt-12 border-t border-border">
                            <ModelBlock
                              name={extra.name}
                              overline={content.modelsOverline || content.section3.overline}
                              specLine={extra.specLine}
                              gallery={extra.gallery}
                              planImage={extra.planImage}
                              planRdc={extra.planRdc}
                              planEtage={extra.planEtage}
                              planRdcLabel={ui.rdc}
                              planEtageLabel={ui.etage}
                              planNote={content.modelsPlanNote}
                              planAlt={extra.planAlt}
                              priceLabel={extra.priceLabel}
                              priceNote={extra.priceNote}
                              stats={extra.stats}
                              rows={extra.rows}
                              ctaLabel={content.modelsCtaLabel}
                              anchor={`#${anchorId}`}
                              page={PAGE_NAME}
                              sectionKey={`modele-${extra.name.toLowerCase()}`}
                              pendingLabel={ui.imagePending}
                              pendingPlanLabel={ui.imagePending}
                              swipeLabel={ui.swipe(extra.gallery.length)}
                            />
                          </div>
                        ))}
                      </div>
                    </ShowMore>
                  </div>
                )}
                {i === content.models.length - 1 && (
                  <p className="font-sans text-[12px] mt-6" style={{ color: GRAY }}>
                    {content.modelsNote}
                  </p>
                )}
              </section>
              {i < content.models.length - 1 && <div className="max-w-[1060px] mx-auto mt-16 md:mt-24 border-t border-border" />}
            </div>
          ))}

          {/* 8. Les revenus — tableau et deux colonnes en français (bloc
              qui a un vrai tableau). L'anglais, qui n'a qu'une ligne de
              texte ici, garde l'ancienne mise en page, inchangée. */}
          <section className="pt-16 md:pt-24">
            {content.section4.rows ? (
              <TwoColBlock overline={content.section4.overline} title={content.section4.title}>
                <div className="mb-8">
                  <StatRow stats={content.section4.stats} />
                </div>
                <LabelValueTable rows={content.section4.rows} />
                <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
                  {content.section4.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </Disclosure>
              </TwoColBlock>
            ) : (
              <>
                <Overline>{content.section4.overline}</Overline>
                <BlockTitle>{content.section4.title}</BlockTitle>
                <div className="mt-8">
                  <StatRow stats={content.section4.stats} />
                </div>
                <p className="font-sans text-[16px] mt-8 max-w-[640px]" style={{ color: GRAY }}>
                  {content.section4.screenLine}
                </p>
                <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
                  {content.section4.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </Disclosure>
              </>
            )}
          </section>

          {/* 9. Vos garanties (bloc absent tant que non renseigné pour la langue) */}
          {content.garanties && (
            <section className="pt-16 md:pt-24">
              <TwoColBlock overline={content.garanties.overline} title={content.garanties.title}>
                <LabelValueTable rows={content.garanties.rows} />
                <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
                  {content.garanties.rows.map((r, i) => (
                    <p key={i}>
                      <strong className="text-foreground">{r.label}.</strong> {r.value}.
                    </p>
                  ))}
                </Disclosure>
              </TwoColBlock>
            </section>
          )}

          {/* 10. La transmission */}
          <section className="pt-16 md:pt-24">
            <TwoColBlock overline={content.section5.overline} title={content.section5.title}>
              <LabelValueTable rows={content.section5.rows} />
              <Disclosure moreLabel={ui.learnMore} lessLabel={ui.learnLess}>
                {content.section5.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </Disclosure>
            </TwoColBlock>
          </section>

          {/* 11. Venir à Bali (bloc absent tant que non renseigné pour la langue) */}
          {content.venirABali && (
            <section className="pt-16 md:pt-24">
              <div className="relative w-full aspect-[21/9] max-h-[60vh] mb-8">
                <MediaSlot src={content.venirABali.image} alt={content.venirABali.title} label={ui.imagePending} sizes="(max-width:1060px) 100vw, 1060px" />
              </div>
              <p className="font-sans text-[13px] mb-8" style={{ color: GRAY }}>
                {content.venirABali.imageCaption}
              </p>
              <TwoColBlock overline={content.venirABali.overline} title={content.venirABali.title}>
                <LabelValueTable rows={content.venirABali.rows} />
              </TwoColBlock>
            </section>
          )}

          {/* 12. L'équipe */}
          <section className="pt-16 md:pt-24">
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
            <p className="font-sans text-[16px] mt-8" style={{ color: GRAY }}>
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

          {/* 13. Témoignages — bande pleine largeur accent avec les vidéos
              réelles de la home, en français (périmètre de cette révision).
              L'anglais garde l'ancien bloc à placeholders, inchangé. */}
          <section className="pt-16 md:pt-24">
            {locale === "en" ? (
              <>
                <Overline>{content.section7.overline}</Overline>
                <BlockTitle>{content.section7.title}</BlockTitle>
                <div className="mt-8">
                  <TestimonialsBlock testimonials={content.section7.testimonials} pendingLabel={ui.testimonialPending} />
                </div>
              </>
            ) : (
              <SectionBand variant="accent" overline={content.section7.overline} title={content.section7.title}>
                <VideoTestimonials quote={videoTestimonialQuote} listenLabel={ui.listen} />
              </SectionBand>
            )}
          </section>

          {/* 14. L'accès */}
          <section className="pt-16 md:pt-24">
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
          <section className="pt-16 md:pt-24">
            <TwoColBlock overline={content.lieu.overline} title={content.lieu.title}>
              <DistanceList entries={content.lieu.entries} pendingLabel={ui.imagePending} />
            </TwoColBlock>
          </section>

          {/* 16. Bali en 2027 */}
          <section className="pt-16 md:pt-24">
            <TwoColBlock overline={content.section10.overline} title={content.section10.title}>
              <LabelValueTable rows={content.section10.rows} />
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
            </TwoColBlock>
          </section>

          {/* 17. Entretien */}
          <section id={anchorId} className="pt-16 md:pt-24">
            <Overline>{content.section11.overline}</Overline>
            <BlockTitle>{content.section11.title}</BlockTitle>
            <div className="mt-8">
              <EntretienEmbed embedCode={content.section11.embedCode} source={embedSource} />
            </div>
          </section>

          {/* 18. FAQ */}
          <section className="pt-16 md:pt-24 pb-16 md:pb-24">
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
