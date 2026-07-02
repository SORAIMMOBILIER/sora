"use client"
import { useEffect, useRef, useState } from "react"

const ROOM_LABELS: Record<string, string> = {
  living: "Salon",
  kitchen: "Cuisine",
  terrace: "Terrasse",
  dining: "Salle à manger",
  workspace: "Espace de travail",
  office: "Bureau",
  toilet: "Toilettes",
  bedroom1: "Chambre 1",
  bedroom2: "Chambre 2",
  bedroom3: "Chambre 3",
  bath1: "Salle de bain 1",
  bath2: "Salle de bain 2",
  bath3: "Salle de bain 3",
}

export type VillaPlanProps = {
  svgRdc: string | null
  svgEtage: string | null
  activeRoom: string | null
  onRoomChange: (room: string | null) => void
}

export default function VillaPlan({ svgRdc, svgEtage, activeRoom, onRoomChange }: VillaPlanProps) {
  const [floor, setFloor] = useState<"rdc" | "etage">("rdc")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleClick = (e: Event) => {
      const target = (e.target as Element).closest("[data-room]") as HTMLElement | null
      if (!target) return
      const room = target.getAttribute("data-room")
      if (!room) return
      onRoomChange(activeRoom === room ? null : room)
    }

    container.addEventListener("click", handleClick)
    return () => container.removeEventListener("click", handleClick)
  }, [floor, onRoomChange, activeRoom])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.querySelectorAll<HTMLElement>("[data-room]").forEach((el) => {
      const room = el.getAttribute("data-room")
      if (activeRoom && room === activeRoom) {
        el.setAttribute("data-active", "true")
      } else {
        el.removeAttribute("data-active")
      }
    })
  }, [activeRoom, floor])

  const activeSvg = floor === "rdc" ? svgRdc : svgEtage

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-serif text-foreground text-xl md:text-2xl leading-tight">Plan interactif</p>
          <p className="metadata text-foreground/45 mt-1">Sélectionnez une pièce pour explorer</p>
        </div>
        <div className="flex gap-1 p-1 bg-secondary rounded-full">
          <button
            type="button"
            onClick={() => { setFloor("rdc"); onRoomChange(null) }}
            className={`px-5 py-2 rounded-full metadata transition-colors ${
              floor === "rdc" ? "bg-primary text-background" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            RDC
          </button>
          <button
            type="button"
            onClick={() => { setFloor("etage"); onRoomChange(null) }}
            className={`px-5 py-2 rounded-full metadata transition-colors ${
              floor === "etage" ? "bg-primary text-background" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Étage
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="villa-plan-container relative rounded-sm bg-card border border-border p-6 md:p-10"
      >
        {activeSvg ? (
          <div dangerouslySetInnerHTML={{ __html: activeSvg }} />
        ) : (
          <p className="text-foreground/50 text-center py-16">Plan non disponible</p>
        )}
        {activeRoom && (
          <div className="absolute top-4 right-4 bg-primary text-background px-4 py-2 rounded-full metadata">
            {ROOM_LABELS[activeRoom] || activeRoom}
          </div>
        )}
      </div>
    </div>
  )
}
