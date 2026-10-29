"use client"
import React, { useEffect, useState } from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"
import { isCampaignPathname } from "@/lib/campaign-pages"

// Injection non conditionnelle du Facebook Pixel — envoie des events même sans consentement.
// strategy="lazyOnload" uniquement sur les pages de campagne Meta (voir
// src/lib/campaign-pages.ts) : le script n'y concurrence plus le rendu de
// l'image LCP, prioritaire sur une LP mono-visuel. Le reste du site garde
// afterInteractive (comportement d'origine) — le sitewide sera revu dans
// la refonte.
//
// Chargé uniquement sur le domaine de production (www.sora-immobilier.com
// ou sora-immobilier.com) : les previews Vercel (sora-xxxx-sora-
// immobilier.vercel.app) et localhost ne doivent jamais appeler le pixel,
// pour ne pas polluer les données Meta avec des visites internes. Vérifié
// côté client (window.location.hostname) — absent côté serveur, donc le
// <Script> n'est ajouté qu'après hydratation, jamais pendant le SSR.
const PRODUCTION_HOSTNAMES = ["www.sora-immobilier.com", "sora-immobilier.com"]

export default function CookieBanner() {
  const pathname = usePathname()
  const strategy = isCampaignPathname(pathname) ? "lazyOnload" : "afterInteractive"
  const [isProductionHost, setIsProductionHost] = useState(false)

  useEffect(() => {
    setIsProductionHost(PRODUCTION_HOSTNAMES.includes(window.location.hostname))
  }, [])

  if (!isProductionHost) return null

  return (
    <>
      <Script id="meta-pixel" strategy={strategy}>{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '949873927292995');
          fbq('track', 'PageView');
          window.addEventListener('message', function(e) {
            if (e.data && e.data.event === 'calendly.event_scheduled') {
              fbq('track', 'Schedule', { source: 'calendly-booking' });
            }
          });
        `}</Script>
    </>
  )
}
