// Injecte des transformations Cloudinary (f_auto, q_auto, w_...) dans une URL
// existante, sans casser ni dupliquer des transformations déjà présentes.
// Objectif : réduire la bande passante Cloudinary (format/qualité/poids
// adaptés) sans changer les public IDs ni le rendu visuel.

function isTransformSegment(segment: string): boolean {
  return segment.split(",").every((part) => /^[a-z]{1,3}_[a-zA-Z0-9.:]+$/.test(part))
}

function injectTransform(url: string, resourceType: "image" | "video", extra: string): string {
  const marker = `/${resourceType}/upload/`
  const idx = url.indexOf(marker)
  if (idx === -1) return url

  const prefix = url.slice(0, idx + marker.length)
  const rest = url.slice(idx + marker.length)
  const [firstSegment, ...restSegments] = rest.split("/")

  if (isTransformSegment(firstSegment)) {
    const existingKeys = new Set(firstSegment.split(",").map((p) => p.split("_")[0]))
    const newParts = extra.split(",").filter((p) => !existingKeys.has(p.split("_")[0]))
    const merged = newParts.length ? `${firstSegment},${newParts.join(",")}` : firstSegment
    return prefix + [merged, ...restSegments].join("/")
  }

  return prefix + [extra, firstSegment, ...restSegments].join("/")
}

/** f_auto + q_auto sur une vidéo Cloudinary (format et qualité adaptés au client). */
export function cloudinaryVideoUrl(url: string): string {
  if (!url.includes("res.cloudinary.com")) return url
  return injectTransform(url, "video", "f_auto,q_auto")
}

/**
 * q_auto seul, sans f_auto — pour les <source type="video/mp4"> sans repli,
 * où changer de format casserait la lecture sur certains navigateurs.
 */
export function cloudinaryVideoUrlSafeFormat(url: string): string {
  if (!url.includes("res.cloudinary.com")) return url
  return injectTransform(url, "video", "q_auto")
}

/** f_auto + q_auto + largeur adaptée pour un poster JPG dérivé d'une vidéo Cloudinary. */
export function cloudinaryPosterUrl(url: string, width: number): string {
  if (!url.includes("res.cloudinary.com")) return url
  return injectTransform(url, "video", `f_auto,q_auto,w_${width}`)
}

/**
 * Pour les vidéos témoignages sources en .mov (souvent HEVC/QuickTime, 30-50 Mo) :
 * force la sortie en .mp4 (transcodage Cloudinary à la volée, indépendant du
 * f_auto/négociation par Accept header), plafonne la résolution à la taille
 * réelle d'affichage (carte de témoignage, jamais plus grand qu'un cadre
 * ~720x1280 même en 2x retina) via c_limit — qui ne rogne ni n'agrandit,
 * juste un plafond — et laisse Cloudinary choisir le codec le plus efficace.
 */
export function cloudinaryOptimizedTestimonialVideoUrl(url: string): string {
  if (!url.includes("res.cloudinary.com")) return url
  const withMp4Extension = url.replace(/\.(mov|mp4|m4v|webm)$/i, ".mp4")
  return injectTransform(withMp4Extension, "video", "q_auto,vc_auto,w_720,h_1280,c_limit")
}
