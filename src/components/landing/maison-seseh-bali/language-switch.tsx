// Lien discret FR | EN entre les deux seules versions de cette page —
// n'apparaît que si la version visée existe (voir page.tsx : affiché
// seulement quand enContent !== null).
export default function LanguageSwitch({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="text-[11px] tracking-[0.1em] font-semibold uppercase text-foreground/50 hover:text-foreground transition-colors"
    >
      {label}
    </a>
  )
}
