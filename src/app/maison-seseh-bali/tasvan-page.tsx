import { FONT_VARS } from "@/components/landing/tasvan/fonts"
import { C } from "@/components/landing/tasvan/tokens"
import { Section, Wrap, Kicker, H2, Btn } from "@/components/landing/tasvan/primitives"
import TasvanHeader from "@/components/landing/tasvan/header"
import TasvanHero from "@/components/landing/tasvan/hero"
import LeLieuVideo from "@/components/landing/tasvan/le-lieu-video"
import VillaBlock from "@/components/landing/tasvan/villa-block"
import ShowMore from "@/components/landing/tasvan/show-more"
import LeaseholdCards from "@/components/landing/tasvan/leasehold-cards"
import PaymentFrieze from "@/components/landing/tasvan/payment-frieze"
import GestionBlock from "@/components/landing/tasvan/gestion-block"
import FiletRows from "@/components/landing/tasvan/filet-rows"
import FaqAccordion from "@/components/landing/tasvan/faq-accordion"
import IntroGrid from "@/components/landing/tasvan/intro-grid"
import { PlainLines } from "@/components/landing/tasvan/filet-rows"
import JulieBlock from "@/components/landing/tasvan/julie-block"
import TeamSection from "@/components/landing/tasvan/team-section"
import RoiCells from "@/components/landing/tasvan/roi-cells"
import VideoTestimonials from "@/components/landing/tasvan/video-testimonials"
import ContactSection from "@/components/landing/tasvan/contact-section"
import TasvanFooter from "@/components/landing/tasvan/footer"
import ScrollDepthTracker from "@/components/landing/maison-seseh-bali/scroll-depth-tracker"
import StickyMobileCta from "@/components/landing/maison-seseh-bali/sticky-mobile-cta"
import frContent from "../../../content/maison-seseh-bali/fr"
import tasvanExtra from "../../../content/maison-seseh-bali/tasvan-extra-fr"
import type { GammeItem } from "../../../content/maison-seseh-bali/types"

// Page A : pas de bande noire des 4 prix, pas de cellule "Rendement net
// estimé" dans les fiches (trois cellules seulement — le rendement reste
// dans la note de bas de fiche).

const PAGE_NAME = "maison-seseh-bali"
const ANCHOR = "#entretien"

// "369 000 € tout compris" -> { amount: "369 000 €", label: "TOUT COMPRIS" }
function splitPrice(raw: string): { amount: string; label: string } {
  const m = raw.match(/^(.+?€)\s*(.*)$/)
  if (!m) return { amount: raw, label: "" }
  return { amount: m[1], label: m[2].toUpperCase() }
}

function VillaFromModel({ model }: { model: GammeItem }) {
  const p1 = splitPrice(model.priceLabel)
  return (
    <VillaBlock
      name={model.name}
      spec={model.specLine}
      gallery={model.gallery}
      planRdc={model.planRdc}
      planEtage={model.planEtage}
      planRdcLabel={tasvanExtra.planRdcLabel}
      planEtageLabel={tasvanExtra.planEtageLabel}
      planNote={tasvanExtra.planNote}
      planAlt={model.planAlt}
      priceAmount={p1.amount}
      priceLabel={p1.label}
      stats={model.stats.slice(0, 3)}
      rows={model.rows}
      roiNote={tasvanExtra.roiNote}
      ctaLabel={tasvanExtra.modelsCtaLabel}
      anchor={ANCHOR}
      page={PAGE_NAME}
      sectionKey={`modele-${model.name.toLowerCase()}`}
      pendingLabel={tasvanExtra.pending.photo}
      swipeLabel={tasvanExtra.swipeLabel(model.gallery.length)}
    />
  )
}

export default function TasvanPage() {
  const content = frContent
  const allModels = [...content.models, ...(content.modelsExtra || [])]
  const byName = (n: string) => allModels.find((m) => m.name === n)!

  // Fiches villa : Signature puis Exception visibles ; Élégance et
  // Prestige derrière "Voir les autres gammes du projet".
  const visibleModels = [byName("Signature"), byName("Exception")]
  const extraModels = [byName("Élégance"), byName("Prestige")]

  const lieuRows = content.lieu.entries.filter((e) => e.distance).map((e) => ({ label: e.place, value: e.distance! }))

  return (
    <main className={`${FONT_VARS} bg-white`} style={{ color: C.ink }}>
      <link rel="preconnect" href="https://connect.facebook.net" />
      <ScrollDepthTracker page={PAGE_NAME} />

      {/* 1. En-tête noir */}
      <TasvanHeader ctaLabel={tasvanExtra.headerCtaLabel} anchor={ANCHOR} page={PAGE_NAME} />

      {/* 2. Hero */}
      <Wrap className="pt-10 md:pt-16">
        <TasvanHero
          overline={content.hero.overline}
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          videoUrl={content.hero.videoUrl}
          posterUrl={content.hero.posterImage}
          posterAlt={content.hero.title}
          ctaLabel={content.hero.ctaLabel}
          anchor={ANCHOR}
          page={PAGE_NAME}
          videoPendingLabel={tasvanExtra.pending.video}
        />
      </Wrap>

      {/* 3. Le lieu — vidéo du hero du site principal en fond, collé sous le hero */}
      <LeLieuVideo overline={content.lieu.overline} title={content.lieu.title} videoSrc={tasvanExtra.lelieu.videoSrc} posterSrc={tasvanExtra.lelieu.posterSrc} rows={lieuRows} />

      {/* 4. Une maison, pas un numéro de lot */}
      <Section>
        <IntroGrid
          overline={tasvanExtra.maison.overline}
          title={tasvanExtra.maison.title}
          left={
            <>
              <p className="text-[17px] max-w-[60ch]" style={{ color: C.ink }}>
                {tasvanExtra.maison.paragraph1}
              </p>
              <p className="mt-[18px] max-w-[60ch]" style={{ color: C.muted }}>
                {tasvanExtra.maison.paragraph2}
              </p>
              <div className="mt-10">
                <Btn href={ANCHOR} ghost>
                  {tasvanExtra.maison.ctaLabel}
                </Btn>
              </div>
            </>
          }
          right={
            <>
              <Kicker>{tasvanExtra.maison.pointsFortsLabel}</Kicker>
              <div className="mt-4">
                <PlainLines items={tasvanExtra.maison.pointsForts} />
              </div>
            </>
          }
        />
      </Section>

      {/* 5. Une maison unique, à votre image (Julie) */}
      <Section alt>
        <JulieBlock
          overline={content.julie.overline}
          title={content.julie.title}
          line={content.julie.screenLine || content.julie.screenLines[0]}
          portraitSrc={content.julie.image}
          portraitCaption={content.julie.imageCaption}
          rows={content.julie.rows || []}
          disclaimerLine={content.julie.disclaimerLine}
          pendingLabel={tasvanExtra.pending.julie}
        />
      </Section>

      {/* 6. La collection — Signature puis Exception visibles, pas de bande noire, 3 cellules */}
      <Section>
        <div className="space-y-16 md:space-y-24">
          {visibleModels.map((model, i) => (
            <div key={model.name} className={i > 0 ? "pt-16 md:pt-24 border-t" : ""} style={i > 0 ? { borderColor: C.line } : undefined}>
              <VillaFromModel model={model} />
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24">
          <ShowMore label={tasvanExtra.modelsExtraCtaLabel} closeLabel={tasvanExtra.closeLabel}>
            <div className="space-y-16 md:space-y-24">
              {extraModels.map((model, i) => (
                <div key={model.name} className={i > 0 ? "pt-16 md:pt-24 border-t" : ""} style={i > 0 ? { borderColor: C.line } : undefined}>
                  <VillaFromModel model={model} />
                </div>
              ))}
            </div>
          </ShowMore>
        </div>
      </Section>

      {/* 7. Le jour de la remise des clés, on vous fait venir à Bali */}
      {content.venirABali && (
        <Section alt>
          <Kicker>{content.venirABali.overline}</Kicker>
          <div className="mt-4">
            <H2>{content.venirABali.title}</H2>
          </div>
          <FiletRows rows={content.venirABali.rows} />
        </Section>
      )}

      {/* 8. Ce que vous possédez — trois cartes leasehold */}
      <Section>
        <Kicker>{tasvanExtra.acquisition.overline}</Kicker>
        <div className="mt-4">
          <H2>{tasvanExtra.acquisition.title}</H2>
        </div>
        <LeaseholdCards cards={tasvanExtra.acquisition.cards} bottomLine={tasvanExtra.acquisition.bottomLine} />
      </Section>

      {/* 9. Vos garanties */}
      {content.garanties && (
        <Section alt>
          <Kicker>{content.garanties.overline}</Kicker>
          <div className="mt-4">
            <H2>{content.garanties.title}</H2>
          </div>
          <FiletRows rows={content.garanties.rows} />
        </Section>
      )}

      {/* 10. Équipe */}
      <Section>
        <TeamSection
          overline={content.team.overline}
          title={content.team.title}
          intro={tasvanExtra.equipe.intro}
          photoSrc={content.team.photo}
          photoAlt={content.team.name}
          quote={content.team.quote}
          name={content.team.name}
          role={content.team.role}
          pendingLabel={tasvanExtra.pending.team}
        />
        <div className="mt-10">
          <RoiCells stats={content.team.stats} />
        </div>
      </Section>

      {/* 11. Gestion locative avec SORA */}
      <Section alt>
        <GestionBlock
          overline={tasvanExtra.gestion.overline}
          title={tasvanExtra.gestion.title}
          intro={tasvanExtra.gestion.intro}
          stats={tasvanExtra.gestion.stats}
          lines={tasvanExtra.gestion.lines}
        />
      </Section>

      {/* 12. Plan de paiement */}
      <Section>
        <Kicker>{tasvanExtra.payment.overline}</Kicker>
        <div className="mt-4">
          <H2>{tasvanExtra.payment.title}</H2>
        </div>
        <div className="mt-6 max-w-[60ch] space-y-3 text-[16px]" style={{ color: C.muted }}>
          {tasvanExtra.payment.intro.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <PaymentFrieze steps={tasvanExtra.payment.steps} />
      </Section>

      {/* 13. Témoignages vidéo */}
      <Section alt>
        <Kicker>{content.section7.overline}</Kicker>
        <div className="mt-4">
          <H2>{content.section7.title}</H2>
        </div>
        <VideoTestimonials items={tasvanExtra.temoignages.items} listenLabel={tasvanExtra.temoignages.listenLabel} />
      </Section>

      {/* 14. FAQ */}
      <Section>
        <Kicker>{content.section9.overline}</Kicker>
        <div className="mt-4">
          <H2>{content.section9.title}</H2>
        </div>
        <FaqAccordion items={content.section9.items} />
      </Section>

      {/* 15. Questionnaire */}
      <div id="entretien">
        <ContactSection
          title={tasvanExtra.contact.title}
          intro={tasvanExtra.contact.intro}
          photoSrc={tasvanExtra.contact.photoSrc}
          formTitle={tasvanExtra.contact.formTitle}
          formHint={tasvanExtra.contact.formHint}
          embedCode={content.section11.embedCode}
          embedSource="LP-A"
        />
      </div>

      {/* 16. Pied de page */}
      <TasvanFooter columns={tasvanExtra.footer.columns} disclaimerLines={tasvanExtra.footer.disclaimerLines} />
      <StickyMobileCta label={content.stickyBar.ctaLabel} anchorId="entretien" page={PAGE_NAME} />
    </main>
  )
}
