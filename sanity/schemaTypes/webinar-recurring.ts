import { defineField, defineType } from "sanity"

export const webinarRecurring = defineType({
  name: "webinarRecurring",
  title: "Webinaire récurrent",
  type: "document",
  description: "Un seul document de ce type : le webinaire hebdomadaire du mardi. La date affichée est calculée automatiquement (mardi 18h Europe/Paris), jamais saisie ici.",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Exemple : Webinaire hebdomadaire",
    }),
    defineField({
      name: "summary",
      title: "Résumé",
      type: "text",
      rows: 4,
      description: "Copie AMF friendly : localisation, nombre de villas, prix d'entrée, livraison. Pas de rendement, performance ou revenus locatifs.",
      validation: (r) => r.required().max(400),
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
      description: "Utilisée sur la page d'inscription et sur la carte de la page d'accueil.",
    }),
    defineField({
      name: "villasDisponibles",
      title: "Villas disponibles",
      type: "number",
      description: "Nombre de villas encore disponibles sur les 26 (sert d'élément d'urgence, à mettre à jour manuellement).",
      validation: (r) => r.min(0).max(26),
    }),
    defineField({
      name: "meetLink",
      title: "Lien Google Meet",
      type: "url",
      description: "Jamais affiché sur le site public. Réservé à l'automation email d'envoi du lien aux inscrits.",
    }),
    defineField({
      name: "replayUrl",
      title: "URL replay",
      type: "url",
      description: "Lien vers l'enregistrement de la dernière session, affiché sur /replay. À mettre à jour chaque semaine.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Webinaire récurrent" }
    },
  },
})
