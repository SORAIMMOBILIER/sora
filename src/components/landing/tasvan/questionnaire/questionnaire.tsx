"use client"
import { useEffect, useMemo, useState } from "react"
import { trackLead } from "@/components/landing/maison-seseh-bali/track"
import { C, DISPLAY } from "../tokens"
import type { QuestionnaireConfig } from "./types"

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const
const CALL_TIME_OPTIONS = ["Dès que possible", "Ce soir", "Demain matin"]
// Les 4 gammes existent toutes sur les deux pages (fiches visibles + repliées) :
// un ?modele= venant d'une fiche repliée (ex. Prestige sur la page A) doit
// pouvoir pré-remplir/sauter la question même si "Prestige" n'est pas l'une
// des options affichées par cette page (voir modelStep.options, limité à 3).
const ALL_MODEL_NAMES = ["Signature", "Exception", "Prestige", "Élégance"]

type Phase = "steps" | "contact" | "submitting" | "done" | "error"

const OPTION_BASE =
  "w-full md:w-full h-[52px] px-5 flex items-center text-left text-[15px] border transition-colors"

export default function Questionnaire({ config, anchorId }: { config: QuestionnaireConfig; anchorId: string }) {
  const [presetModel, setPresetModel] = useState<string | null | undefined>(undefined)
  const [tracking, setTracking] = useState<{ utm: Partial<Record<(typeof UTM_KEYS)[number], string>>; fbclid: string | null; pageUrl: string }>({
    utm: {},
    fbclid: null,
    pageUrl: "",
  })

  useEffect(() => {
    const search = new URLSearchParams(window.location.search)
    const modele = search.get("modele")
    const match = modele ? ALL_MODEL_NAMES.find((o) => o.toLowerCase() === modele.toLowerCase()) : null
    setPresetModel(match || null)
    const utm: Partial<Record<(typeof UTM_KEYS)[number], string>> = {}
    for (const k of UTM_KEYS) {
      const v = search.get(k)
      if (v) utm[k] = v
    }
    setTracking({ utm, fbclid: search.get("fbclid"), pageUrl: window.location.href })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const steps = useMemo(() => {
    const list = [...config.questions]
    if (!presetModel) list.unshift(config.modelStep)
    return list
  }, [config, presetModel])

  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [phase, setPhase] = useState<Phase>("steps")
  const [errorMessage, setErrorMessage] = useState("")
  const [doneInfo, setDoneInfo] = useState<{ firstName: string; phone: string } | null>(null)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [callTime, setCallTime] = useState("")
  const [honeypot, setHoneypot] = useState("")

  // En attente du rendu client (preset modèle + tracking) pour éviter tout
  // flash de contenu entre l'état serveur et l'hydratation.
  if (presetModel === undefined) {
    return <div className="min-h-[420px]" />
  }

  const totalSteps = steps.length + 1 // + étape contact
  const currentStepNum = phase === "contact" ? steps.length + 1 : stepIndex + 1
  const progressPct = Math.round((currentStepNum / totalSteps) * 100)
  const isFirstScreen = phase === "steps" && stepIndex === 0

  const selectOption = (id: string, value: string) => {
    setAnswers({ ...answers, [id]: value })
  }

  const goNext = () => {
    if (!activeQuestion || !answers[activeQuestion.id]) return
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      setPhase("contact")
    }
  }

  const goBack = () => {
    if (phase === "contact") {
      if (steps.length > 0) {
        setPhase("steps")
        setStepIndex(steps.length - 1)
      }
      return
    }
    if (stepIndex > 0) setStepIndex(stepIndex - 1)
  }

  const canGoBack = phase === "contact" ? steps.length > 0 : stepIndex > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !email || !phone || !callTime) return
    setPhase("submitting")
    setErrorMessage("")

    const model = presetModel || answers[config.modelStep.id] || null
    const restAnswers = { ...answers }
    delete restAnswers[config.modelStep.id]

    try {
      const res = await fetch("/api/entretien", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          callTime,
          model,
          answers: restAnswers,
          honeypot,
          page: config.page,
          utm: tracking.utm,
          fbclid: tracking.fbclid,
          pageUrl: tracking.pageUrl,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || "Envoi impossible, réessayez dans un instant.")
        setPhase("error")
        return
      }
      // Chaque envoi déclenche l'event standard Meta "Lead" (plus de
      // calcul de qualification — un seul message de fin, demande
      // explicite).
      trackLead(config.page, model)
      setDoneInfo({ firstName: data.firstName || firstName, phone: data.phone || phone })
      setPhase("done")
    } catch {
      setErrorMessage("Envoi impossible, réessayez dans un instant.")
      setPhase("error")
    }
  }

  if (phase === "done" && doneInfo) {
    return (
      <div data-testid="questionnaire" className="py-4">
        <p className="text-[16px] leading-[1.5]" style={{ color: C.ink }}>
          Merci {doneInfo.firstName}. Un membre de l&apos;équipe SORA vous appelle sous peu au {doneInfo.phone}. Si
          vous préférez un autre moment, répondez simplement au SMS que vous allez recevoir.
        </p>
      </div>
    )
  }

  const activeQuestion = phase === "steps" ? steps[stepIndex] : null

  return (
    <div data-testid="questionnaire">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[12px] uppercase tracking-[0.12em]" style={{ color: C.muted }}>
          {currentStepNum} sur {totalSteps}
        </p>
      </div>
      <div className="h-[3px] w-full bg-black/10 rounded-full overflow-hidden mb-6">
        <div className="h-full transition-all" style={{ width: `${progressPct}%`, background: C.ink }} />
      </div>

      {isFirstScreen && (
        <p className="text-[14px] mb-5" style={{ color: C.muted }}>
          {config.introLine}
        </p>
      )}

      {phase === "steps" && activeQuestion && (
        <div>
          <p className="text-[18px] font-light mb-5" style={{ fontFamily: DISPLAY, color: C.ink }}>
            {activeQuestion.question}
          </p>
          <div className="flex flex-col gap-3">
            {activeQuestion.options.map((opt) => {
              const selected = answers[activeQuestion.id] === opt
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => selectOption(activeQuestion.id, opt)}
                  className={OPTION_BASE}
                  style={{
                    borderColor: selected ? C.ink : C.line,
                    color: C.ink,
                    background: selected ? "rgba(0,0,0,.04)" : "transparent",
                  }}
                >
                  {opt}
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={goNext}
            disabled={!answers[activeQuestion.id]}
            className="mt-6 h-[52px] w-full flex items-center justify-center text-[12px] font-medium uppercase tracking-[0.16em] text-white disabled:opacity-50"
            style={{ background: C.ink }}
          >
            Continuer
          </button>
        </div>
      )}

      {(phase === "contact" || phase === "submitting" || phase === "error") && (
        <form onSubmit={handleSubmit}>
          <p className="text-[18px] font-light mb-5" style={{ fontFamily: DISPLAY, color: C.ink }}>
            Vos coordonnées
          </p>
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              placeholder="Prénom"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-[52px] px-4 border text-[15px] w-full"
              style={{ borderColor: C.line, color: C.ink }}
            />
            <input
              type="text"
              placeholder="Nom"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-[52px] px-4 border text-[15px] w-full"
              style={{ borderColor: C.line, color: C.ink }}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[52px] px-4 border text-[15px] w-full"
              style={{ borderColor: C.line, color: C.ink }}
            />
            <input
              type="tel"
              placeholder="Téléphone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-[52px] px-4 border text-[15px] w-full"
              style={{ borderColor: C.line, color: C.ink }}
            />
            <div>
              <p className="text-[13px] mb-2" style={{ color: C.muted }}>
                Le meilleur moment pour vous appeler
              </p>
              <div className="flex flex-col gap-3">
                {CALL_TIME_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setCallTime(opt)}
                    className={OPTION_BASE}
                    style={{
                      borderColor: callTime === opt ? C.ink : C.line,
                      color: C.ink,
                      background: callTime === opt ? "rgba(0,0,0,.04)" : "transparent",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {phase === "error" && (
            <p className="text-[13px] mt-4" style={{ color: "#b4231f" }}>
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={phase === "submitting" || !firstName || !lastName || !email || !phone || !callTime}
            className="mt-6 h-[52px] w-full flex items-center justify-center text-[12px] font-medium uppercase tracking-[0.16em] text-white disabled:opacity-50"
            style={{ background: C.ink }}
          >
            {phase === "submitting" ? "Envoi..." : config.ctaLabel}
          </button>
          <p className="text-[13px] mt-3" style={{ color: C.muted }}>
            En envoyant ce formulaire, j&apos;accepte d&apos;être rappelé par SORA.
          </p>
        </form>
      )}

      {canGoBack && (
        <button type="button" onClick={goBack} className="mt-5 text-[13px] underline underline-offset-4" style={{ color: C.muted }}>
          Retour
        </button>
      )}
    </div>
  )
}
