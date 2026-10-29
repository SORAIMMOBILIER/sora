// Tuile sombre : fond foncé de la palette, surtitre doré, titre et texte
// blancs. Fond pleine largeur d'écran (même technique que `Section alt`
// dans les composants tasvan), texte recalé sur la largeur de contenu
// habituelle (max-w-[1180px] + marge fluide) via le conteneur interne —
// aucun défilement horizontal introduit.
export default function DarkTile({
  overline,
  title,
  text,
}: {
  overline: string
  title: string
  text: string
}) {
  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-foreground">
      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-8">
        <p className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-accent mb-4">{overline}</p>
        <p className="font-sans font-light text-white text-[28px] leading-[1.1] mb-4">{title}</p>
        <p className="font-sans text-[16px] leading-[1.5] text-white/80 max-w-[640px]">{text}</p>
      </div>
    </div>
  )
}
