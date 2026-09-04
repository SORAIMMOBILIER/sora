"use client"
import { useId, useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const TYPEFORM_URL = "https://sora-immobilier.typeform.com/to/HMEoNaAB"

function normalizePhone(raw: string) {
  let digits = raw.trim().replace(/[^\d+]/g, "")
  digits = digits.replace(/^\+/, "")
  if (digits.startsWith("0")) {
    digits = "33" + digits.slice(1)
  }
  return digits
}

function buildTypeformUrl(values: { email: string; firstName: string; lastName: string; phone: string }) {
  const email = values.email.trim().toLowerCase()
  const prenom = values.firstName.trim()
  const nom = values.lastName.trim()
  const tel = normalizePhone(values.phone)

  const parts: string[] = []
  if (email) parts.push(`email=${encodeURIComponent(email)}`)
  if (prenom) parts.push(`prenom=${encodeURIComponent(prenom)}`)
  if (nom) parts.push(`nom=${encodeURIComponent(nom)}`)
  if (tel) parts.push(`tel=${encodeURIComponent(tel)}`)

  return parts.length ? `${TYPEFORM_URL}?${parts.join("&")}` : TYPEFORM_URL
}

export default function WebinarForm({ showHeading = true }: { showHeading?: boolean }) {
  const t = useTranslations("Webinar")
  const uid = useId()
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        window.fbq?.("track", "Lead", { source: "webinaire-mardi" })
        window.location.href = buildTypeformUrl(form)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif font-medium text-ink text-2xl mb-4">{t("successTitle")}</h3>
        <p className="text-ink/65 leading-relaxed">
          {t("successBody")}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {showHeading && (
        <>
          <h3 className="font-serif font-medium text-ink text-xl md:text-2xl mb-2">
            {t("formHeadingTitle")}
          </h3>
          <p className="text-ink/50 text-sm mb-8">
            {t("formHeadingBody")}
          </p>
        </>
      )}

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${uid}-firstName`} className="form-label mb-2">{t("formFirstName")}</label>
            <input
              id={`${uid}-firstName`}
              type="text"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
              placeholder="Gabriel"
            />
          </div>
          <div>
            <label htmlFor={`${uid}-lastName`} className="form-label mb-2">{t("formLastName")}</label>
            <input
              id={`${uid}-lastName`}
              type="text"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
              placeholder="Lapierre"
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className="form-label mb-2">{t("formEmail")}</label>
          <input
            id={`${uid}-email`}
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="gabriel@exemple.com"
          />
        </div>

        <div>
          <label htmlFor={`${uid}-phone`} className="form-label mb-2">{t("formPhone")}</label>
          <input
            id={`${uid}-phone`}
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-bg border border-line rounded-sm px-4 py-3 text-ink text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
      </div>

      <Button type="submit" disabled={status === "loading"} className="w-full mt-8">
        {status === "loading" ? t("formSubmitting") : t("formSubmit")}
      </Button>

      {status === "error" && (
        <p className="mt-4 text-destructive text-sm text-center">
          {t("formError")}
        </p>
      )}

      <p className="mt-6 metadata text-ink/35 text-center">
        {t("formNote")}
      </p>
    </form>
  )
}
