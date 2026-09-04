import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Mentions légales | SORA Immobilier",
  description: "Mentions légales du site sora-immobilier.com.",
}

export default async function MentionsLegalesPage() {
  const t = await getTranslations("MentionsLegales")

  return (
    <>
      <main className="bg-background min-h-screen px-6 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <h1
            className="font-serif font-medium text-foreground leading-[0.95] mb-12"
            style={{ fontSize: "clamp(32px,4.5vw,56px)" }}
          >
            {t("title")}
          </h1>

          <div className="space-y-10 text-foreground/70 leading-relaxed">
            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">{t("editeurTitle")}</h2>
              <p>
                Le site <strong className="text-foreground">{t("editeurCompany")}</strong> est édité par la société
                PT FIVE BLOOM INTERNATIONAL, exploitant la marque SORA IMMOBILIER.
              </p>
              <ul className="mt-4 space-y-2">
                <li><span className="text-foreground/50">{t("labelNumero")}</span> 1000 0000 0144 2012</li>
                <li><span className="text-foreground/50">{t("labelDenomination")}</span> PT FIVE BLOOM INTERNATIONAL</li>
                <li><span className="text-foreground/50">{t("labelMarque")}</span> SORA IMMOBILIER</li>
                <li><span className="text-foreground/50">{t("labelDirecteur")}</span> Gabriel Lapierre</li>
                <li><span className="text-foreground/50">{t("labelSiege")}</span> Jalan Raya Semat N°17B, Tibubeneng, Bali, 80361 Indonésie</li>
                <li><span className="text-foreground/50">{t("labelEmail")}</span> contact@sora-immobilier.com</li>
                <li><span className="text-foreground/50">{t("labelTelephone")}</span> +33 6 33 51 77 46</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">{t("hebergementTitle")}</h2>
              <p>{t("hebergementBody")}</p>
            </section>

            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">{t("proprieteTitle")}</h2>
              <p>{t("proprieteBody")}</p>
            </section>

            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">{t("donneesTitle")}</h2>
              <p>{t("donneesBody1")}</p>
              <p className="mt-4">{t("donneesBody2")}</p>
              <p className="mt-4">{t("donneesBody3")}</p>
            </section>

            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">{t("cookiesTitle")}</h2>
              <p>{t("cookiesBody1")}</p>
              <p className="mt-4">{t("cookiesBody2")}</p>
            </section>

            <section>
              <h2 className="font-serif font-medium text-foreground text-lg mb-4">{t("responsabiliteTitle")}</h2>
              <p>{t("responsabiliteBody")}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
