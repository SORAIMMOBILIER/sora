import { createHash } from "crypto"
import { unstable_cache } from "next/cache"
import { STATIC_EN_OVERRIDES } from "./en-overrides"

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
const MODEL = "claude-haiku-4-5-20251001"

const SYSTEM_PROMPT = `You translate CMS content for a French real-estate investment website (Bali villas) from French to English.

Rules:
- The input is a JSON value. Return ONLY the translated JSON, same shape, same keys, same array order — no markdown fences, no commentary.
- Translate natural French prose (titles, descriptions, body text, bullet points, bios, FAQ answers) into clear, natural English.
- Do NOT translate or alter: technical/structural fields (_type, _key, _ref, slug, style, listItem, marks, href, asset, url, id-like fields), numbers, currency amounts, percentages, dates, surface areas (m²), and proper nouns — brand/company names (Sora, Seseh Sunset Villas, ILA Consulting, Vienna Lux Cooperation), person names (Gabriel Lapierre, Julie Chatelain), place names (Bali, Canggu, Uluwatu, Seseh, Indonesia), and legal/structure terms that are proper nouns (PT PMA).
- Villa range names (Élégance, Prestige, Signature, Exception) stay unchanged.
- If a value is already in English or is not natural-language prose, leave it unchanged.`

async function callClaude(userContent: string, maxTokens: number): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_TRANSLATE_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userContent }],
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    const text = data?.content?.[0]?.text
    return typeof text === "string" ? text : null
  } catch {
    return null
  }
}

function extractJson(raw: string): string {
  const trimmed = raw.trim()
  const fenced = trimmed.match(/^```(?:json)?\n([\s\S]*)\n```$/)
  return fenced ? fenced[1] : trimmed
}

async function translateJsonUncached<T>(value: T, maxTokens: number): Promise<T> {
  const raw = await callClaude(JSON.stringify(value), maxTokens)
  if (!raw) return value
  try {
    return JSON.parse(extractJson(raw)) as T
  } catch {
    return value
  }
}

/**
 * Translates a JSON-serializable CMS value (French -> English), cached and
 * keyed by cacheKey. Resolution order:
 *  1. A hand-written entry in STATIC_EN_OVERRIDES for this cacheKey (free,
 *     instant, no API key needed — this covers all current content).
 *  2. Claude (Anthropic Messages API), if ANTHROPIC_TRANSLATE_API_KEY is
 *     set — for new content added later that has no static override yet.
 *     Cached for an hour, keyed by a content hash, so an edit in Sanity
 *     produces a fresh translation automatically without needing a webhook.
 *  3. The original French value, unchanged — this must never break the page.
 */
export async function translateToEnglish<T>(
  value: T,
  cacheKey: string,
  maxTokens = 4096,
): Promise<T> {
  if (value == null) return value
  if (cacheKey in STATIC_EN_OVERRIDES) return STATIC_EN_OVERRIDES[cacheKey] as T
  if (!process.env.ANTHROPIC_TRANSLATE_API_KEY) return value

  const hash = createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16)
  const cached = unstable_cache(
    () => translateJsonUncached(value, maxTokens),
    ["translate-en", cacheKey, hash],
    { revalidate: 3600 },
  )
  return cached()
}
