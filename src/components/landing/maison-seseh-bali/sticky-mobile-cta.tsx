"use client"
import { useEffect, useState } from "react"
import CtaLink from "./cta-link"

export default function StickyMobileCta({
  label,
  anchorId = "entretien",
  page = "maison-seseh-bali",
}: {
  label: string
  anchorId?: string
  page?: string
}) {
  const [targetVisible, setTargetVisible] = useState(false)

  useEffect(() => {
    const target = document.getElementById(anchorId)
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setTargetVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [anchorId])

  if (targetVisible) return null

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-t border-border px-4 py-3" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <CtaLink section="sticky-bar" label={label} className="w-full" anchor={`#${anchorId}`} page={page} />
    </div>
  )
}
