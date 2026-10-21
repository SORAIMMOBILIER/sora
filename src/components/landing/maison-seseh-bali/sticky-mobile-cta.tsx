"use client"
import { useEffect, useState } from "react"
import CtaLink from "./cta-link"

export default function StickyMobileCta({ label }: { label: string }) {
  const [entretienVisible, setEntretienVisible] = useState(false)

  useEffect(() => {
    const target = document.getElementById("entretien")
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setEntretienVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  if (entretienVisible) return null

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <CtaLink section="sticky-bar" label={label} className="w-full" />
    </div>
  )
}
