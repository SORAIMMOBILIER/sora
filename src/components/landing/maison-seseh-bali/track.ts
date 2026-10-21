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
