// Données produit partagées entre /live-SSV et /SSV/allez-plus-loins.
// Chiffres confirmés depuis villas-ssv/page.tsx et le document Sanity "seseh".

export const GAMMES = [
  { name: "Élégance", price: "149 000 €", surface: "51 m²", chambres: "1 chambre", equipement: "Jacuzzi privé" },
  { name: "Prestige", price: "239 000 €", surface: "80 m²", chambres: "2 chambres", equipement: "Piscine privée" },
  { name: "Signature", price: "369 000 €", surface: "153 m²", chambres: "2 chambres premium", equipement: "Piscine privée" },
  { name: "Exception", price: "469 000 €", surface: "197 m²", chambres: "3 chambres", equipement: "Piscine privée" },
] as const

export const GARANTIES = [
  { label: "Garantie structure", value: "10 ans", description: "Fondations, murs porteurs, charpente" },
  { label: "Garantie toiture", value: "5 ans", description: "Étanchéité et couverture complète" },
  { label: "Garantie intégrale", value: "1 an", description: "Tout équipement, finitions, installations" },
] as const

export const CONFIANCE_PARTENAIRES = [
  "Assurance Allianz (construction et exploitation)",
  "Maître d'œuvre Vienna Lux Cooperation, fondée par un architecte-constructeur allemand fort de 30 ans d'expérience",
  "Cabinet juridique partenaire ILA Consulting (francophone à Bali)",
  "Design intérieur signé Julie Chatelain",
] as const

export const CREDIBILITE = {
  projets: "4 projets",
  villas: "28 villas livrées + 26 en construction",
  investisseurs: "100+ investisseurs accompagnés",
  roadshows: "Roadshows Paris, Biarritz, Bruxelles, Genève",
}

export const CALENDLY_URL =
  "https://calendly.com/contact-sora-immobilier/rdv-avec-gabriel-investir-a-bali?utm_source=replay-webinaire&hide_gdpr_banner=1"

export const WHATSAPP_URL =
  "https://wa.me/33623676723?text=J%27ai%20vu%20le%20replay%20du%20webinaire%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20projet%20Seseh%20Sunset%20Villas."

export const DOSSIER_URL = "/realisations/seseh#dossier"
