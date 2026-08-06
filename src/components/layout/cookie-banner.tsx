"use client"
import React from "react"
import Script from "next/script"

// Injection non conditionnelle du Facebook Pixel — envoie des events même sans consentement.
export default function CookieBanner() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">{`
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
