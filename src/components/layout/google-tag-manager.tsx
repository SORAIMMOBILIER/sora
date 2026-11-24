"use client"
import { useSyncExternalStore } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { isCampaignPathname } from "@/lib/campaign-pages"
import { useDeferredScriptTrigger } from "@/lib/defer-third-party"

// Google Tag Manager (conteneur GTM-5MZPP8B5) — sert à charger Google
// Analytics 4, DoubleClick et les autres balises marketing, gérées depuis
// tagmanager.google.com sans toucher au code.
//
// Même règle que le Meta Pixel (voir cookie-banner.tsx) : chargé
// uniquement sur le domaine de production, jamais sur les previews Vercel
// ni en localhost, pour ne pas polluer les statistiques avec des visites
// internes. Vérifié côté client, donc ajouté après hydratation.
//
// Sur les 2 VSL (pages de campagne, voir campaign-pages.ts) : le conteneur
// est différé jusqu'au premier scroll/clic/toucher ou, au plus tard,
// après l'affichage complet de la page — il ne concurrence plus le rendu
// initial. Rien d'autre dans le code ne pousse dans dataLayer avant que le
// conteneur lui-même ne le fasse, donc aucun événement à mettre en file
// ici (contrairement au Pixel, voir cookie-banner.tsx). Reste du site :
// comportement d'origine inchangé (chargement immédiat après hydratation).
//
// ⚠️ Pas encore de bannière de consentement réelle sur le site : à ajouter
// (Consent Mode v2) avant de compter sur ces données pour les visiteurs UE.
const GTM_ID = "GTM-5MZPP8B5"
const PRODUCTION_HOSTNAMES = ["www.sora-immobilier.com", "sora-immobilier.com"]

const noopSubscribe = () => () => {}

export default function GoogleTagManager() {
  // false côté serveur, vrai hostname côté client (sans setState dans un effet)
  const isProductionHost = useSyncExternalStore(
    noopSubscribe,
    () => PRODUCTION_HOSTNAMES.includes(window.location.hostname),
    () => false,
  )
  const pathname = usePathname()
  const shouldLoad = useDeferredScriptTrigger(isCampaignPathname(pathname) && isProductionHost)

  if (!isProductionHost || !shouldLoad) return null

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
