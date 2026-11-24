"use client"
import { useEffect, useState } from "react"

// Déclenche au premier des deux : affichage complet de la page (load,
// relayé par requestIdleCallback) OU première interaction (scroll, clic,
// appui tactile ou clavier) — le plus tôt des deux. Sert à différer le
// script lourd (réseau) d'un tag tiers sans jamais retarder un appel qui
// doit rester immédiat (ex. fbq, dataLayer.push) : ces appels restent
// définis en amont par un stub synchrone, indépendant de ce déclencheur —
// voir cookie-banner.tsx et google-tag-manager.tsx.
//
// `enabled=false` renvoie `true` tout de suite : comportement d'origine
// inchangé (chargement immédiat) pour toute page hors du périmètre différé.
export function useDeferredScriptTrigger(enabled: boolean): boolean {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (!enabled || triggered) return

    let idleHandle: number | undefined
    const fire = () => setTriggered(true)
    const onInteraction = () => fire()
    const events = ["scroll", "pointerdown", "keydown", "touchstart"] as const
    events.forEach((ev) => window.addEventListener(ev, onInteraction, { once: true, passive: true }))

    const afterLoad = () => {
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(fire, { timeout: 2000 })
      } else {
        setTimeout(fire, 200)
      }
    }
    if (document.readyState === "complete") {
      afterLoad()
    } else {
      window.addEventListener("load", afterLoad, { once: true })
    }

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, onInteraction))
      window.removeEventListener("load", afterLoad)
      if (idleHandle !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle)
    }
  }, [enabled, triggered])

  return enabled ? triggered : true
}
