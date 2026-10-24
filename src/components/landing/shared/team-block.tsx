import MediaSlot from "./media-slot"

// Photo pleine largeur, citation, nom et fonction. Jamais masqué : un
// visuel en attente remplace la photo tant qu'elle n'est pas fournie.
export default function TeamBlock({
  photoSrc,
  photoAlt,
  quote,
  name,
  role,
  pendingLabel,
}: {
  photoSrc?: string
  photoAlt: string
  quote: string
  name: string
  role: string
  pendingLabel: string
}) {
  return (
    <div>
      <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-sm overflow-hidden bg-secondary/40 mb-10">
        <MediaSlot src={photoSrc} alt={photoAlt} label={pendingLabel} sizes="100vw" />
      </div>
      <blockquote className="max-w-2xl mx-auto text-center">
        <p className="font-serif font-medium text-foreground leading-snug" style={{ fontSize: "clamp(20px,3vw,26px)" }}>
          &ldquo;{quote}&rdquo;
        </p>
        <footer className="text-foreground/50 text-sm mt-4">
          {name}, {role}
        </footer>
      </blockquote>
    </div>
  )
}
