"use client"
import React, { useEffect, useState } from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"
import { isCampaignPathname } from "@/lib/campaign-pages"
import { useDeferredScriptTrigger } from "@/lib/defer-third-party"

// Injection non conditionnelle du Facebook Pixel — envoie des events même sans consentement.
//
// Chargé uniquement sur le domaine de production (www.sora-immobilier.com
// ou sora-immobilier.com) : les previews Vercel (sora-xxxx-sora-
// immobilier.vercel.app) et localhost ne doivent jamais appeler le pixel,
// pour ne pas polluer les données Meta avec des visites internes. Vérifié
// côté client (window.location.hostname) — absent côté serveur, donc le
// <Script> n'est ajouté qu'après hydratation, jamais pendant le SSR.
//
// Sur les 2 VSL (pages de campagne, voir campaign-pages.ts) : le stub fbq
// (file d'attente native du Pixel) + l'init + le PageView partent tout de
// suite, sans coût réseau — seul le script fbevents.js (le poids réel) est
// différé jusqu'au premier scroll/clic/toucher ou, au plus tard, après
// l'affichage complet de la page. N'importe quel appel fbq fait ailleurs
// avant ce chargement (ex. trackLead au dépôt du questionnaire) est mis en
// file par le stub lui-même et envoyé dès que fbevents.js est prêt —
// comportement documenté de la balise Meta, aucun événement perdu. Reste
// du site : un seul bloc, comportement d'origine inchangé (afterInteractive).
const PRODUCTION_HOSTNAMES = ["www.sora-immobilier.com", "sora-immobilier.com"]
const PIXEL_ID = "949873927292995"

const CALENDLY_LISTENER = `
  window.addEventListener('message', function(e) {
    if (e.data && e.data.event === 'calendly.event_scheduled') {
      fbq('track', 'Schedule', { source: 'calendly-booking' });
    }
  });
`

export default function CookieBanner() {
  const pathname = usePathname()
  const isCampaign = isCampaignPathname(pathname)
  const [isProductionHost, setIsProductionHost] = useState(false)

  useEffect(() => {
    setIsProductionHost(PRODUCTION_HOSTNAMES.includes(window.location.hostname))
  }, [])

  const shouldLoadScript = useDeferredScriptTrigger(isCampaign && isProductionHost)

  if (!isProductionHost) return null

  if (!isCampaign) {
    return (
      <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
          ${CALENDLY_LISTENER}
        `}</Script>
    )
  }

  return (
    <>
      <Script id="meta-pixel-stub" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[]}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
          ${CALENDLY_LISTENER}
        `}</Script>
      {shouldLoadScript && (
        <Script id="meta-pixel-loader" strategy="afterInteractive">{`
          (function(b,e,v){var t=b.createElement(e);t.async=!0;t.src=v;
          var s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
          })(document,'script','https://connect.facebook.net/en_US/fbevents.js');
        `}</Script>
      )}
    </>
  )
}
