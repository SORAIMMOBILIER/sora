import type { Metadata } from "next"
import localFont from "next/font/local"
import SmoothScroll from "@/components/smooth-scroll"
import Navbar from "@/components/layout/navbar"
import TopLanguette from "@/components/layout/top-languette"
import "./globals.css"

const nohemi = localFont({
  src: [
    { path: "../../public/fonts/Nohemi-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Nohemi-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Nohemi-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Nohemi-SemiBold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-nohemi",
  display: "swap",
})

const mori = localFont({
  src: [
    { path: "../../public/fonts/PPMori-Book.otf", weight: "350", style: "normal" },
    { path: "../../public/fonts/PPMori-BookItalic.otf", weight: "350", style: "italic" },
    { path: "../../public/fonts/PPMori-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/PPMori-Italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/PPMori-Semibold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-mori",
  display: "swap",
})


export const metadata: Metadata = {
  title: "SORA Immobilier | Investissez à Bali dès 10 000€",
  description: "Accédez aux meilleurs projets immobiliers de Bali. Villas premium, 13% de rendement net, gestion 100% déléguée.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${nohemi.variable} ${mori.variable}`}>
      <body>
        <SmoothScroll>
          <Navbar />
          <TopLanguette />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
