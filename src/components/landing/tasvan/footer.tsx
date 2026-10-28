import { C } from "./tokens"

export type FooterColumn = { heading: string; lines: { label: string; href?: string }[] }

// Pied de page : 3 colonnes + ligne de démenti pleine largeur.
export default function TasvanFooter({ columns, disclaimerLines }: { columns: FooterColumn[]; disclaimerLines: string[] }) {
  return (
    <footer className="border-t pt-14 pb-[calc(56px+env(safe-area-inset-bottom,0px))]" style={{ borderColor: C.line }}>
      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-8 text-[13.5px]" style={{ color: C.muted }}>
          {columns.map((col) => (
            <div key={col.heading}>
              <b className="block text-[12px] font-medium uppercase tracking-[.16em] mb-[10px]" style={{ color: C.ink }}>
                {col.heading}
              </b>
              {col.lines.map((l) =>
                l.href ? (
                  <a key={l.label} href={l.href} className="block no-underline">
                    {l.label}
                  </a>
                ) : (
                  <p key={l.label}>{l.label}</p>
                )
              )}
            </div>
          ))}
        </div>
        <div className="text-[12px] leading-[1.6] border-t pt-6 mt-8 space-y-1" style={{ borderColor: C.line, color: C.muted }}>
          {disclaimerLines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </div>
    </footer>
  )
}
