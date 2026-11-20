"use client"
import { useSyncExternalStore } from "react"
import Script from "next/script"

// Google Tag Manager (conteneur GTM-NWPQ9ZFT) — sert à charger Google
// Analytics 4 et les autres balises marketing, gérées depuis
// tagmanager.google.com sans toucher au code.
//
// Même règle que le Meta Pixel (voir cookie-banner.tsx) : chargé
// uniquement sur le domaine de production, jamais sur les previews Vercel
// ni en localhost, pour ne pas polluer les statistiques avec des visites
// internes. Vérifié côté client, donc ajouté après hydratation.
//
// ⚠️ Pas encore de bannière de consentement réelle sur le site : à ajouter
// (Consent Mode v2) avant de compter sur ces données pour les visiteurs UE.
const GTM_ID = "GTM-NWPQ9ZFT"
const PRODUCTION_HOSTNAMES = ["www.sora-immobilier.com", "sora-immobilier.com"]

const noopSubscribe = () => () => {}

export default function GoogleTagManager() {
  // false côté serveur, vrai hostname côté client (sans setState dans un effet)
  const isProductionHost = useSyncExternalStore(
    noopSubscribe,
    () => PRODUCTION_HOSTNAMES.includes(window.location.hostname),
    () => false,
  )

  if (!isProductionHost) return null

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">{`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `}</Script>
  )
}
