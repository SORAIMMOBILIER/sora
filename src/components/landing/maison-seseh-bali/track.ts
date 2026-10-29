// Petit helper partagé pour les events personnalisés Meta Pixel de cette
// landing page. Le pixel de base (fbq('init', ...) + PageView) est déjà
// chargé site-wide par src/components/layout/cookie-banner.tsx, hérité
// du layout racine — rien à réinjecter ici, on se contente d'appeler fbq.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function trackCustom(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  window.fbq?.("trackCustom", eventName, params)
}

export function trackCtaClick(section: string, page: string = "maison-seseh-bali") {
  trackCustom("LP_CTAClick", { page, section })
}

// Event standard Meta "Lead" (pas trackCustom) — uniquement sur les leads
// qualifiés ("qualifie" / "qualifie-2027"), jamais sur "nurture".
export function trackLead(contentName: "LP-A" | "LP-B", contentCategory: string | null) {
  if (typeof window === "undefined") return
  window.fbq?.("track", "Lead", { content_name: contentName, content_category: contentCategory })
}
