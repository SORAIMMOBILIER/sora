// Forme du contenu de la landing page "Maison à Seseh, Bali" — un fichier
// par langue (fr.ts / en.ts), aucune clé de texte en dur dans le composant
// de page. Tant qu'un champ obligatoire d'une langue n'est pas renseigné
// (fichier en.ts vide), la route correspondante renvoie 404 — voir
// src/app/maison-seseh-bali/page.tsx.
//
// Refonte "une information par écran" : chaque section garde son texte
// long d'origine (paragraphs / engagements / etc., repris tels quels
// depuis avant la refonte) comme couche "détail", affichée derrière un
// lien Disclosure. Les nouveaux champs courts (screenLines, cartouches,
// bullets...) sont la couche "écran" lue en premier.

export type Stat = { value: string; label: string }
export type GalleryImage = { src?: string; alt: string; caption?: string }
export type DistanceEntry = { place: string; distance?: string; photoSrc?: string }

export type GammeItem = {
  name: string
  badge?: string
  specLine: string
  gallery: GalleryImage[]
  planImage?: string
  planAlt: string
  priceLabel: string
  priceNote: string
  stats: Stat[]
  features: string[]
}

export type Testimonial = {
  firstName: string
  situation: string
  villa: string
  quote: string
}

export type FaqItem = {
  q: string
  a: string
}

export type AccesStep = {
  title: string
  body: string
}

export type MaisonSesehBaliContent = {
  meta: {
    title: string
    description: string
  }
  nav: {
    switchLabel: string
  }
  footer: {
    disclaimer: string
    mentionsLegalesLabel: string
    contactEmail: string
  }
  // 1. Hero
  hero: {
    overline: string
    title: string
    subtitle: string
    videoUrl?: string
    posterImage: string
    ctaLabel: string
    ctaNote: string
    bandItems: string[]
  }
  // 2. Le bon moment
  section2: {
    overline: string
    title: string
    screenLines: string[]
    paragraphs: string[]
  }
  // 3. La maison (intro courte — les gammes sont dans `models`)
  section3: {
    overline: string
    title: string
    image: string
    screenLines: string[]
    paragraphs: string[]
  }
  // 4. Julie
  julie: {
    overline: string
    title: string
    screenLines: string[]
    image?: string
  }
  // 5 & 6. Modèles (ModelBlock)
  models: GammeItem[]
  modelsNote: string
  modelsCtaLabel: string
  // 7. Les revenus
  section4: {
    overline: string
    title: string
    stats: Stat[]
    screenLine: string
    paragraphs: string[]
  }
  // 8. La gestion
  gestion: {
    overline: string
    title: string
    bullets: string[]
  }
  // 9. La transmission
  section5: {
    overline: string
    title: string
    cartouches: string[]
    paragraphs: string[]
  }
  // 10. L'équipe
  team: {
    overline: string
    title: string
    photo?: string
    quote: string
    name: string
    role: string
    stats: Stat[]
    screenLine: string
    detail: {
      overline: string
      title: string
      paragraphs: string[]
      engagementsIntro: string
      engagements: string[]
    }
  }
  // 11. Témoignages
  section7: {
    overline: string
    title: string
    testimonials: Testimonial[]
    ctaLabel: string
  }
  // 12. L'accès (Timeline)
  section8: {
    overline: string
    title: string
    intro: string
    steps: AccesStep[]
  }
  // 13. Le lieu (DistanceList)
  lieu: {
    overline: string
    title: string
    entries: DistanceEntry[]
  }
  // 14. Bali en 2027 (le marché)
  section10: {
    overline: string
    title: string
    screenLines: string[]
    ctaLabel: string
    paragraphs: string[]
    priceChangeNote: string
    sources: { label: string; url?: string }[]
  }
  // 15. Questionnaire
  section11: {
    overline: string
    title: string
    embedCode?: string
  }
  // 16. FAQ
  section9: {
    overline: string
    title: string
    items: FaqItem[]
  }
  stickyBar: {
    ctaLabel: string
  }
}
