import { NextResponse } from "next/server"

// Fichier volumineux (~25 Mo) : on redirige vers l'asset statique public,
// servi directement par le CDN sans passer par une fonction serverless
// (évite les limites de taille de réponse des fonctions Node).
export async function GET(request: Request) {
  return NextResponse.redirect(
    new URL("/SESEH_SUNSET_VILLAS_Projection_Financiere_FR.pdf", request.url),
    307,
  )
}
