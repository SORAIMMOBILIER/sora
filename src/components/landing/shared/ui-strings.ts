// Micro-copie d'interface partagée par les deux pages de campagne (pas du
// contenu marketing — des libellés structurels comme "En savoir plus" ou
// le texte des visuels en attente). Centralisé ici pour éviter de la
// dupliquer dans chaque composant ; chaque page lit la bonne langue via
// son propre `locale` et la transmet aux blocs.
export type UiStrings = {
  imagePending: string
  learnMore: string
  learnLess: string
  testimonialPending: string
}

export const UI_STRINGS: Record<"fr" | "en", UiStrings> = {
  fr: {
    imagePending: "Image en attente",
    learnMore: "En savoir plus",
    learnLess: "Réduire",
    testimonialPending: "Témoignage en attente",
  },
  en: {
    imagePending: "Image pending",
    learnMore: "Learn more",
    learnLess: "Show less",
    testimonialPending: "Testimonial pending",
  },
}
