import Image from "next/image"

// Remplace un visuel manquant par un bloc neutre aux mêmes proportions,
// plutôt que de masquer le bloc qui le contient — la page doit rester
// relisible dans sa mise en page finale avant que les assets n'arrivent.
// À placer dans un conteneur `relative` (même convention que next/image
// `fill`) qui porte l'aspect-ratio du bloc.
export default function MediaSlot({
  src,
  alt,
  label,
  sizes = "100vw",
  priority,
  quality = 90,
  fit = "cover",
}: {
  src?: string
  alt: string
  label: string
  sizes?: string
  priority?: boolean
  quality?: number
  fit?: "cover" | "contain"
}) {
  if (!src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background border border-border">
        <span className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-foreground/35">
          {label}
        </span>
      </div>
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={fit === "contain" ? "object-contain" : "object-cover"}
    />
  )
}
