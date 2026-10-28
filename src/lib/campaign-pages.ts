// Pages de campagne Meta Ads, invisibles depuis le site (noindex, aucun
// lien entrant — voir next.config.ts). Liste centralisée pour que chaque
// endroit qui doit distinguer "page de campagne" du reste du site (pixel,
// i18n, layout racine, navbar) lise la même source. La page B
// (/villa-seseh-bali) est listée par anticipation — route pas encore
// construite, ce fichier ne fait que préparer le branchement.
export const CAMPAIGN_PATHNAMES = [
  "/maison-seseh-bali",
  "/en/home-seseh-bali",
  "/villa-seseh-bali",
  "/en/villa-seseh-bali",
] as const

export function isCampaignPathname(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return (CAMPAIGN_PATHNAMES as readonly string[]).includes(pathname)
}
