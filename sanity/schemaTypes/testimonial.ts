import { defineField, defineType } from "sanity"

export const testimonial = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Citation",
      type: "text",
      rows: 4,
      validation: (r) => r.required().max(400),
    }),
    defineField({
      name: "author",
      title: "Prénom et nom",
      type: "string",
      description: "Exemple : Gabriel Lapierre",
    }),
    defineField({
      name: "role",
      title: "Rôle / contexte",
      type: "string",
      description: "Optionnel. Exemple : Investisseur Seseh · Client depuis 2024",
    }),
    defineField({
      name: "videoUrlDesktop",
      title: "Vidéo horizontale (ordinateur)",
      type: "url",
      description: "Optionnel. Lien direct vers le fichier vidéo (.mp4) au format horizontal, affiché sur ordinateur.",
    }),
    defineField({
      name: "videoUrlMobile",
      title: "Vidéo verticale (téléphone)",
      type: "url",
      description: "Optionnel. Lien direct vers le fichier vidéo (.mp4) au format vertical, affiché sur téléphone.",
    }),
    defineField({
      name: "image",
      title: "Photo / image de fond",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
      description: "Si une vidéo est renseignée, sert de vignette. Sinon, sert de fond à la citation.",
    }),
    defineField({
      name: "order",
      title: "Ordre",
      type: "number",
      description: "Ordre d'affichage (plus petit = plus tôt)",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Mis en avant",
      type: "boolean",
      initialValue: true,
      description: "Décochez pour masquer sans supprimer",
    }),
  ],
  orderings: [
    { title: "Ordre manuel", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "quote", subtitle: "author", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title: title ? title.slice(0, 60) + (title.length > 60 ? "…" : "") : "Sans citation",
        subtitle,
        media,
      }
    },
  },
})
