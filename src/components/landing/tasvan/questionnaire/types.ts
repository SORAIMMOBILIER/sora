export type ChoiceStep = {
  id: string
  kind: "choice"
  question: string
  options: string[]
}

// Textes d'interface du questionnaire (hors contenu des étapes) — pour
// que le composant partagé questionnaire.tsx n'ait plus aucune chaîne en
// dur, et puisse être utilisé en français comme en anglais.
export type QuestionnaireUi = {
  callTimeOptions: string[]
  modelNames: string[] // ALL_MODEL_NAMES, pour le matching ?modele= — noms non traduits
  contactTitle: string // "Vos coordonnées"
  firstNamePlaceholder: string
  lastNamePlaceholder: string
  emailPlaceholder: string
  phonePlaceholder: string
  callTimeLabel: string // "Le meilleur moment pour vous appeler"
  continueLabel: string
  backLabel: string
  submittingLabel: string
  consentText: string
  errorMessage: string
  // Gabarits de texte (pas des fonctions : un config passé d'un composant
  // serveur vers ce composant client ne peut pas contenir de fonction,
  // Next.js refuse de la sérialiser). Remplacés via .replace() ci-dessous.
  stepCounterTemplate: string // "{current} sur {total}"
  doneMessageTemplate: string // "Merci {firstName}. ... au {phone}. ..."
}

export type QuestionnaireConfig = {
  page: "LP-A" | "LP-B"
  pageSlug: "maison-seseh-bali" | "villa-seseh-bali"
  itemLabel: string // "maison" | "villa" — pour les textes génériques
  langue: "fr" | "en"
  introLine: string
  modelStep: ChoiceStep
  questions: ChoiceStep[]
  ctaLabel: string // libellé du bouton d'envoi de l'étape contact
  ui: QuestionnaireUi
}
