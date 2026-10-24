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
      <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
        <span className="metadata text-foreground/35">{label}</span>
      </div>
    )
  }
  // Les plans sont des SVG servis tels quels (pas d'optimiseur next/image
  // pour du SVG, et un plan ne doit jamais être recadré : object-contain).
  if (src.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-contain p-6 bg-background" />
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
