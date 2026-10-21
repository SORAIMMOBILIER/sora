"use client"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import type { NavRealisation } from "./navbar"
import { isCampaignPathname } from "@/lib/campaign-pages"

// Chargés en dynamic import (plutôt qu'en import statique) : sur les pages
// qui ne les rendent jamais (voir plus bas), leur code — et tout ce qu'ils
// importent (Button/icônes pour Navbar, GSAP+Lenis pour SmoothScroll,
// ~110 Ko à eux seuls) — n'est alors jamais demandé par le navigateur, au
// lieu d'être inclus dans le bundle commun du layout racine.
const Navbar = dynamic(() => import("./navbar"))
const SmoothScroll = dynamic(() => import("@/components/smooth-scroll"))
// ssr:false ici (interdit dans un Server Component, voir layout.tsx) :
// sans lui, Next préchargeait quand même le chunk sur CHAQUE page via un
// hint de preload automatique, même quand le rendu ci-dessous ne l'appelle
// jamais — 415 Ko envoyés en production pour un outil dev-only.
const Agentation = dynamic(() => import("agentation").then((m) => m.Agentation), { ssr: false })

export function useIsStudio() {
  const pathname = usePathname()
  return !!pathname?.startsWith("/studio")
}

export function SiteChrome({ realisations }: { realisations: NavRealisation[] }) {
  const isStudio = useIsStudio()
  const pathname = usePathname()
  // Pas de navbar sur la VSL ni sur les LPs Meta (voir
  // src/lib/campaign-pages.ts) : funnel fermé, un seul CTA. usePathname()
  // reflète l'URL demandée par le navigateur (/en/home-seseh-bali), pas la
  // destination réécrite en interne — la liste couvre donc FR et EN.
  if (
    isStudio ||
    pathname === "/villas-ssv" ||
    pathname === "/merci" ||
    pathname === "/SSV/allez-plus-loin" ||
    isCampaignPathname(pathname)
  )
    return null
  return <Navbar realisations={realisations} />
}

export function ConditionalSmoothScroll({ children }: { children: React.ReactNode }) {
  const isStudio = useIsStudio()
  const pathname = usePathname()
  // Pas de scroll inertiel (GSAP + Lenis) sur les LPs Meta : une page de
  // conversion mono-écran n'en a pas besoin, et ça évite de charger la
  // librairie pour rien sur une page optimisée pour le poids transféré.
  if (isStudio || isCampaignPathname(pathname)) return <>{children}</>
  return <SmoothScroll>{children}</SmoothScroll>
}

export function DevAgentation() {
  const isStudio = useIsStudio()
  if (isStudio || process.env.NODE_ENV !== "development") return null
  return <Agentation />
}
