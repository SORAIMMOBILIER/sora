// Forme du contenu de la landing page "Villa à Seseh, Bali" (page B) — même
// principe que content/maison-seseh-bali : un fichier par langue, aucun
// texte en dur dans le composant de page. en.ts vide -> 404 sur la route EN.
//
// Refonte "une information par écran" : chaque section garde son texte
// long d'origine comme couche "détail" (Disclosure). Les nouveaux champs
// courts sont la couche "écran" lue en premier.

export type Stat = { value: string; label: string }
export type Row = { label: string; value: string }
export type GalleryImage = { src?: string; alt: string; caption?: string }
export type DistanceEntry = { place: string; distance?: string; photoSrc?: string }
export type HeroImage = { src: string; alt: string }

export type IconBlock = {
  icon?: "price" | "shield"
  title: string
  body: string
}

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
  rows: Row[]
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

export type Step = {
  title: string
  body: string
}

export type PaymentStep = {
  value: string
  title: string
  body: string
}

export type GuaranteeItem = {
  title: string
  body: string
  short: string
}

export type VillaSesehBaliContent = {
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
    heroImages: HeroImage[]
    ctaLabel: string
    ctaNote: string
    bandItems: string[]
  }
  // 2. L'étape suivante
  section2: {
    overline: string
    title: string
    subhead: string
    screenLines: string[]
    blocks: IconBlock[]
    screenClosingLine: string
    eligibilityNote: string
    paragraphs: string[]
    closingParagraph: string
  }
  // 3. Nos chiffres
  section3: {
    overline: string
    title: string
    stats: Stat[]
    resaleCartouches: string[]
    resaleRows: Row[]
    facts: string[]
  }
  // 4. Témoignages
  section4: {
    overline: string
    title: string
    testimonials: Testimonial[]
    ctaLabel: string
  }
  // 5 & 6. Villas + 7. Encart hors Seseh
  section5: {
    overline: string
    title: string
    gammes: GammeItem[]
    priceIncludesText: string
    previsionnelText: string
    priceNote: string
    ctaLabel: string
    offSeseh: {
      overline: string
      title: string
      text: string
    }
  }
  // 8. Le prix
  section6: {
    overline: string
    title: string
    screenLines: string[]
    paragraphs: string[]
    links: { label: string; anchor: string }[]
  }
  // 9. La gestion
  section7: {
    overline: string
    title: string
    neverList: string[]
    screenLine: string
    paragraph: string
  }
  // 10. Les garanties
  section8: {
    overline: string
    title: string
    guarantees: GuaranteeItem[]
    ctaLabel: string
  }
  // 11. Paiement (Timeline)
  paiement: {
    overline: string
    title: string
    steps: PaymentStep[]
    detail: {
      overline: string
      title: string
      intro: string
      steps: Step[]
    }
  }
  // 12. L'équipe (même contenu que la page A)
  team: {
    overline: string
    title: string
    photo?: string
    photoCaption: string
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
  // 13. Le lieu (même contenu que la page A)
  lieu: {
    overline: string
    title: string
    entries: DistanceEntry[]
  }
  // 14. Bali en 2027
  section11: {
    overline: string
    title: string
    screenLines: string[]
    rows: Row[]
    paragraphs: string[]
    ctaLabel: string
    sources: { label: string; url?: string }[]
  }
  // 15. Éligibilité
  section12: {
    overline: string
    title: string
    embedCode?: string
  }
  // 16. FAQ
  section10: {
    overline: string
    title: string
    items: FaqItem[]
  }
  stickyBar: {
    ctaLabel: string
  }
}
