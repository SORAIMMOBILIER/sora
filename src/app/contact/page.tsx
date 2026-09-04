import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Contact | SORA Immobilier",
  description: "Réservez un appel offert avec Gabriel pour cadrer votre projet d'investissement à Bali.",
}

const CALENDLY_URL =
  "https://calendly.com/contact-sora-immobilier/rdv-avec-gabriel-investir-a-bali?utm_source=contact&hide_gdpr_banner=1"

export default async function ContactPage() {
  const t = await getTranslations("Contact")
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

        <div className="container-page max-w-5xl mx-auto mt-12">
          <iframe
            src={CALENDLY_URL}
            title={t("iframeTitle")}
            className="w-full rounded-sm border border-ink/10 bg-white"
            style={{ height: 1100 }}
            loading="lazy"
          />
        </div>

        <div className="container-page max-w-5xl mx-auto mt-12 text-center text-ink/60 text-base">
          <p>
            {t("altContact")}{" "}
            <a href="tel:+33633517746" className="text-ink underline underline-offset-4 hover:text-accent transition-colors">
              +33 6 33 51 77 46
            </a>{" "}
            ·{" "}
            <a href="mailto:contact@sora-immobilier.com" className="text-ink underline underline-offset-4 hover:text-accent transition-colors">
              contact@sora-immobilier.com
            </a>{" "}
            ·{" "}
            <a href="https://wa.me/message/U6SAMFGVWDQDO1" target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4 hover:text-accent transition-colors">
              WhatsApp
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </>
  )
}
