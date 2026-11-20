"use client"
import { useState } from "react"

// Correctif temporaire pendant la désactivation du compte Cloudinary
// (quota dépassé, support contacté pour réactivation — voir le point sur
// l'auto-hébergement). Tant que res.cloudinary.com renvoie 401 sur tout
// le compte, un poster Cloudinary est par définition cassé : safePoster
// bascule directement sur une image locale neutre plutôt que de laisser
// un visuel vide. À retirer une fois les vidéos auto-hébergées (ou le
// compte Cloudinary réactivé et fiable).
export function safePoster(poster: string | undefined, fallback = "/villa-exterior.webp"): string {
  if (!poster || poster.includes("cloudinary.com")) return fallback
  return poster
}

// État "la vidéo a échoué à charger" — à poser sur l'évènement onError
// d'un <video>, pour basculer son rendu vers une image statique plutôt
// que de laisser un lecteur cassé (icône d'erreur, cadre noir) visible.
export function useVideoFallback() {
  const [failed, setFailed] = useState(false)
  return { failed, onError: () => setFailed(true) } as const
}
