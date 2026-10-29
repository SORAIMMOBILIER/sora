import type { QuestionnaireConfig } from "../src/components/landing/tasvan/questionnaire/types"

// PLACEHOLDER — en attente des questions de qualification définitives et
// de leurs options exactes. Les ids ci-dessous (projet, horizon, budget,
// fonds, experience) sont ceux déjà appris par le trigger GoHighLevel
// (requête d'exemple envoyée le 30/10) — à conserver tels quels même
// quand le texte des questions sera remplacé, pour ne pas casser le
// mappage des champs côté GHL.

const MODEL_OPTIONS = ["Signature", "Exception", "Prestige", "Élégance"]

function questionsFor(itemLabel: string): QuestionnaireConfig["questions"] {
  return [
    {
      id: "projet",
      kind: "choice",
      question: `Quel est votre projet pour cette ${itemLabel} ?`,
      options: ["Résidence secondaire, à vivre en famille", "Investissement locatif", "Les deux"],
    },
    {
      id: "horizon",
      kind: "choice",
      question: "Sous quel délai souhaitez-vous investir ?",
      options: ["Dans les 3 mois", "3 à 6 mois", "6 à 12 mois", "Je me renseigne"],
    },
    {
      id: "budget",
      kind: "choice",
      question: "Quel budget envisagez-vous ?",
      options: ["Moins de 150 000 €", "150 000 à 300 000 €", "300 000 à 500 000 €", "Plus de 500 000 €"],
    },
    {
      id: "fonds",
      kind: "choice",
      question: "Les fonds sont-ils disponibles ?",
      options: ["Oui, disponibles", "Bientôt disponibles", "Pas encore"],
    },
    {
      id: "experience",
      kind: "choice",
      question: "Avez-vous déjà investi dans l'immobilier ?",
      options: ["Oui, en France", "Oui, à l'international", "Non, c'est une première"],
    },
  ]
}

export const questionnaireA: QuestionnaireConfig = {
  page: "LP-A",
  pageSlug: "maison-seseh-bali",
  itemLabel: "maison",
  modelStep: {
    id: "modele",
    kind: "choice",
    question: "Quelle gamme vous intéresse ?",
    options: MODEL_OPTIONS,
  },
  questions: questionsFor("maison"),
}

export const questionnaireB: QuestionnaireConfig = {
  page: "LP-B",
  pageSlug: "villa-seseh-bali",
  itemLabel: "villa",
  modelStep: {
    id: "modele",
    kind: "choice",
    question: "Quelle gamme vous intéresse ?",
    options: MODEL_OPTIONS,
  },
  questions: questionsFor("villa"),
}
