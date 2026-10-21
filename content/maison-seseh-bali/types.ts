// Forme du contenu de la landing page "Maison à Seseh, Bali" — un fichier
// par langue (fr.ts / en.ts), aucune clé de texte en dur dans le composant
// de page. Tant qu'un champ obligatoire d'une langue n'est pas renseigné
// (fichier en.ts vide), la route correspondante renvoie 404 — voir
// src/app/maison-seseh-bali/page.tsx.

export type GammeItem = {
  name: string
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
    switchLabel: string // ex: "FR" ou "EN" — le libellé de la langue VERS laquelle on bascule
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
  }
  section3: {
    overline: string
    title: string
    paragraphs: string[]
    gammesIntro: string
    gammes: GammeItem[]
    images: { src: string; alt: string }[]
    confidentialNote: string
    ctaLabel: string
  }
  section4: {
    overline: string
    title: string
    paragraphs: string[]
  }
  section5: {
    overline: string
    title: string
    paragraphs: string[]
  }
  section6: {
    overline: string
    title: string
    paragraphs: string[]
    engagementsIntro: string
    engagements: string[]
  }
  section7: {
    overline: string
    title: string
    testimonials: Testimonial[]
    ctaLabel: string
  }
  section8: {
    overline: string
    title: string
    intro: string
    steps: AccesStep[]
  }
  section9: {
    overline: string
    title: string
    items: FaqItem[]
  }
  section10: {
    overline: string
    title: string
    paragraphs: string[]
    priceChangeNote: string
    ctaLabel: string
    sources: { label: string; url?: string }[]
  }
  section11: {
    overline: string
    title: string
    embedCode?: string
  }
  stickyBar: {
    ctaLabel: string
  }
}
