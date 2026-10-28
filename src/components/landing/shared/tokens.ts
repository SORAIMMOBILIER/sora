// Jetons de design de la refonte visuelle (grammaire tasvanlombok.com,
// polices/couleurs du site). Un seul nouveau token introduit : le gris
// moyen du texte courant, absent de la palette actuelle — défini ici,
// localement à ces deux pages, plutôt que dans globals.css (seule
// exception sitewide autorisée : la graisse Hanken 300, déjà chargée).
export const GRAY = "#6B6864"

export const CLS = {
  overline: "font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-accent",
  overlineOnDark: "font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-accent",
  blockTitle: "font-sans font-light text-foreground leading-[1.1] text-[32px] md:text-[44px]",
  body: "font-sans text-[16px] leading-[1.5]",
  caption: "font-sans text-[13px]",
  label: "font-sans font-medium text-[12px] uppercase tracking-[0.16em]",
  link: "font-sans text-[15px] underline underline-offset-4",
  button:
    "inline-flex items-center justify-center font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-white bg-foreground h-[52px] px-8 w-full md:w-auto",
}

export const bodyStyle: React.CSSProperties = { color: GRAY }
