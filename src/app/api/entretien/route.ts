import { NextRequest, NextResponse } from "next/server"
import { isRateLimited } from "@/lib/rate-limit"
import { normalizePhone } from "@/lib/phone"

const WEBHOOK_TIMEOUT_MS = 2000

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return req.headers.get("x-real-ip") || "unknown"
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Trop de tentatives, réessayez plus tard." }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 })
  }

  const { firstName, lastName, email, phone, callTime, model, answers, honeypot, page, langue, utm, fbclid, pageUrl } = body as {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    callTime?: string
    model?: string
    answers?: Record<string, string>
    honeypot?: string
    page?: "LP-A" | "LP-B"
    langue?: "fr" | "en"
    utm?: Partial<Record<(typeof UTM_KEYS)[number], string>>
    fbclid?: string
    pageUrl?: string
  }

  // Honeypot : champ invisible, jamais rempli par un humain. S'il est
  // rempli, on répond "ok" sans rien envoyer — ne pas donner d'indice au
  // bot que sa soumission a été repérée.
  if (honeypot) {
    return NextResponse.json({ ok: true })
  }

  if (!firstName || !lastName || !email || !phone || !callTime || !page) {
    return NextResponse.json({ ok: false, error: "Champs requis manquants." }, { status: 400 })
  }

  const normalizedPhone = normalizePhone(phone)
  const now = new Date().toISOString()
  const icp = page === "LP-B" ? "ICP B" : "ICP A"

  // Schéma exact appris par le trigger GoHighLevel (requête d'exemple du
  // 30/10) — ne pas renommer ces clés sans re-tester le déclencheur.
  const payload = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone: normalizedPhone,
    icp,
    page,
    langue: langue || "fr",
    page_url: pageUrl || null,
    modele: model || null,
    projet: answers?.projet || null,
    horizon: answers?.horizon || null,
    budget: answers?.budget || null,
    fonds: answers?.fonds || null,
    experience: answers?.experience || null,
    moment_appel: callTime,
    consent: true,
    consent_at: now,
    utm_source: utm?.utm_source || null,
    utm_medium: utm?.utm_medium || null,
    utm_campaign: utm?.utm_campaign || null,
    utm_content: utm?.utm_content || null,
    utm_term: utm?.utm_term || null,
    fbclid: fbclid || null,
    submitted_at: now,
  }

  // Copie du JSON envoyé, en log serveur (demande explicite du brief).
  console.log("[entretien]", JSON.stringify(payload))

  const webhookUrl = process.env.GHL_WEBHOOK_URL
  if (!webhookUrl) {
    console.error("[entretien] Variable d'environnement GHL_WEBHOOK_URL manquante")
    return NextResponse.json({ ok: false, error: "Configuration du webhook manquante." }, { status: 500 })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!res.ok) {
      console.error(`[entretien] Webhook a répondu ${res.status}`)
      return NextResponse.json({ ok: false, error: "Envoi impossible, réessayez dans un instant." }, { status: 502 })
    }
  } catch (err) {
    console.error("[entretien] Échec de l'appel webhook", err)
    return NextResponse.json({ ok: false, error: "Envoi impossible, réessayez dans un instant." }, { status: 502 })
  }

  return NextResponse.json({ ok: true, firstName, phone: normalizedPhone })
}
