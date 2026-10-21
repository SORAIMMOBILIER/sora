// Forme du contenu de la landing page "Villa à Seseh, Bali" (page B) — même
// principe que content/maison-seseh-bali : un fichier par langue, aucun
// texte en dur dans le composant de page. en.ts vide -> 404 sur la route EN.

export type IconBlock = {
  icon: "price" | "shield"
  title: string
  body: string
}

export type GammeItem = {
  name: string
  badge?: string
  specsLines: string[]
  priceBeforeLabel: string
  priceAfterLabel: string
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

export type GuaranteeItem = {
  title: string
  body: string
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
  section2: {
    overline: string
    title: string
    paragraphs: string[]
    eligibilityNote: string
    blocks: IconBlock[]
    closingParagraph: string
  }
  section3: {
    overline: string
    title: string
    facts: string[]
  }
  section4: {
    overline: string
    title: string
    testimonials: Testimonial[]
    ctaLabel: string
  }
  section5: {
    overline: string
    title: string
    gammes: GammeItem[]
    priceIncludesText: string
    previsionnelText: string
    images: { src: string; alt: string }[]
    ctaLabel: string
    offSeseh: {
      overline: string
      title: string
      text: string
    }
  }
  section6: {
    overline: string
    title: string
    paragraphs: string[]
    links: { label: string; anchor: string }[]
  }
  section7: {
    overline: string
    title: string
    neverList: string[]
    paragraph: string
  }
  section8: {
    overline: string
    title: string
    guarantees: GuaranteeItem[]
    ctaLabel: string
  }
  section9: {
    overline: string
    title: string
    intro: string
    steps: Step[]
  }
  section10: {
    overline: string
    title: string
    items: FaqItem[]
  }
  section11: {
    overline: string
    title: string
    paragraphs: string[]
    ctaLabel: string
    sources: { label: string; url?: string }[]
  }
  section12: {
    overline: string
    title: string
    embedCode?: string
  }
  stickyBar: {
    ctaLabel: string
  }
}
