import MediaSlot from "./media-slot"

export default function TeamBlock({
  photoSrc,
  photoAlt,
  photoCaption,
  quote,
  name,
  role,
  pendingLabel,
}: {
  photoSrc?: string
  photoAlt: string
  photoCaption?: string
  quote: string
  name: string
  role: string
  pendingLabel: string
}) {
  return (
    <div className="max-w-[1060px]">
      <div className="relative w-full aspect-[16/10] max-h-[60vh]">
        <MediaSlot src={photoSrc} alt={photoAlt} label={pendingLabel} sizes="100vw" />
      </div>
      {photoCaption && (
        <p className="font-sans text-[13px] mt-2 text-foreground/50">{photoCaption}</p>
      )}
      <p className="font-sans font-light text-foreground text-[24px] leading-[1.3] mt-8 max-w-[760px]">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="font-sans font-medium text-[12px] uppercase tracking-[0.16em] text-foreground/60 mt-4">
        {name}, {role}
      </p>
    </div>
  )
}
