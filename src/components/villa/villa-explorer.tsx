"use client"
import { useMemo, useState } from "react"
import Image from "next/image"
import VillaPlan from "./villa-plan"
import { Badge } from "@/components/ui/badge"

const ROOM_LABELS: Record<string, string> = {
  living: "Salon",
  kitchen: "Cuisine",
  terrace: "Terrasse",
  dining: "Salle à manger",
  office: "Bureau",
  toilet: "Toilettes",
  bedroom1: "Chambre 1",
  bedroom2: "Chambre 2",
  bedroom3: "Chambre 3",
  bath1: "Salle de bain 1",
  bath2: "Salle de bain 2",
  bath3: "Salle de bain 3",
}

export type GalleryImage = {
  url: string
  alt: string
  room?: string
}

export type VillaExplorerProps = {
  svgRdc: string | null
  svgEtage: string | null
  gallery: GalleryImage[]
  gammeName: string
}

export default function VillaExplorer({ svgRdc, svgEtage, gallery, gammeName }: VillaExplorerProps) {
  const [activeRoom, setActiveRoom] = useState<string | null>(null)

  const featuredImage = useMemo(() => {
    if (activeRoom) {
      const match = gallery.find((img) => img.room === activeRoom)
      if (match) return match
    }
    return gallery[0] || null
  }, [activeRoom, gallery])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
      <VillaPlan
        svgRdc={svgRdc}
        svgEtage={svgEtage}
        activeRoom={activeRoom}
        onRoomChange={setActiveRoom}
      />

      <div className="md:sticky md:top-24">
        {featuredImage ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-card">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || gammeName}
              fill
              quality={92}
              sizes="(max-width:1024px) 100vw, 640px"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge className="bg-primary text-background border-transparent">
                {activeRoom
                  ? ROOM_LABELS[activeRoom] || activeRoom
                  : featuredImage.room
                    ? ROOM_LABELS[featuredImage.room] || featuredImage.room
                    : "Aperçu"}
              </Badge>
            </div>
            {!activeRoom && (
              <div className="absolute bottom-4 right-4">
                <span className="metadata bg-background/90 text-foreground px-3 py-1.5 rounded-full">
                  Cliquez une pièce du plan
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative aspect-[4/3] flex items-center justify-center bg-card border border-dashed border-border rounded-sm">
            <p className="metadata text-foreground/45">Aucune photo disponible</p>
          </div>
        )}
      </div>
    </div>
  )
}
