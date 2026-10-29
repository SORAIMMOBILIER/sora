import type { QuestionnaireConfig } from "../src/components/landing/tasvan/questionnaire/types"

// Textes définitifs du questionnaire natif. Les ids de champs (modele,
// projet, horizon, budget, fonds, experience) sont ceux déjà mémorisés
// par le trigger GoHighLevel (requête d'exemple validée le 30/10) — ne
// jamais les renommer, seuls les libellés affichés et les options
// changent. Les valeurs envoyées au webhook sont les libellés d'option
// tels quels.

const horizonOptions = ["Dans les 3 mois", "Dans 3 à 6 mois", "Dans 6 à 12 mois", "Dans plus d'un an"]
const fondsOptions = ["Oui, disponible", "Dans les 6 mois, vente ou cession en cours", "Dans plus d'un an", "Je prévois un financement"]
const experienceOptions = ["Oui, en France", "Oui, à l'étranger", "Oui, en France et à l'étranger", "Non, ce serait mon premier investissement"]
const projetOptions = ["Une résidence secondaire, à vivre en famille", "Un investissement locatif", "Les deux"]

export const questionnaireA: QuestionnaireConfig = {
  page: "LP-A",
  pageSlug: "maison-seseh-bali",
  itemLabel: "maison",
  introLine: "Quelques questions pour préparer l'entretien. Deux minutes.",
  modelStep: {
    id: "modele",
    kind: "choice",
    question: "Quelle maison vous intéresse ?",
    options: ["Exception", "Signature", "Prestige", "Élégance", "Je ne sais pas encore"],
  },
  questions: [
    { id: "projet", kind: "choice", question: "Qu'est-ce qui vous attire dans une maison à Bali ?", options: projetOptions },
    { id: "horizon", kind: "choice", question: "Quand souhaiteriez-vous acheter ?", options: horizonOptions },
    {
      id: "budget",
      kind: "choice",
      question: "Quel budget pouvez-vous consacrer à ce projet ?",
      options: ["Moins de 300 000 €", "300 000 à 500 000 €", "500 000 € à 1 M€", "Plus de 1 M€"],
    },
    { id: "fonds", kind: "choice", question: "Ce capital est-il disponible aujourd'hui ?", options: fondsOptions },
    { id: "experience", kind: "choice", question: "Avez-vous déjà investi dans l'immobilier ?", options: experienceOptions },
  ],
  ctaLabel: "Demander un entretien privé",
}

export const questionnaireB: QuestionnaireConfig = {
  page: "LP-B",
  pageSlug: "villa-seseh-bali",
  itemLabel: "villa",
  introLine: "Quelques questions pour préparer le rendez-vous. Deux minutes.",
  modelStep: {
    id: "modele",
    kind: "choice",
    question: "Quelle villa vous intéresse ?",
    options: ["Élégance", "Prestige", "Signature", "Exception", "Je ne sais pas encore"],
  },
  questions: [
    { id: "projet", kind: "choice", question: "Que cherchez-vous ?", options: projetOptions },
    { id: "horizon", kind: "choice", question: "Quand souhaiteriez-vous acheter ?", options: horizonOptions },
    {
      id: "budget",
      kind: "choice",
      question: "Quel budget pouvez-vous consacrer à ce projet ?",
      options: ["Moins de 150 000 €", "150 000 à 250 000 €", "250 000 à 500 000 €", "Plus de 500 000 €"],
    },
    { id: "fonds", kind: "choice", question: "Ce capital est-il disponible aujourd'hui ?", options: fondsOptions },
    { id: "experience", kind: "choice", question: "Avez-vous déjà investi dans l'immobilier ?", options: experienceOptions },
  ],
  ctaLabel: "Vérifier mon éligibilité",
}
