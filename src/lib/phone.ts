import { parsePhoneNumberFromString } from "libphonenumber-js"

// Normalise un numéro saisi (France par défaut, l'utilisateur peut taper
// un indicatif international avec +) en E.164 ("+33612345678"). Renvoie
// le texte saisi tel quel si l'analyse échoue, plutôt que de bloquer
// l'envoi pour un format inhabituel.
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim()
  const parsed = parsePhoneNumberFromString(trimmed, "FR")
  if (parsed && parsed.isValid()) return parsed.number
  return trimmed
}
