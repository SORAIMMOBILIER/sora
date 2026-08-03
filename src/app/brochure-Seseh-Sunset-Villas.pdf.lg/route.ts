import { readFile } from "fs/promises"
import path from "path"
import { NextResponse } from "next/server"

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "SESEH_SUNSET_VILLAS_Brochure_FR_WA.pdf")
  const file = await readFile(filePath)

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="SESEH_SUNSET_VILLAS_Brochure_FR_WA.pdf"',
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
