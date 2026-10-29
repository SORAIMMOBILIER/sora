import { DISPLAY, C } from "./tokens"

export type GammeCell = { name: string; spec: string; price: string; anchor: string; rendement?: string }

// Bande pleine largeur, fond #262626 à motifs (même traitement que le
// bandeau "Lecture du marché" du site principal : texture pattern-fabric
// en surimpression, contenu dans un calque relative z-10). Les 4 gammes
// toujours visibles, pas de dépliable. `note` : la ligne "Prix tout
// compris..." affichée en blanc sous la grille, à l'intérieur de la bande.
export default function GammesBand({ items, note }: { items: GammeCell[]; note?: string }) {
  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden" style={{ background: "#262626" }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url(/pattern-fabric.webp)" }}
      />
      <div className="relative z-10 max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)]">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {items.map((item, i) => (
            <a
              key={item.name}
              href={item.anchor}
              className="flex flex-col px-0 md:px-6 py-[30px] border-b md:border-b-0 md:border-r last:border-0 transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,.15)" }}
            >
              <span className="text-[11px] font-medium uppercase tracking-[.22em] text-white/60">{item.name}</span>
              <span className="mt-[6px] text-[13px] text-white/60">{item.spec}</span>
              <span className="mt-[10px] text-[clamp(26px,3vw,36px)] leading-[1.1] font-light text-white" style={{ fontFamily: DISPLAY }}>
                {item.price}
              </span>
              {item.rendement && <span className="mt-[6px] text-[12px] text-white/60">{item.rendement} net estimé</span>}
            </a>
          ))}
        </div>
        {note && (
          <p className="text-[12px] text-white/70 pb-[22px] pt-[2px]">{note}</p>
        )}
      </div>
    </div>
  )
}
