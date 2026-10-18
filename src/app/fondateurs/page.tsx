import type { Metadata } from "next"
import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"
import { Card, CardContent } from "@/components/ui/card"
import Footer from "@/components/layout/footer"
import GabrielSignature from "@/components/founders/gabriel-signature"
import { hreflangAlternates } from "@/lib/hreflang"
import type { Locale } from "@/i18n/request"

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations("FoundersPage")
  const canonical = locale === "en" ? "/en/founders" : "/fondateurs"

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { ...hreflangAlternates("/fondateurs", "/en/founders"), canonical },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [{ url: "/gabriel-lapierre.webp", width: 1280, height: 1280, alt: t("gabrielName") }],
    },
  }
}

export default async function FondateursPage() {
  const t = await getTranslations("FoundersPage")
  const fp1 = await getTranslations("Home.Founder")

  return (
    <main>
      <section className="bg-primary pt-32 md:pt-40 pb-16 md:pb-24 px-6">
        <div className="container-page">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
            <p className="eyebrow-dark mb-8">{t("heroEyebrow")}</p>
            <h1
              className="font-serif font-medium text-background leading-[1.0]"
              style={{ fontSize: "clamp(36px,5vw,76px)" }}
            >
              {t("heroTitle")}
            </h1>
          </div>

          {/* Gabriel — photo à gauche */}
          <Card className="max-w-5xl mx-auto bg-background/5 backdrop-blur-sm border-background/10 shadow-none overflow-hidden">
            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-12 items-stretch">
              <div className="md:col-span-4 relative min-h-[320px] md:min-h-0">
                <Image
                  src="/gabriel-lapierre.webp"
                  alt={`${t("gabrielName")}, ${t("gabrielRole")}`}
                  fill
                  quality={90}
                  className="object-cover object-center"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              <div className="md:col-span-8 p-8 md:p-12">
                <p className="tertiary text-background/60 mb-3">{t("gabrielRole")}</p>
                <h2 className="font-serif text-3xl md:text-4xl text-background mb-6">{t("gabrielName")}</h2>
                <div className="space-y-4 text-background/85 text-sm md:text-base leading-relaxed max-w-xl">
                  <p>{fp1("cardIntro")}</p>
                  <p>{fp1("cardP1")}</p>
                  <p>{fp1("cardP2")}</p>
                  <p>{fp1("cardP3")}</p>
                  <p>{fp1("cardP4")}</p>
                </div>
                <div className="mt-8 h-[70px] w-[240px] md:w-[280px]" role="img" aria-label="Signature de Gabriel Lapierre">
                  <GabrielSignature />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nitham — photo à droite */}
          <Card className="max-w-5xl mx-auto bg-background/5 backdrop-blur-sm border-background/10 shadow-none overflow-hidden mt-10 md:mt-12">
            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-12 items-stretch">
              <div className="md:col-span-8 p-8 md:p-12 md:order-1">
                <p className="tertiary text-background/60 mb-3">{t("nithamRole")}</p>
                <h2 className="font-serif text-3xl md:text-4xl text-background mb-6">{t("nithamName")}</h2>
                <div className="space-y-4 text-background/85 text-sm md:text-base leading-relaxed max-w-xl">
                  <p>{t("nithamP1")}</p>
                  <p>{t("nithamP2")}</p>
                  <p>{t("nithamP3")}</p>
                </div>
                <div className="mt-8 h-[70px] w-[240px] md:w-[280px] relative">
                  <Image
                    src="/signature-nitham-lapierre.png"
                    alt={t("nithamSignatureAlt")}
                    fill
                    quality={90}
                    className="object-contain object-left"
                  />
                </div>
              </div>
              <div className="md:col-span-4 relative min-h-[320px] md:min-h-0 md:order-2">
                <Image
                  src="/nitham-lapierre.webp"
                  alt={t("nithamImgAlt")}
                  fill
                  quality={90}
                  className="object-cover object-center"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
