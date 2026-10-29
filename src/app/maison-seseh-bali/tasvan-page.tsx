import { FONT_VARS } from "@/components/landing/tasvan/fonts"
import { C } from "@/components/landing/tasvan/tokens"
import { Section, Kicker, H2, Btn } from "@/components/landing/tasvan/primitives"
import TasvanHeader from "@/components/landing/tasvan/header"
import TasvanHero from "@/components/landing/tasvan/hero-fullbleed"
import GammesBand, { type GammeCell } from "@/components/landing/tasvan/gammes-band"
import VideoCard from "@/components/landing/tasvan/video-card"
import VillaBlock from "@/components/landing/tasvan/villa-block"
import ShowMore from "@/components/landing/tasvan/show-more"
import LeaseholdCards from "@/components/landing/tasvan/leasehold-cards"
import PaymentFrieze from "@/components/landing/tasvan/payment-frieze"
import GestionBlock from "@/components/landing/tasvan/gestion-block"
import FiletRows from "@/components/landing/tasvan/filet-rows"
import FaqAccordion from "@/components/landing/tasvan/faq-accordion"
import { PlainLines } from "@/components/landing/tasvan/filet-rows"
import JulieBlock from "@/components/landing/tasvan/julie-block"
import TeamSection from "@/components/landing/tasvan/team-section"
import FounderCards from "@/components/landing/tasvan/founder-cards"
import RoiCells from "@/components/landing/tasvan/roi-cells"
import VideoTestimonials from "@/components/landing/tasvan/video-testimonials"
import ContactSection from "@/components/landing/tasvan/contact-section"
import TasvanFooter from "@/components/landing/tasvan/footer"
import ScrollDepthTracker from "@/components/landing/maison-seseh-bali/scroll-depth-tracker"
import StickyMobileCta from "@/components/landing/maison-seseh-bali/sticky-mobile-cta"
import frContent from "../../../content/maison-seseh-bali/fr"
import tasvanExtra from "../../../content/maison-seseh-bali/tasvan-extra-fr"
import type { GammeItem } from "../../../content/maison-seseh-bali/types"

// Page A : bande noire des 4 gammes, de la plus chère à la moins chère,
// sans rendement (uniquement dans la note de bas de fiche — trois
// cellules dans les fiches).

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

  // Fiches villa : Exception puis Signature visibles ; Prestige et
  // Élégance derrière "Voir les autres gammes du projet".
  const visibleModels = [byName("Exception"), byName("Signature")]
  const extraModels = [byName("Prestige"), byName("Élégance")]

  // Bande des 4 gammes : de la plus chère à la moins chère, pas de
  // rendement sur cette page.
  const gammesOrder = ["Exception", "Signature", "Prestige", "Élégance"].map(byName)
  const gammeCells: GammeCell[] = gammesOrder.map((m) => {
    const p1 = splitPrice(m.priceLabel)
    return { name: m.name, spec: m.priceLineSpec || m.specLine, price: p1.amount, anchor: `#modele-${m.name.toLowerCase()}` }
  })

  return (
    <main className={`${FONT_VARS} bg-white`} style={{ color: C.ink }}>
      <link rel="preconnect" href="https://connect.facebook.net" />
      <ScrollDepthTracker page={PAGE_NAME} />

      {/* 1. En-tête noir */}
      <TasvanHeader ctaLabel={tasvanExtra.headerCtaLabel} anchor={ANCHOR} page={PAGE_NAME} />

      {/* 2. Hero — vidéo des rizières en fond, plein écran */}
      <TasvanHero
        overline={content.hero.overline}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        bgVideoUrl={content.hero.bgVideoUrl}
        posterUrl={content.hero.posterImage}
        posterAlt={content.hero.title}
        ctaLabel={content.hero.ctaLabel}
        anchor={ANCHOR}
      />

      {/* 3. Bande noire des 4 gammes — collée sous le hero, zéro espace */}
      <GammesBand items={gammeCells} note={tasvanExtra.priceNote} />

      {/* 4. La maison, pas un numéro de lot — deux colonnes, vidéo de
          présentation à droite (déplacée depuis l'ancien hero). Ordre
          mobile distinct de l'ordre desktop : titre, vidéo, texte, points
          forts, bouton — via grid-template-areas nommées. */}
      <Section>
        <div className="maison-grid grid gap-x-10 md:items-start">
          <style>{`
            .maison-grid { grid-template-columns: 1fr; grid-template-areas: "kicker" "title" "video" "text" "points" "button"; }
            .maison-grid > * + * { margin-top: 18px; }
            @media (min-width: 768px) {
              .maison-grid { grid-template-columns: 5fr 7fr; grid-template-areas: "kicker video" "title video" "text video" "points video" "button video"; }
            }
          `}</style>
          <div style={{ gridArea: "kicker" }}>
            <Kicker>{tasvanExtra.maison.overline}</Kicker>
          </div>
          <div style={{ gridArea: "title" }}>
            <H2>{tasvanExtra.maison.title}</H2>
          </div>
          <div style={{ gridArea: "video" }} className="mb-8 md:mb-12">
            <VideoCard
              videoUrl={content.hero.videoUrl}
              posterUrl={content.hero.posterImage}
              posterAlt={content.hero.title}
              label={tasvanExtra.pending.video}
              page={PAGE_NAME}
            />
          </div>
          <div style={{ gridArea: "text" }}>
            <p className="text-[17px] max-w-[60ch]" style={{ color: C.ink }}>
              {tasvanExtra.maison.paragraph1}
            </p>
          </div>
          <div style={{ gridArea: "points" }}>
            <PlainLines items={tasvanExtra.maison.pointsForts} />
          </div>
          <div style={{ gridArea: "button" }}>
            <Btn href={ANCHOR} ghost>
              {tasvanExtra.maison.ctaLabel}
            </Btn>
          </div>
        </div>
      </Section>

      {/* 5. La collection — Exception puis Signature visibles */}
      <Section alt>
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

      {/* 6. Une maison unique, à votre image (Julie) */}
      <Section>
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
        <LeaseholdCards cards={tasvanExtra.acquisition.cards} />
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
        <FounderCards founders={tasvanExtra.equipe.founders} />
        <div className="mt-12">
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
