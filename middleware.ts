import { NextRequest, NextResponse } from "next/server"

// Détecte le préfixe /en dans l'URL demandée AVANT que next.config.ts ne
// réécrive silencieusement /en/xxx vers /xxx (même page, même fichier —
// voir next.config.ts). Rien d'autre ne change : le français garde ses
// URLs actuelles telles quelles.
//
// La langue est transmise au rendu serveur via un EN-TÊTE de requête
// (x-locale), pas via un cookie : un en-tête posé ici avec
// NextResponse.next({ request }) est garanti disponible dans les Server
// Components dès la toute première requête (mécanisme documenté
// Next.js), alors qu'un cookie posé sur la réponse n'est garanti que
// pour les requêtes SUIVANTES. La langue est donc déterminée uniquement
// par l'URL demandée, de façon fiable dès la première visite (important
// pour Googlebot, qui ne rejoue jamais une deuxième requête pour
// "recevoir" un cookie).
//
// Le cookie NEXT_LOCALE est conservé en plus, uniquement comme mémoire
// de confort pour un futur usage côté navigateur — il n'est plus lu nulle
// part pour décider de la langue affichée.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/")
  const locale = isEnglish ? "en" : "fr"

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-locale", locale)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
  return response
}

export const config = {
  matcher: ["/((?!_next|studio|api|.*\\..*).*)"],
}
