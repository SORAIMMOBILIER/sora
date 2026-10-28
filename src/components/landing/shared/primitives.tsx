import { GRAY, CLS } from "./tokens"

// Primitives de la grammaire tasvanlombok : pas de pastille, pas de carte,
// pas d'ombre, pas d'arrondi. Un seul composant structurant : le filet.

export function Overline({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`${CLS.overline} mb-4 ${dark ? "text-accent" : ""}`}>{children}</p>
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

// Bloc en deux colonnes sur ordinateur : surtitre/titre/ligne à gauche sur
// 4 colonnes de 12, contenu (tableau...) à droite sur 8. Empilé sur
// mobile. Une image éventuelle (pleine largeur, légendée) se place AVANT
// ce composant, dans la page — jamais après le même texte.
export function TwoColBlock({
  overline,
  title,
  line,
  children,
}: {
  overline: string
  title: string
  line?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4">
        <Overline>{overline}</Overline>
        <BlockTitle>{title}</BlockTitle>
        {line && (
          <p className="font-sans text-[16px] leading-[1.5] mt-4" style={{ color: GRAY }}>
            {line}
          </p>
        )}
      </div>
      <div className="md:col-span-8 mt-6 md:mt-0">{children}</div>
    </div>
  )
}

// Ligne à filet simple — 52 px, texte 16 px (pour les listes "La gestion",
// "Ce que vous ne ferez jamais", etc.)
export function RuleLines({ items }: { items: string[] }) {
  return (
    <div className="border-t border-border">
      {items.map((item) => (
        <div key={item} className="h-[52px] flex items-center border-b border-border text-[16px]" style={{ color: GRAY }}>
          {item}
        </div>
      ))}
    </div>
  )
}

// Tableau libellé / valeur — pleine largeur du conteneur qui le reçoit
// (jamais limité à 640 px), lignes 48-56 px, libellé gris dans une colonne
// fixe à gauche, valeur presque-noir à droite.
export function LabelValueTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="border-t border-border">
      {rows.map((row) => (
        <div key={row.label} className="min-h-[48px] md:min-h-[56px] flex items-start gap-6 py-2.5 border-b border-border text-[15px]">
          <span className="w-[130px] md:w-[190px] shrink-0 pt-0.5" style={{ color: GRAY }}>
            {row.label}
          </span>
          <span className="text-foreground">{row.value}</span>
        </div>
      ))}
    </div>
  )
}
