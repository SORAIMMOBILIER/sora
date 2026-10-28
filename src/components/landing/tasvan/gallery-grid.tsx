import MediaSlot from "@/components/landing/shared/media-slot"
import { C } from "./tokens"

export type GalleryPhoto = { src?: string; alt: string; caption: string }

// `.gallery` : grille magazine 12 colonnes, asymétrique. 6 images : une
// pleine largeur (21:9), puis 7/5, puis trois égales à 4 colonnes.
export default function GalleryGrid({ photos, pendingLabel }: { photos: GalleryPhoto[]; pendingLabel: string }) {
  const spans = ["col-span-12 aspect-[21/9]", "col-span-12 md:col-span-7 aspect-[3/2]", "col-span-12 md:col-span-5 aspect-[3/2]", "col-span-12 md:col-span-4 aspect-[3/2]", "col-span-12 md:col-span-4 aspect-[3/2]", "col-span-12 md:col-span-4 aspect-[3/2]"]
  return (
    <div className="grid grid-cols-12 gap-4 mt-14">
      {photos.slice(0, 6).map((photo, i) => (
        <figure key={i} className={`m-0 ${spans[i] || "col-span-12 md:col-span-4 aspect-[3/2]"}`}>
          <div className="relative w-full h-full">
            <MediaSlot src={photo.src} alt={photo.alt} label={pendingLabel} sizes="(max-width:768px) 100vw, 50vw" />
          </div>
          <figcaption className="text-[13.5px] mt-3" style={{ color: C.muted }}>
            {photo.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
