"use client"
import { Suspense, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import Link from "@/components/localized-link"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

function MerciContent() {
  const t = useTranslations("Merci")
  const fired = useRef(false)
  const searchParams = useSearchParams()
  const source = searchParams.get("utm_source") || "vsl"

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    window.fbq?.("track", "Lead", {
      content_name: `rdv-${source}`,
      value: 149000,
      currency: "EUR",
    })
  }, [source])

  return (
    <div className="max-w-lg text-center">
      <p className="font-serif font-medium text-foreground leading-[1.0]" style={{ fontSize: "clamp(32px,5vw,56px)" }}>
        {t("title")}
      </p>
      <p className="text-muted-foreground mt-6 leading-relaxed">
        {t("body")}
      </p>
      <div className="mt-10 space-y-4">
        <Link href="/seseh" className="cta-primary font-serif font-semibold inline-block">
          {t("cta")}
        </Link>
        <p className="metadata text-muted-foreground/40">
          {t("footer")}
        </p>
      </div>
    </div>
  )
}

export default function MerciPage() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6">
      <Suspense>
        <MerciContent />
      </Suspense>
    </main>
  )
}
