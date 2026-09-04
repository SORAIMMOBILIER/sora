import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Link from "@/components/localized-link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Fonctionnement | SORA Immobilier",
  description:
    "Sora gère toutes les étapes de votre investissement à Bali : sélection du foncier, structuration juridique, conception, travaux et gestion locative.",
}

type Step = { title: string; desc: string }
type Partner = { name: string; role: string; desc: string }

export default async function FonctionnementPage() {
  const t = await getTranslations("Fonctionnement")
  const STEPS = t.raw("steps") as Step[]
  const PARTNERS = t.raw("partners") as Partner[]

  return (
    <>
      <section className="bg-bg px-6 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-page max-w-5xl mx-auto text-center">
          <p className="eyebrow mb-6">{t("eyebrow")}</p>
          <h1
            className="font-serif font-medium text-ink leading-[0.95]"
            style={{ fontSize: "clamp(36px,5vw,72px)" }}
          >
            {t("title")}
          </h1>
          <p className="text-ink/70 mt-8 leading-relaxed text-lg max-w-2xl mx-auto">
            {t("body")}
          </p>
        </div>

        <div className="container-page max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {STEPS.map((step, i) => (
            <div key={step.title}>
              <Separator className="bg-ink/10" />
              <div className="flex gap-5 pt-6 pb-8">
                <span className="metadata text-ink/50">0{i + 1}</span>
                <div>
                  <h2 className="font-serif text-2xl text-ink mb-2">{step.title}</h2>
                  <p className="text-ink/65 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary px-6 py-24 md:py-36">
        <div className="container-page max-w-5xl mx-auto text-center mb-16">
          <p className="eyebrow-dark mb-8">{t("partnersEyebrow")}</p>
          <h2
            className="font-serif font-medium text-background leading-[1.0]"
            style={{ fontSize: "clamp(32px,4.5vw,64px)" }}
          >
            {t("partnersTitle")}
          </h2>
        </div>
        <div className="container-page max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNERS.map((p) => (
            <div key={p.name} className="rounded-sm border border-background/10 bg-background/5 p-8">
              <p className="tertiary text-background/55 mb-3">{p.role}</p>
              <h3 className="font-serif text-2xl text-background mb-3">{p.name}</h3>
              <p className="text-background/70 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="container-page max-w-5xl mx-auto mt-16 text-center">
          <Button asChild variant="inverse">
            <Link href="/contact">{t("cta")}</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </>
  )
}
