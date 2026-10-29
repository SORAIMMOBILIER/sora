import { Kicker, H2 } from "./primitives"

// `.intro-grid` : surtitre + titre pleine largeur, puis deux colonnes
// 1.05fr / .95fr en dessous.
export default function IntroGrid({
  overline,
  title,
  left,
  right,
}: {
  overline: string
  title: string
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    <div>
      <Kicker>{overline}</Kicker>
      <div className="mt-4">
        <H2>{title}</H2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1.05fr_.95fr] gap-[clamp(40px,7vw,110px)] items-start mt-10">
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </div>
  )
}
