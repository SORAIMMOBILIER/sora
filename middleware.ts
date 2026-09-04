import { NextRequest, NextResponse } from "next/server"

// Détecte le préfixe /en dans l'URL demandée et pose un cookie de langue
// AVANT que next.config.ts ne réécrive silencieusement /en/xxx vers /xxx
// (même page, même fichier — voir next.config.ts). Rien d'autre ne
// change : le français garde ses URLs actuelles telles quelles.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/")
  const response = NextResponse.next()
  response.cookies.set("NEXT_LOCALE", isEnglish ? "en" : "fr", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
  return response
}

export const config = {
  matcher: ["/((?!_next|studio|api|.*\\..*).*)"],
}
