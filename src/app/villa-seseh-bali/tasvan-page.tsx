import { FONT_VARS } from "@/components/landing/tasvan/fonts"
import { C } from "@/components/landing/tasvan/tokens"
import { Section, Wrap, Kicker, H2 } from "@/components/landing/tasvan/primitives"
import TasvanHeader from "@/components/landing/tasvan/header"
import TasvanHero from "@/components/landing/tasvan/hero"
import GammesBand, { type GammeCell } from "@/components/landing/tasvan/gammes-band"
import VillaBlock from "@/components/landing/tasvan/villa-block"
import ShowMore from "@/components/landing/tasvan/show-more"
import LeaseholdCards from "@/components/landing/tasvan/leasehold-cards"
import PaymentFrieze from "@/components/landing/tasvan/payment-frieze"
import GestionBlock from "@/components/landing/tasvan/gestion-block"
import FiletRows from "@/components/landing/tasvan/filet-rows"
import FaqAccordion from "@/components/landing/tasvan/faq-accordion"
import RoiCells from "@/components/landing/tasvan/roi-cells"
import TeamSection from "@/components/landing/tasvan/team-section"
import LeLieuVideo from "@/components/landing/tasvan/le-lieu-video"
import VideoTestimonials from "@/components/landing/tasvan/video-testimonials"
import ContactSection from "@/components/landing/tasvan/contact-section"
import TasvanFooter from "@/components/landing/tasvan/footer"
import DarkTile from "@/components/landing/shared/dark-tile"
import { PriceTagIcon, ShieldIcon } from "@/components/landing/villa-seseh-bali/icons"
import ScrollDepthTracker from "@/components/landing/maison-seseh-bali/scroll-depth-tracker"
import StickyMobileCta from "@/components/landing/maison-seseh-bali/sticky-mobile-cta"
import maisonContent from "../../../content/maison-seseh-bali/fr"
import tasvanExtra from "../../../content/maison-seseh-bali/tasvan-extra-fr"
import content from "../../../content/villa-seseh-bali/fr"
import type { GammeItem } from "../../../content/maison-seseh-bali/types"

// Page B : mêmes composants que la page A (branche design-tasvan), contenu
// propre à content/villa-seseh-bali/fr.ts pour les sections spécifiques ;
// les modèles (galeries, plans, fiches) et les blocs génériques SORA
// (gestion, acquisition, paiement, équipe, témoignages, contact, pied de
// page) viennent des fichiers partagés de la page A — aucune donnée
// dupliquée, aucun nouveau composant.

const PAGE_NAME = "villa-seseh-bali"
const ANCHOR = "#eligibilite"
const MODELS_CTA_LABEL = "Recevoir le dossier de cette villa"

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
      stats={model.stats}
      rows={model.rows}
      roiNote={tasvanExtra.roiNote}
      ctaLabel={MODELS_CTA_LABEL}
      anchor={ANCHOR}
      page={PAGE_NAME}
      sectionKey={`villa-${model.name.toLowerCase()}`}
      pendingLabel={tasvanExtra.pending.photo}
      swipeLabel={tasvanExtra.swipeLabel(model.gallery.length)}
    />
  )
}

export default function VillaTasvanPage() {
  const allModels = [...maisonContent.models, ...(maisonContent.modelsExtra || [])]
  const byName = (n: string) => allModels.find((m) => m.name === n)!

  // De la moins chère à la plus chère.
  const gammesOrder = ["Élégance", "Prestige", "Signature", "Exception"].map(byName)
  const gammeCells: GammeCell[] = gammesOrder.map((m) => {
    const p1 = splitPrice(m.priceLabel)
    const rendementStat = m.stats.find((s) => s.label === "Rendement net estimé")
    return {
      name: m.name,
      spec: m.priceLineSpec || m.specLine,
      price: p1.amount,
      anchor: `#villa-${m.name.toLowerCase()}`,
      rendement: rendementStat?.value,
    }
  })

  // Fiches : Élégance puis Prestige visibles ; Signature et Exception
  // derrière "Voir les autres gammes du projet".
  const visibleModels = [byName("Élégance"), byName("Prestige")]
  const extraModels = [byName("Signature"), byName("Exception")]

  const lieuRows = content.lieu.entries.filter((e) => e.distance).map((e) => ({ label: e.place, value: e.distance! }))

  // Témoignages : ordre propre à la page B (Clémentine, Jessica, Youness,
  // Samuel en tête, puis les autres dans l'ordre de la page /temoignages
  // du site — ne modifie pas l'ordre partagé utilisé par la page A).
  const temoignagesOrderB = ["Clémentine M.", "Jessica P.B.", "Youness S.", "Samuel D."]
  const temoignagesItemsB = [
    ...temoignagesOrderB.map((n) => tasvanExtra.temoignages.items.find((t) => t.firstName === n)!),
    ...tasvanExtra.temoignages.items.filter((t) => !temoignagesOrderB.includes(t.firstName)),
  ]

  return (
    <main className={`${FONT_VARS} bg-white`} style={{ color: C.ink }}>
      <link rel="preconnect" href="https://connect.facebook.net" />
      <ScrollDepthTracker page={PAGE_NAME} />

      {/* 1. En-tête + hero, texte à gauche / vidéo à droite */}
      <TasvanHeader ctaLabel={content.hero.ctaLabel} anchor={ANCHOR} page={PAGE_NAME} />
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

      {/* 2. Bande noire des 4 gammes, à motifs, moins chère à plus chère */}
      <section className="pt-16 md:pt-24">
        <GammesBand items={gammeCells} note={tasvanExtra.priceNote} />
      </section>

      {/* 3. Les fiches — Élégance puis Prestige, Signature/Exception repliées */}
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

      {/* 4. Nos chiffres */}
      <Section alt>
        <Kicker>{content.section3.overline}</Kicker>
        <div className="mt-4">
          <H2>{content.section3.title}</H2>
        </div>
        <div className="mt-10">
          <RoiCells stats={content.section3.stats} />
        </div>
        <div className="mt-8">
          <FiletRows rows={content.section3.resaleRows} />
        </div>
      </Section>

      {/* 5. L'étape suivante */}
      <Section>
        <Kicker>{content.section2.overline}</Kicker>
        <div className="mt-4">
          <H2>{content.section2.title}</H2>
        </div>
        <div className="mt-[18px] max-w-[60ch] space-y-3 text-[16px]" style={{ color: C.muted }}>
          {content.section2.screenLines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 border-t" style={{ borderColor: C.line }}>
          {content.section2.blocks.map((block, i) => (
            <div key={block.title} className={`py-8 md:py-10 ${i === 0 ? "md:pr-10 md:border-r" : "md:pl-10"} border-b md:border-b-0`} style={{ borderColor: C.line }}>
              {block.icon === "price" ? <PriceTagIcon className="w-6 h-6 mb-4" /> : <ShieldIcon className="w-6 h-6 mb-4" />}
              <p className="text-[18px] mb-2" style={{ color: C.ink }}>
                {block.title}
              </p>
              <p className="text-[15px] leading-[1.5]" style={{ color: C.muted }}>
                {block.body}
              </p>
            </div>
          ))}
        </div>
        <p className="text-[16px] mt-8 max-w-[60ch]" style={{ color: C.muted }}>
          {content.section2.screenClosingLine}
        </p>
      </Section>

      {/* 6. Plan de paiement */}
      <Section alt>
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

      {/* 7. Vos garanties, écrites au contrat */}
      <Section>
        <Kicker>{content.section8.overline}</Kicker>
        <div className="mt-4">
          <H2>{content.section8.title}</H2>
        </div>
        <FiletRows rows={content.section8.guarantees.map((g) => ({ label: g.title.replace(/\.$/, ""), value: g.short }))} />
      </Section>

      {/* 8. Gestion locative avec SORA */}
      <Section alt>
        <GestionBlock
          overline={tasvanExtra.gestion.overline}
          title={tasvanExtra.gestion.title}
          intro={tasvanExtra.gestion.intro}
          stats={tasvanExtra.gestion.stats}
          lines={tasvanExtra.gestion.lines}
        />
      </Section>

      {/* 9. Hors Seseh — tuile sombre du loft */}
      <Section>
        <DarkTile overline={content.section5.offSeseh.overline} title={content.section5.offSeseh.title} text={content.section5.offSeseh.text} />
      </Section>

      {/* 10. Ce que vous possédez */}
      <Section alt>
        <Kicker>{tasvanExtra.acquisition.overline}</Kicker>
        <div className="mt-4">
          <H2>{tasvanExtra.acquisition.title}</H2>
        </div>
        <LeaseholdCards cards={tasvanExtra.acquisition.cards} bottomLine={tasvanExtra.acquisition.bottomLine} />
      </Section>

      {/* 11. Le lieu — vidéo du hero du site principal en fond */}
      <LeLieuVideo overline={content.lieu.overline} title={content.lieu.title} videoSrc={tasvanExtra.lelieu.videoSrc} posterSrc={tasvanExtra.lelieu.posterSrc} rows={lieuRows} />

      {/* 12. Équipe */}
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

      {/* 13. Témoignages vidéo */}
      <Section alt>
        <Kicker>{content.section4.overline}</Kicker>
        <div className="mt-4">
          <H2>{content.section4.title}</H2>
        </div>
        <VideoTestimonials items={temoignagesItemsB} listenLabel={tasvanExtra.temoignages.listenLabel} />
      </Section>

      {/* 14. FAQ de la B */}
      <Section>
        <Kicker>{content.section10.overline}</Kicker>
        <div className="mt-4">
          <H2>{content.section10.title}</H2>
        </div>
        <FaqAccordion items={content.section10.items} />
      </Section>

      {/* 15. Éligibilité — questionnaire, même fond que la page A */}
      <div id="eligibilite">
        <ContactSection
          title={content.section12.title}
          intro={tasvanExtra.contact.intro}
          photoSrc={tasvanExtra.contact.photoSrc}
          formTitle={tasvanExtra.contact.formTitle}
          formHint={tasvanExtra.contact.formHint}
          embedCode={content.section12.embedCode}
          embedSource="LP-B"
        />
      </div>

      {/* 16. Pied de page */}
      <TasvanFooter columns={tasvanExtra.footer.columns} disclaimerLines={tasvanExtra.footer.disclaimerLines} />
      <StickyMobileCta label={content.stickyBar.ctaLabel} anchorId="eligibilite" page={PAGE_NAME} />
    </main>
  )
}
