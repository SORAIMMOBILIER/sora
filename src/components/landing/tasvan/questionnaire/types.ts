export type ChoiceStep = {
  id: string
  kind: "choice"
  question: string
  options: string[]
}

export type QuestionnaireConfig = {
  page: "LP-A" | "LP-B"
  pageSlug: "maison-seseh-bali" | "villa-seseh-bali"
  itemLabel: string // "maison" | "villa" — pour les textes génériques
  modelStep: ChoiceStep
  questions: ChoiceStep[]
}
