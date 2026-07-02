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
      title: "Auteur",
      type: "string",
      description: "Prénom, nom ou pseudonyme (optionnel)",
    }),
    defineField({
      name: "role",
      title: "Rôle / contexte",
      type: "string",
      description: "Exemple : Investisseur Seseh · Client depuis 2024",
    }),
    defineField({
      name: "image",
      title: "Image de fond",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
      validation: (r) => r.required(),
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
