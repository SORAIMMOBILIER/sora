// Limiteur en mémoire : 5 envois par IP et par heure (brief questionnaire
// natif). Best-effort — une instance serverless froide repart à zéro, ce
// n'est pas une protection anti-abus dure, seulement un frein de bon sens
// en complément du honeypot.
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5

const hits = new Map<string, number[]>()

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  if (timestamps.length >= MAX_PER_WINDOW) {
    hits.set(ip, timestamps)
    return true
  }
  timestamps.push(now)
  hits.set(ip, timestamps)
  return false
}
