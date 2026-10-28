// Icônes au trait, dessinées à la main (pas lucide-react) : la page de
// campagne n'a besoin que de ces deux-là, pas de toute la librairie.
export function PriceTagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12.59 2.59 20.4 10.4a2 2 0 0 1 0 2.83l-7.17 7.17a2 2 0 0 1-2.83 0L2.4 12.4a2 2 0 0 1-.59-1.4V4a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.59Z" />
      <circle cx="7.5" cy="7.5" r="1.25" />
    </svg>
  )
}

export function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.5 4.5 5.5v6c0 5.25 3.5 8.5 7.5 10 4-1.5 7.5-4.75 7.5-10v-6L12 2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 9.8" />
    </svg>
  )
}
