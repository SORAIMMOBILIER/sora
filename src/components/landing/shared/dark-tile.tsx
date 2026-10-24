// Tuile pleine largeur sombre : fond foncé de la palette, surtitre doré,
// titre et texte blancs.
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
    <div className="max-w-[1060px] bg-foreground p-8">
      <p className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-accent mb-4">{overline}</p>
      <p className="font-sans font-light text-white text-[28px] leading-[1.1] mb-4">{title}</p>
      <p className="font-sans text-[16px] leading-[1.5] text-white/80 max-w-[640px]">{text}</p>
    </div>
  )
}
