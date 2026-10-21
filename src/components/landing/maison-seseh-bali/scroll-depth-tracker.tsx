"use client"
import { useEffect, useRef } from "react"
import { trackCustom } from "./track"

const THRESHOLDS = [25, 50, 75, 100]

// Envoie un event Meta trackCustom une seule fois par palier de défilement
// (25/50/75/100 %), basé sur la hauteur totale de la page.
export default function ScrollDepthTracker() {
  const firedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      if (scrollHeight <= 0) return
      const percent = (scrollTop / scrollHeight) * 100

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold)
          trackCustom("LP_ScrollDepth", { page: "maison-seseh-bali", percent: threshold })
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return null
}
