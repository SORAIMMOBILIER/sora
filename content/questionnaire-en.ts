import type { QuestionnaireConfig, QuestionnaireUi } from "../src/components/landing/tasvan/questionnaire/types"

// English mirror of questionnaire-fr.ts — same field ids, same page/
// pageSlug values, same options structure. Only the labels change. Model
// names (Signature, Exception, Prestige, Élégance) are never translated.

const horizonOptions = ["Within 3 months", "In 3 to 6 months", "In 6 to 12 months", "In more than a year"]
const fondsOptions = ["Yes, available", "Within 6 months, a sale or transfer in progress", "In more than a year", "I'm planning financing"]
const experienceOptions = ["Yes, in my home country", "Yes, abroad", "Yes, both in my home country and abroad", "No, this would be my first investment"]
const projetOptions = ["A second home, to live in as a family", "A rental investment", "Both"]

const uiEn: QuestionnaireUi = {
  callTimeOptions: ["Morning", "Around lunchtime", "Late afternoon", "Weekend"],
  modelNames: ["Signature", "Exception", "Prestige", "Élégance"],
  contactTitle: "Your details",
  firstNamePlaceholder: "First name",
  lastNamePlaceholder: "Last name",
  emailPlaceholder: "Email",
  phonePlaceholder: "Phone",
  callTimeLabel: "The best time to call you",
  continueLabel: "Continue",
  backLabel: "Back",
  submittingLabel: "Sending...",
  consentText: "By submitting this form, I agree to be called back by SORA.",
  errorMessage: "Something went wrong, please try again in a moment.",
  stepCounterTemplate: "{current} of {total}",
  doneMessageTemplate:
    "Thank you, {firstName}. A member of the SORA team will call you shortly at {phone}. If you'd prefer another time, just reply to the message you're about to receive.",
}

export const questionnaireAEn: QuestionnaireConfig = {
  page: "LP-A",
  pageSlug: "maison-seseh-bali",
  itemLabel: "house",
  langue: "en",
  ui: uiEn,
  introLine: "A few questions to prepare the consultation. Two minutes.",
  modelStep: {
    id: "modele",
    kind: "choice",
    question: "Which house interests you?",
    options: ["Exception", "Signature", "Prestige", "Élégance", "Not sure yet"],
  },
  questions: [
    { id: "projet", kind: "choice", question: "What draws you to a house in Bali?", options: projetOptions },
    { id: "horizon", kind: "choice", question: "When would you like to buy?", options: horizonOptions },
    {
      id: "budget",
      kind: "choice",
      question: "What budget can you put towards this project?",
      options: ["Under €300,000", "€300,000 to €500,000", "€500,000 to €1M", "Over €1M"],
    },
    { id: "fonds", kind: "choice", question: "Is this capital available today?", options: fondsOptions },
    { id: "experience", kind: "choice", question: "Have you invested in property before?", options: experienceOptions },
  ],
  ctaLabel: "Request a private consultation",
}

export const questionnaireBEn: QuestionnaireConfig = {
  page: "LP-B",
  pageSlug: "villa-seseh-bali",
  itemLabel: "villa",
  langue: "en",
  ui: uiEn,
  introLine: "A few questions to prepare the call. Two minutes.",
  modelStep: {
    id: "modele",
    kind: "choice",
    question: "Which villa interests you?",
    options: ["Élégance", "Prestige", "Signature", "Exception", "Not sure yet"],
  },
  questions: [
    { id: "projet", kind: "choice", question: "What are you looking for?", options: projetOptions },
    { id: "horizon", kind: "choice", question: "When would you like to buy?", options: horizonOptions },
    {
      id: "budget",
      kind: "choice",
      question: "What budget can you put towards this project?",
      options: ["Under €150,000", "€150,000 to €250,000", "€250,000 to €500,000", "Over €500,000"],
    },
    { id: "fonds", kind: "choice", question: "Is this capital available today?", options: fondsOptions },
    { id: "experience", kind: "choice", question: "Have you invested in property before?", options: experienceOptions },
  ],
  ctaLabel: "Check my eligibility",
}
