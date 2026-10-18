// Données structurées schema.org (JSON-LD) : des blocs invisibles pour les
// visiteurs, mais que Google lit pour comprendre "ceci est une entreprise",
// "ceci est une personne", "ceci est une FAQ" — utile pour les recherches
// "SORA Immobilier" / "SORA Bali" et "Nitham Lapierre" notamment.

// Même source que src/app/layout.tsx / robots.ts / sitemap.ts : une seule
// adresse canonique pour tout le site (voir la note dans robots.ts).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sora-immobilier.com"

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "SORA Immobilier",
    "legalName": "PT FIVE BLOOM INTERNATIONAL",
    "url": SITE_URL,
    "logo": `${SITE_URL}/sora-logo.svg`,
    "image": `${SITE_URL}/og-image.jpg`,
    "email": "contact@sora-immobilier.com",
    "telephone": "+33633517746",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jalan Raya Semat N°17B, Tibubeneng",
      "addressLocality": "Bali",
      "postalCode": "80361",
      "addressCountry": "ID",
    },
    "sameAs": [
      "https://www.instagram.com/gabriel_lapierre_/",
      "https://linkedin.com/in/gabriel-lapierre",
      "https://www.youtube.com/@GABRIEL_LAPIERRE",
    ],
    "founder": [
      { "@id": `${SITE_URL}/fondateurs#gabriel-lapierre` },
      { "@id": `${SITE_URL}/fondateurs#nitham-lapierre` },
    ],
  }
}

// NITHAM_LINKEDIN_URL : aucun lien LinkedIn pour Nitham n'a été trouvé
// dans le code existant (seul celui de Gabriel y figure). Emplacement
// prêt — Steven le complètera, puis "sameAs" l'inclura automatiquement.
const NITHAM_LINKEDIN_URL: string | null = null

export function founderPersonsJsonLd(locale: "fr" | "en") {
  const gabrielRole = locale === "en" ? "Co-founder and CEO" : "Co-fondateur et directeur général"
  const nithamRole = locale === "en" ? "Co-founder and Head of Development" : "Co-fondatrice et directrice du développement"
  const founderUrl = locale === "en" ? `${SITE_URL}/en/founders` : `${SITE_URL}/fondateurs`

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/fondateurs#gabriel-lapierre`,
      "name": "Gabriel Lapierre",
      "jobTitle": gabrielRole,
      "image": `${SITE_URL}/gabriel-lapierre.webp`,
      "url": founderUrl,
      "worksFor": { "@type": "Organization", "name": "SORA Immobilier", "url": SITE_URL },
      "sameAs": ["https://linkedin.com/in/gabriel-lapierre"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/fondateurs#nitham-lapierre`,
      "name": "Nitham Lapierre",
      "jobTitle": nithamRole,
      "image": `${SITE_URL}/nitham-lapierre.webp`,
      "url": founderUrl,
      "worksFor": { "@type": "Organization", "name": "SORA Immobilier", "url": SITE_URL },
      ...(NITHAM_LINKEDIN_URL ? { "sameAs": [NITHAM_LINKEDIN_URL] } : {}),
    },
  ]
}

export function faqPageJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  }
}
