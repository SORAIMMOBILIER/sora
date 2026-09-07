// Traductions FR -> EN écrites à la main pour le contenu Sanity existant
// (réalisations, cartes d'accueil, évènements). Utilisées en priorité par
// translateToEnglish() avant tout appel à l'API Claude — donc ce contenu
// s'affiche en anglais immédiatement, sans clé API ni coût. Quand du
// nouveau contenu est ajouté dans Sanity sans entrée correspondante ici,
// translateToEnglish() retombe sur l'appel Claude (si une clé est
// configurée) ou sur le français (sinon).
//
// Pour mettre à jour une traduction existante ou en ajouter une nouvelle :
// éditer/ajouter l'entrée ci-dessous avec la même clé de cache que
// l'appel translateToEnglish(value, cacheKey) correspondant dans le code.

export const STATIC_EN_OVERRIDES: Record<string, unknown> = {
  "home-carousel-realisations": [
    {
      slug: "seseh",
      location: "Seseh, Bali",
      title: "Seseh Sunset Villas, 300 m from the sea",
      description:
        "A prime location, 300 meters from the sea. The project benefits from a sought-after setting, surrounded by five-star amenities, wellness spaces, dining venues and all everyday conveniences.",
      tags: ["300 m from the sea", "Delivery March 2028", "5★ amenities"],
    },
    {
      slug: "canggu",
      location: "Canggu, Bali",
      title: "Canggu Oasis, 5 villas & 3 lofts, rice-field view",
      description:
        "A set of 5 villas and 3 lofts in the heart of Canggu, one of Bali's most dynamic areas. Rice-field views. The villas are modular, from 1 to 3 bedrooms, and the lofts offer a particularly attractive entry-level option.",
      tags: ["5 villas + 3 lofts", "Delivery September 2026", "1 to 3 bedrooms"],
    },
    {
      slug: "canggu-residence-2024",
      location: "Pererenan, Bali",
      title: "Villa Pererenan, 9 homes",
      description:
        "A set of 9 villas located in a residential neighborhood, 10 minutes from the sea. A project particularly well suited to long-term rental and expat families.",
      tags: ["9 homes", "Delivered 2024", "Long-term rental"],
    },
    {
      slug: "uluwatu",
      location: "Uluwatu, Bali",
      title: "Uluwatu Ocean View, 11 villas with ocean view",
      description:
        "A development of 11 high-end villas with ocean views, from 1 to 3 bedrooms, fully equipped. Uluwatu is currently experiencing strong development momentum, and exclusive properties are especially sought after there. The villas are located 5 minutes from the beaches.",
      tags: ["11 villas", "Delivery March 2026", "1 to 3 bedrooms"],
    },
  ],

  "realisation:canggu": {
    heroEyebrow: "Canggu, Bali / 5 villas + 3 lofts / Delivery September 2026",
    heroTitle: "Canggu Residence.",
    heroSubtitle:
      "5 villas and 3 lofts in the heart of Canggu, one of Bali's most dynamic areas. Rice-field views, modular from 1 to 3 bedrooms.",
    heroCtas: null,
    keyStats: null,
    gammesEyebrow: null,
    gammesTitle: null,
    gammes: null,
    inclus: null,
    projectionsEyebrow: null,
    projectionsTitle: null,
    projectionsDescription: null,
    projections: null,
    projectionStats: null,
    localisationEyebrow: null,
    localisationTitle: null,
    distances: null,
    garantiesEyebrow: null,
    garantiesTitle: null,
    garanties: null,
    dossierEyebrow: null,
    dossierTitle: null,
    dossierDescription: null,
    dossierBullets: null,
  },

  "realisation:uluwatu": {
    heroEyebrow: "Uluwatu, Bali / 11 villas / Delivered March 2026",
    heroTitle: "Uluwatu Ocean.",
    heroSubtitle: "11 high-end villas with ocean views, from 1 to 3 bedrooms, 5 minutes from the beaches.",
    heroCtas: null,
    keyStats: null,
    gammesEyebrow: null,
    gammesTitle: null,
    gammes: null,
    inclus: null,
    projectionsEyebrow: null,
    projectionsTitle: null,
    projectionsDescription: null,
    projections: null,
    projectionStats: null,
    localisationEyebrow: null,
    localisationTitle: null,
    distances: null,
    garantiesEyebrow: null,
    garantiesTitle: null,
    garanties: null,
    dossierEyebrow: null,
    dossierTitle: null,
    dossierDescription: null,
    dossierBullets: null,
  },

  "realisation:canggu-residence-2024": {
    heroEyebrow: "Canggu, Bali / 9 villas / Delivered 2024",
    heroTitle: "Canggu Residence.",
    heroSubtitle:
      "9 villas in a residential neighborhood, 10 minutes from the sea. Suited to long-term rental and expat families.",
    heroCtas: null,
    keyStats: null,
    gammesEyebrow: null,
    gammesTitle: null,
    gammes: null,
    inclus: null,
    projectionsEyebrow: null,
    projectionsTitle: null,
    projectionsDescription: null,
    projections: null,
    projectionStats: null,
    localisationEyebrow: null,
    localisationTitle: null,
    distances: null,
    garantiesEyebrow: null,
    garantiesTitle: null,
    garanties: null,
    dossierEyebrow: null,
    dossierTitle: null,
    dossierDescription: null,
    dossierBullets: null,
  },

  "gamme:seseh:elegance": {
    realisationTitle: "Seseh Sunset Villas, 300 m from the sea",
    realisationLocation: "Seseh, Bali",
    description:
      "An accessible entry point into Bali property ownership, 300 m from the beach. A compact, functional 51 m², one bedroom, a living room opening onto the terrace, jacuzzi and outdoor shower. Ideal for year-round rental use.",
    features: null,
  },
  "gamme:seseh:prestige": {
    realisationTitle: "Seseh Sunset Villas, 300 m from the sea",
    realisationLocation: "Seseh, Bali",
    description:
      "80 m² over two levels, two bedrooms, private pool. A versatile layout designed for a couple with a child, or to maximize high-season rental yield.",
    features: null,
  },
  "gamme:seseh:signature": {
    realisationTitle: "Seseh Sunset Villas, 300 m from the sea",
    realisationLocation: "Seseh, Bali",
    description:
      "153 m² premium, two bedrooms each with an en-suite bathroom, office, separate dining room. The most sought-after villa for family use or high-end rental.",
    features: null,
  },
  "gamme:seseh:exception": {
    realisationTitle: "Seseh Sunset Villas, 300 m from the sea",
    realisationLocation: "Seseh, Bali",
    description:
      "197 m² all-inclusive, three bedrooms, three bathrooms, office, private pool. The most generous offering in the program, built for a second home or premium-clientele rental.",
    features: null,
  },

  "event:webinaire-lybox-sora-investir-a-bali-juillet-2026": {
    title: "Lybox x Sora Webinar — Investing in Bali",
    eyebrow: "REPLAY / Lybox x Sora / 60 min",
    summary:
      "Watch the session again: the Bali rental investment market, unfiltered. Gabriel Lapierre, founder of Sora Immobilier, presents Seseh Sunset Villas: 26 villas 300 meters from the beach.",
    body: null,
    program: [
      { title: "Introduction", description: "Introduction to Sora Immobilier and the Bali real estate market" },
      { title: "The Seseh Sunset Villas project", description: "26 villas, 4 ranges, location, construction schedule" },
      { title: "Financial projections", description: "Returns, taxation, comparison with other investments" },
      { title: "Legal framework", description: "PT PMA, 30+30 leasehold, investment security" },
      { title: "Q&A", description: "Live questions with Gabriel" },
    ],
    speakers: [
      {
        role: "Founder, Sora Immobilier",
        bio: "Based in Bali, Gabriel supports investors in premium Indonesian real estate. Several projects delivered in Canggu and Pererenan.",
      },
      {
        role: "Founder of Lybox",
        bio: "Data Science engineer passionate about tech, finance, real estate and entrepreneurship.\n\nAfter several years in finance and banking, I turned to real estate, both personally and professionally.\n\nI launched LyBox, a real estate SaaS platform with over 100,000 users, on a mission to give every real estate investor the tools they need to make their best investment.",
      },
    ],
    ctaLabel: "Watch the replay",
    finePrint: "Free registration. Replay sent to all registrants.",
  },
}
