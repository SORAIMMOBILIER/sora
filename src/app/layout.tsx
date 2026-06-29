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

const title = "SORA Immobilier | Investissez à Bali dès 10 000€"
const description = "Accédez à l'immobilier balinais dès 10 000 €, avec un montage encadré, une gestion locale déléguée et des performances documentées."
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
const siteUrl = new URL(vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
const ogImageUrl = new URL("/og-image.jpg", siteUrl)
const faviconUrl = new URL("/favicon.ico", siteUrl)

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  icons: {
    icon: [{ url: faviconUrl }],
    shortcut: [{ url: faviconUrl }],
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "SORA Immobilier",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 675,
        alt: "SORA Immobilier, investir à Bali dès 10 000€",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImageUrl],
  },
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
