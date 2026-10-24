// Forme du contenu de la landing page "Maison à Seseh, Bali" — un fichier
// par langue (fr.ts / en.ts), aucune clé de texte en dur dans le composant
// de page. Tant qu'un champ obligatoire d'une langue n'est pas renseigné
// (fichier en.ts vide), la route correspondante renvoie 404 — voir
// src/app/maison-seseh-bali/page.tsx.
//
// Refonte "une information par écran" : chaque section garde son texte
// long d'origine (paragraphs / engagements / etc.) comme couche "détail" —
// affichée derrière un lien Disclosure seulement sous les blocs 3
// (Le bon moment), 8 (Les revenus), 9 (Les garanties) et 10 (La
// transmission). Les nouveaux champs courts (rows, screenLines...) sont
// la couche "écran" lue en premier. Certains champs (gestion.bullets,
// section3.paragraphs, julie.screenLines...) restent dans ce fichier sans
// plus être affichés directement — conservés tels quels, rien n'est
// supprimé.

export type Stat = { value: string; label: string }
export type Row = { label: string; value: string }
export type GalleryImage = { src?: string; alt: string; caption?: string }
export type DistanceEntry = { place: string; distance?: string; photoSrc?: string }
export type HeroImage = { src: string; alt: string }

export type GammeItem = {
  name: string
  badge?: string
  specLine: string
  priceLineSpec?: string // repli : specLine si absent (EN pas encore mis à jour)
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
  // 1. Hero (vidéo)
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
  // 3. Le bon moment
  section2: {
    overline: string
    title: string
    screenLines: string[]
    paragraphs: string[]
  }
  // 4. La maison (pas de Disclosure). rows absent (EN) -> repli sur
  // screenLines affichées en texte simple, comme avant cette révision.
  section3: {
    overline: string
    title: string
    image: string
    imageCaption: string
    screenLines: string[]
    rows?: Row[]
    paragraphs: string[]
  }
  // 5. L'intérieur (Julie). Champs optionnels absents (EN) -> repli sur
  // l'ancien bloc "portrait + 2 lignes", comme avant cette révision.
  julie: {
    overline: string
    title: string
    screenLines: string[]
    screenLine?: string
    image?: string
    imageCaption: string
    gallery?: GalleryImage[]
    rows?: Row[]
    disclaimerLine?: string
  }
  // 6 & 7. Modèles (ModelBlock)
  models: GammeItem[]
  modelsOverline?: string // repli : section3.overline si absent
  modelsNote: string
  modelsCtaLabel: string
  modelsPriceNote: string
  // 8. Les revenus. rows absent (EN) -> repli sur screenLine, comme avant.
  section4: {
    overline: string
    title: string
    stats: Stat[]
    screenLine: string
    rows?: Row[]
    paragraphs: string[]
  }
  // ancien bloc "La gestion" — plus affiché séparément (absorbé dans Les
  // revenus), conservé tel quel
  gestion: {
    overline: string
    title: string
    bullets: string[]
  }
  // 9. Les garanties (nouveau bloc, absent en EN pour l'instant -> bloc
  // non affiché tant que non renseigné)
  garanties?: {
    overline: string
    title: string
    rows: Row[]
  }
  // 10. La transmission
  section5: {
    overline: string
    title: string
    cartouches: string[]
    rows: Row[]
    paragraphs: string[]
  }
  // 11. Venir à Bali (nouveau bloc, absent en EN pour l'instant -> bloc
  // non affiché tant que non renseigné)
  venirABali?: {
    overline: string
    title: string
    image?: string
    imageCaption: string
    rows: Row[]
  }
  // 12. L'équipe
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
  // 13. Témoignages
  section7: {
    overline: string
    title: string
    testimonials: Testimonial[]
    ctaLabel: string
  }
  // 14. L'accès (Timeline)
  section8: {
    overline: string
    title: string
    intro: string
    steps: AccesStep[]
  }
  // 15. Le lieu (DistanceList)
  lieu: {
    overline: string
    title: string
    entries: DistanceEntry[]
  }
  // 16. Bali en 2027 (le marché)
  section10: {
    overline: string
    title: string
    screenLines: string[]
    rows: Row[]
    ctaLabel: string
    paragraphs: string[]
    priceChangeNote: string
    sources: { label: string; url?: string }[]
  }
  // 17. Entretien
  section11: {
    overline: string
    title: string
    embedCode?: string
  }
  // 18. FAQ
  section9: {
    overline: string
    title: string
    items: FaqItem[]
  }
  stickyBar: {
    ctaLabel: string
  }
}
