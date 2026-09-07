import Studio from "./Studio"

// Le layout racine est en dynamic = "force-dynamic" (cookie de langue lu à
// chaque requête). "force-static" ici entrait en conflit avec ça et faisait
// planter la route (Error: Dynamic server usage / DYNAMIC_SERVER_USAGE) —
// Studio est un outil client-side de toute façon, il n'a rien à gagner à
// être statique.
export { metadata, viewport } from "next-sanity/studio"

export default function StudioPage() {
  return <Studio />
}
