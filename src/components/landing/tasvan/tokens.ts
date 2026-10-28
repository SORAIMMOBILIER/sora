// Jetons mesurés sur tasvanlombok.com — voir docs/tasvan-tokens.md pour le
// relevé complet et les sources. Valeurs copiées telles quelles.

export const DISPLAY = "var(--font-league-spartan), Futura, 'Avenir Next', 'Helvetica Neue', Arial, sans-serif"
export const BODY = "var(--font-montserrat), 'Helvetica Neue', Arial, sans-serif"

export const C = {
  ink: "#1f1f1e",
  paper: "#ffffff",
  stone: "#f1f0ed",
  line: "#d6d4ce",
  muted: "#65635e",
  card: "#242423",
  cardInk: "#ffffff",
  cardMuted: "#b9b7b1",
}

// Classes réutilisables (Tailwind, valeurs arbitraires = jetons mesurés)
export const CLS = {
  kicker: "text-[12px] font-medium uppercase tracking-[.22em] text-[#65635e]",
  h2: "text-[clamp(36px,5.4vw,64px)] max-w-[16ch] font-light leading-[1.08] tracking-[-.01em] text-[#1f1f1e]",
  btn: "inline-flex items-center justify-center min-h-[48px] px-[28px] py-[15px] text-[12.5px] font-medium uppercase tracking-[.18em] border border-[#1f1f1e] bg-[#1f1f1e] text-white transition-colors hover:bg-transparent hover:text-[#1f1f1e]",
  btnGhost: "inline-flex items-center justify-center min-h-[48px] px-[28px] py-[15px] text-[12.5px] font-medium uppercase tracking-[.18em] border border-[#1f1f1e] bg-transparent text-[#1f1f1e] transition-colors hover:bg-[#1f1f1e] hover:text-white",
}

export const displayStyle: React.CSSProperties = { fontFamily: DISPLAY }
export const bodyStyle: React.CSSProperties = { fontFamily: BODY }
