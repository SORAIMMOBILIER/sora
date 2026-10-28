// "+" quand fermé, "—" quand ouvert — même esprit que l'icône de la FAQ.
// Utilise currentColor pour suivre la couleur du texte du bouton parent
// (y compris au survol, quand .btn.ghost inverse fond/texte).
export default function PlusMinus({ open }: { open: boolean }) {
  return (
    <span className="relative inline-block w-[14px] h-[14px] shrink-0">
      <span className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-current" />
      {!open && <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current" />}
    </span>
  )
}
