"use client"
import { useEffect, useState } from "react"

const TRACKED_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"]

// Si le code fourni contient un attribut src="..." (cas d'un <iframe>), on y
// ajoute les paramètres UTM/fbclid de la page + source=LP-A, pour que le
// formulaire GoHighLevel sache d'où vient le lead. Pour un <script>, on ne
// peut pas faire cette injection de façon fiable — le code est inséré tel
// quel (voir le rapport final : limite connue, à vérifier avec le vrai code).
function appendParamsToEmbedSrc(rawEmbedCode: string, params: URLSearchParams): string {
  const srcMatch = rawEmbedCode.match(/src="([^"]+)"/)
  if (!srcMatch) return rawEmbedCode

  const originalSrc = srcMatch[1]
  try {
    const url = new URL(originalSrc, window.location.origin)
    params.forEach((value, key) => url.searchParams.set(key, value))
    return rawEmbedCode.replace(originalSrc, url.toString())
  } catch {
    return rawEmbedCode
  }
}

export default function EntretienEmbed({ embedCode }: { embedCode?: string }) {
  const [finalEmbedCode, setFinalEmbedCode] = useState<string | null>(null)

  useEffect(() => {
    if (!embedCode) return
    const search = new URLSearchParams(window.location.search)
    const forwarded = new URLSearchParams()
    for (const key of TRACKED_PARAMS) {
      const value = search.get(key)
      if (value) forwarded.set(key, value)
    }
    forwarded.set("source", "LP-A")
    setFinalEmbedCode(appendParamsToEmbedSrc(embedCode, forwarded))
  }, [embedCode])

  if (!embedCode) {
    return (
      <div className="w-full min-h-[600px] flex items-center justify-center border border-border rounded-sm bg-card">
        <p className="text-foreground/50 text-sm">Questionnaire en cours d'intégration</p>
      </div>
    )
  }

  // finalEmbedCode n'est calculé que côté client (window.location) : avant
  // l'hydratation, on affiche le même cadre vide pour éviter tout décalage
  // serveur/client.
  if (!finalEmbedCode) {
    return <div className="w-full min-h-[600px] rounded-sm bg-card" />
  }

  return <div className="w-full min-h-[600px]" dangerouslySetInnerHTML={{ __html: finalEmbedCode }} />
}
