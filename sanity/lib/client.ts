import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId } from "../env"

// Sur un déploiement "preview" Vercel (branche autre que main), on affiche
// aussi les brouillons Sanity — pratique pour partager un lien de prévisualisation
// avant publication. En production, uniquement le contenu publié.
const isPreviewDeployment = process.env.VERCEL_ENV === "preview"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !isPreviewDeployment,
  ...(isPreviewDeployment ? { token: process.env.SANITY_API_TOKEN, perspective: "drafts" as const } : { perspective: "published" as const }),
  stega: { studioUrl: "/studio" },
})
