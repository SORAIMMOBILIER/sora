import { defineArrayMember, defineField, defineType } from "sanity"

export const realisation = defineType({
  name: "realisation",
  title: "Réalisation",
  type: "document",
  groups: [
    { name: "carousel", title: "Card carousel" },
    { name: "hero", title: "Hero" },
    { name: "stats", title: "Stats clés" },
    { name: "gammes", title: "Gammes" },
    { name: "projections", title: "Projections" },
    { name: "localisation", title: "Localisation" },
    { name: "garanties", title: "Garanties" },
    { name: "dossier", title: "Formulaire dossier" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Statut",
      type: "string",
      options: {
        list: [
          { title: "En cours", value: "en-cours" },
          { title: "Prochainement", value: "prochainement" },
          { title: "Livré", value: "livre" },
        ],
        layout: "radio",
      },
      initialValue: "en-cours",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      description: "Ordre d'affichage dans le carousel (plus petit = plus tôt)",
      initialValue: 0,
    }),

    // Card carousel
    defineField({
      name: "location",
      title: "Localisation",
      type: "string",
      description: "Exemple : Seseh, Bali",
      group: "carousel",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "priceLabel",
      title: "Prix affiché",
      type: "string",
      description: "Exemple : Villas dès 129 000 € · Co-invest. dès 20 000 €",
      group: "carousel",
    }),
    defineField({
      name: "cardTitle",
      title: "Titre carte",
      type: "string",
      description: "Titre court affiché sur la carte carousel",
      group: "carousel",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cardDescription",
      title: "Description carte",
      type: "text",
      rows: 4,
      group: "carousel",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Image carte",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
      group: "carousel",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Badges affichés sous la description (ex : 300 m de la mer)",
      group: "carousel",
    }),

    // Hero
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow hero",
      type: "string",
      description: "Exemple : Seseh, Bali / 26 villas / Livraison mars 2028",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Titre hero",
      type: "string",
      description: "Grand titre de la page projet",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sous-titre hero",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Image hero",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
      group: "hero",
    }),
    defineField({
      name: "heroCtas",
      title: "CTAs hero",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "Lien", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "variant",
              title: "Style",
              type: "string",
              options: {
                list: [
                  { title: "Principal noir", value: "default" },
                  { title: "Principal crème", value: "inverse" },
                  { title: "Contour noir", value: "outline" },
                  { title: "Contour crème", value: "outline-inverse" },
                ],
              },
              initialValue: "default",
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
      group: "hero",
    }),

    // Stats clés
    defineField({
      name: "keyStats",
      title: "Stats clés",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Valeur", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      group: "stats",
    }),

    // Gammes
    defineField({
      name: "gammesEyebrow",
      title: "Eyebrow gammes",
      type: "string",
      group: "gammes",
    }),
    defineField({
      name: "gammesTitle",
      title: "Titre section gammes",
      type: "string",
      group: "gammes",
    }),
    defineField({
      name: "gammes",
      title: "Gammes",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              options: { source: "name", maxLength: 40 },
              description: "Utilisé dans l'URL (ex : elegance)",
            }),
            defineField({ name: "price", title: "Prix", type: "string" }),
            defineField({ name: "surface", title: "Surface", type: "string" }),
            defineField({ name: "bedrooms", title: "Chambres", type: "string" }),
            defineField({ name: "bathrooms", title: "Salles de bain", type: "string" }),
            defineField({ name: "revenue", title: "Revenus annuels", type: "string" }),
            defineField({ name: "yield", title: "Rendement", type: "string" }),
            defineField({ name: "pool", title: "Piscine / jacuzzi", type: "string" }),
            defineField({
              name: "image",
              title: "Image de couverture",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
            }),
            defineField({
              name: "description",
              title: "Description longue",
              type: "text",
              rows: 4,
              description: "Affichée sur la page détail de la gamme",
            }),
            defineField({
              name: "planKey",
              title: "Identifiant plan",
              type: "string",
              description: "Nom du composant React de plan (ex : elegance, prestige, signature, exception)",
            }),
            defineField({
              name: "roomsRdc",
              title: "Pièces RDC",
              type: "array",
              of: [{ type: "string" }],
              description: "Liste des pièces affichées sur le plan RDC",
            }),
            defineField({
              name: "roomsEtage",
              title: "Pièces Étage",
              type: "array",
              of: [{ type: "string" }],
              description: "Liste des pièces affichées sur le plan Étage",
            }),
            defineField({
              name: "features",
              title: "Prestations incluses",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "gallery",
              title: "Galerie photos",
              type: "array",
              of: [
                defineArrayMember({
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    { name: "alt", type: "string", title: "Texte alternatif" },
                    { name: "room", type: "string", title: "Pièce", description: "Ex : living, kitchen, bedroom — pour relier à une zone du plan" },
                  ],
                }),
              ],
            }),
            defineField({
              name: "vrUrl",
              title: "URL visite virtuelle 360°",
              type: "url",
            }),
            defineField({
              name: "preReserveUrl",
              title: "URL pré-réservation",
              type: "url",
              initialValue: "https://bit.ly/sora-immobilier",
            }),
          ],
          preview: { select: { title: "name", subtitle: "price", media: "image" } },
        }),
      ],
      group: "gammes",
    }),
    defineField({
      name: "inclus",
      title: "Inclus dans chaque villa",
      type: "array",
      of: [{ type: "string" }],
      group: "gammes",
    }),
    defineField({
      name: "inclusImage",
      title: "Image bloc inclus",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
      group: "gammes",
    }),

    // Projections
    defineField({
      name: "projectionsEyebrow",
      title: "Eyebrow projections",
      type: "string",
      group: "projections",
    }),
    defineField({
      name: "projectionsTitle",
      title: "Titre projections",
      type: "string",
      group: "projections",
    }),
    defineField({
      name: "projectionsDescription",
      title: "Description projections",
      type: "text",
      rows: 2,
      group: "projections",
    }),
    defineField({
      name: "projections",
      title: "Comparatif rendement",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "rendement", title: "Rendement", type: "string" }),
            defineField({ name: "ratio", title: "Ratio", type: "string" }),
            defineField({ name: "highlight", title: "Mettre en avant", type: "boolean", initialValue: false }),
          ],
          preview: { select: { title: "label", subtitle: "rendement" } },
        }),
      ],
      group: "projections",
    }),
    defineField({
      name: "projectionStats",
      title: "Stats projections complémentaires",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Valeur", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      group: "projections",
    }),

    // Localisation
    defineField({
      name: "localisationEyebrow",
      title: "Eyebrow localisation",
      type: "string",
      group: "localisation",
    }),
    defineField({
      name: "localisationTitle",
      title: "Titre localisation",
      type: "string",
      group: "localisation",
    }),
    defineField({
      name: "distances",
      title: "Distances / points d'intérêt",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Distance ou durée", type: "string" }),
            defineField({ name: "label", title: "Point d'intérêt", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      group: "localisation",
    }),

    // Garanties
    defineField({
      name: "garantiesEyebrow",
      title: "Eyebrow garanties",
      type: "string",
      group: "garanties",
    }),
    defineField({
      name: "garantiesTitle",
      title: "Titre garanties",
      type: "string",
      group: "garanties",
    }),
    defineField({
      name: "garanties",
      title: "Garanties",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Durée", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Type de garantie", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      group: "garanties",
    }),

    // Dossier form
    defineField({
      name: "dossierEyebrow",
      title: "Eyebrow dossier",
      type: "string",
      group: "dossier",
    }),
    defineField({
      name: "dossierTitle",
      title: "Titre dossier",
      type: "string",
      group: "dossier",
    }),
    defineField({
      name: "dossierDescription",
      title: "Description dossier",
      type: "text",
      rows: 3,
      group: "dossier",
    }),
    defineField({
      name: "dossierBullets",
      title: "Bullets dossier",
      type: "array",
      of: [{ type: "string" }],
      group: "dossier",
    }),
    defineField({
      name: "dossierImage",
      title: "Image dossier",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
      group: "dossier",
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "metaTitle", title: "Meta title", type: "string", validation: (r) => r.max(70) },
        { name: "metaDescription", title: "Meta description", type: "text", rows: 2, validation: (r) => r.max(170) },
        { name: "ogImage", title: "Image Open Graph", type: "image" },
      ],
    }),
  ],
  orderings: [
    { title: "Ordre manuel", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Titre A-Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "cardTitle", status: "status", media: "cardImage" },
    prepare({ title, status, media }) {
      const statusLabels: Record<string, string> = {
        "en-cours": "En cours",
        "prochainement": "Prochainement",
        "livre": "Livré",
      }
      return {
        title,
        media,
        subtitle: statusLabels[status] || status,
      }
    },
  },
})
