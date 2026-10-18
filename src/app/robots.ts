import type { MetadataRoute } from "next"

// Même adresse canonique que layout.tsx / sitemap.ts / structured-data.ts
// — avant, ce fichier retombait sur "sora-immobilier.com" (sans www) si
// jamais la variable d'environnement n'était pas définie, alors que
// layout.tsx retombait sur une URL de preview Vercel : deux adresses
// différentes pour le même site. Voir sitemap.ts pour le même correctif.
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.sora-immobilier.com")

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio/", "/merci", "/merci/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl.origin,
  }
}
