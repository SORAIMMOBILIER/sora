import { League_Spartan, Montserrat } from "next/font/google"

// Polices mesurées sur https://tasvanlombok.com (voir docs/tasvan-tokens.md)
// — chargées ici, localement à cette page, pas dans le layout racine :
// aucune autre page du site n'en hérite.
export const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-league-spartan",
  display: "swap",
})

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
})

export const FONT_VARS = `${leagueSpartan.variable} ${montserrat.variable}`
