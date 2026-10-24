import { GRAY, CLS } from "./tokens"

// Primitives de la grammaire tasvanlombok : pas de pastille, pas de carte,
// pas d'ombre, pas d'arrondi. Un seul composant structurant : le filet.

export function Overline({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`${CLS.overline} mb-4`}>{children}</p>
}

export function BlockTitle({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <h2 className={`${CLS.blockTitle} ${dark ? "text-white" : "text-foreground"}`}>{children}</h2>
}

export function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${CLS.body} max-w-[640px] space-y-4`} style={{ color: GRAY }}>
      {children}
    </div>
  )
}

// Ligne à filet simple — 52 px, texte 16 px (pour les listes "La gestion",
// "Ce que vous ne ferez jamais", etc.)
export function RuleLines({ items }: { items: string[] }) {
  return (
    <div className="max-w-[640px] border-t border-border">
      {items.map((item) => (
        <div key={item} className="h-[52px] flex items-center border-b border-border text-[16px]" style={{ color: GRAY }}>
          {item}
        </div>
      ))}
    </div>
  )
}

// Tableau libellé / valeur — lignes 48-56 px, libellé gris à gauche,
// valeur presque-noir à droite.
export function LabelValueTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="max-w-[640px] border-t border-border">
      {rows.map((row) => (
        <div key={row.label} className="min-h-[48px] md:min-h-[56px] flex items-center justify-between gap-6 py-2 border-b border-border text-[15px]">
          <span style={{ color: GRAY }}>{row.label}</span>
          <span className="text-foreground text-right">{row.value}</span>
        </div>
      ))}
    </div>
  )
}
