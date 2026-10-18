"use client"
import dynamic from "next/dynamic"
import type { PenflowProps } from "penflow/react"

// Même rendu que sur la page d'accueil (src/components/sections/founder-section.tsx) :
// signature générée à partir d'une police manuscrite, pas une image. Extrait ici
// en petit composant client pour pouvoir être importé depuis une page serveur.
const Penflow = dynamic<PenflowProps>(
  () => import("penflow/react").then((m) => ({ default: m.Penflow })),
  { ssr: false }
)

export default function GabrielSignature({ color = "#FFFFFF" }: { color?: string }) {
  return (
    <Penflow
      text="Gabriel Lapierre"
      fontUrl="/fonts/BrittanySignature.ttf"
      quality="calm"
      color={color}
      size={44}
      speed={0.4}
      lineHeight={1.6}
      seed="sora"
    />
  )
}
