"use client"
import { usePathname } from "next/navigation"
import Navbar, { type NavRealisation } from "./navbar"
import SmoothScroll from "@/components/smooth-scroll"

export function useIsStudio() {
  const pathname = usePathname()
  return !!pathname?.startsWith("/studio")
}

export function SiteChrome({ realisations }: { realisations: NavRealisation[] }) {
  const isStudio = useIsStudio()
  const pathname = usePathname()
  // Pas de navbar sur la VSL ni sur la LP Meta "maison-seseh-bali" : funnel
  // fermé, un seul CTA. usePathname() reflète l'URL demandée par le
  // navigateur (/en/home-seseh-bali), pas la destination réécrite en
  // interne — on liste donc les deux adresses, FR et EN.
  if (
    isStudio ||
    pathname === "/villas-ssv" ||
    pathname === "/merci" ||
    pathname === "/SSV/allez-plus-loin" ||
    pathname === "/maison-seseh-bali" ||
    pathname === "/en/home-seseh-bali"
  )
    return null
  return <Navbar realisations={realisations} />
}

export function ConditionalSmoothScroll({ children }: { children: React.ReactNode }) {
  const isStudio = useIsStudio()
  if (isStudio) return <>{children}</>
  return <SmoothScroll>{children}</SmoothScroll>
}

export function DevAgentation({ children }: { children: React.ReactNode }) {
  const isStudio = useIsStudio()
  if (isStudio) return null
  return <>{children}</>
}
