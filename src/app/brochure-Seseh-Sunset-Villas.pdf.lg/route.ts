import { NextResponse } from "next/server"

// Ancienne adresse — redirige vers la nouvelle (permanente, pour que les
// liens déjà partagés continuent de fonctionner).
export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/brochures/seseh/download", request.url), 308)
}
