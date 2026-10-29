// Contenu propre à la branche design-tasvan : les textes nouveaux donnés
// explicitement dans le brief (plan de paiement, modalité d'acquisition,
// gestion, points forts, pied de page, contact, témoignages). Tout le
// reste (modèles, garanties, transmission, Julie, équipe, FAQ, lieu) vient
// du fichier partagé content/maison-seseh-bali/fr.ts — aucune donnée
// dupliquée.

const tasvanExtra = {
  headerCtaLabel: "Réserver un appel",
  priceToggleLabel: "Voir les autres gammes du projet",
  closeLabel: "Réduire",
  priceNote: "Prix tout compris jusqu'au 31 décembre 2026.",
  planRdcLabel: "Rez-de-chaussée",
  planEtageLabel: "1er étage",
  planNote: "Plan type, variantes selon la parcelle.",
  swipeLabel: (n: number) => `${n} PHOTOS · FAITES GLISSER`,
  modelsCtaLabel: "Recevoir le dossier de cette maison",
  modelsExtraCtaLabel: "Voir les autres gammes du projet",
  roiNote: "Revenus nets estimés : net de gestion et de charges d'exploitation, avant fiscalité, hors plus-value, scénario cible du dossier de prévisions financières.",

  // Textes de remplacement — jamais "Image en attente", toujours ce qui
  // manque précisément.
  pending: {
    team: "Image d'équipe",
    complexe: "Vue du complexe",
    julie: "Portrait de Julie",
    video: "Vidéo de présentation",
    photo: "Photo de la villa",
  },

  // Bande "Le lieu" : vidéo du hero du site principal en fond, lecture
  // automatique, en boucle, sans son, voile sombre par-dessus.
  lelieu: {
    videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/v1783086460/Header_site_u1i0j9.mp4",
    posterSrc: "/villa-exterior.webp",
  },

  payment: {
    overline: "Le financement",
    title: "Plan de paiement",
    intro: [
      "Construction démarrée en septembre 2026, livraison au 3e trimestre 2028.",
      "Chaque versement est effectué sur le compte séquestre du notaire, avec suivi de l'avancement du chantier.",
    ],
    steps: [
      { pct: "1 000 €", title: "Réservation", body: "remboursables jusqu'au 31 décembre 2026" },
      { pct: "50 %", title: "Acte notarié", body: "environ 4 semaines plus tard" },
      { pct: "10 %", title: "Fondations terminées", body: "au rythme du chantier" },
      { pct: "10 %", title: "Gros œuvre terminé", body: "au rythme du chantier" },
      { pct: "10 %", title: "Structure intérieure", body: "au rythme du chantier" },
      { pct: "10 %", title: "Second œuvre", body: "au rythme du chantier" },
      { pct: "10 %", title: "Remise des clés", body: "3e trimestre 2028" },
    ],
  },

  // "Ce que vous possédez" : trois cartes sur le leasehold (plus la carte
  // 7 %, déjà présentée dans les garanties).
  acquisition: {
    overline: "La propriété",
    title: "Ce que vous possédez",
    cards: [
      { value: "30 ans", text: "Un bail notarié, signé devant notaire." },
      { value: "+30 ans", text: "L'extension garantie au contrat, au prix de la seule valeur du terrain." },
      {
        value: "60 ans",
        text: "De jouissance. Votre maison vous appartient, via une société dont vous détenez 100 % des parts, sans prête-nom, et les parts se transmettent à vos enfants.",
      },
    ],
    bottomLine: "Un avocat français indépendant, installé en Indonésie, relit votre contrat. Première consultation offerte.",
  },

  gestion: {
    overline: "La gestion",
    title: "Gestion locative avec SORA",
    intro: "SORA gère votre maison de A à Z, où que vous soyez.",
    stats: [
      { value: "10,2 %", label: "Net constaté en 2025 sur nos villas gérées" },
      { value: "82 %", label: "D'occupation" },
      { value: "93 %", label: "De clients qui réinvestissent" },
    ],
    lines: [
      "Mise en location et tarification",
      "Accueil des voyageurs",
      "Entretien et maintenance",
      "Comptabilité",
      "Rapport de gestion chaque mois",
      "Un bilan par an avec votre conseiller",
    ],
  },

  maison: {
    overline: "La maison",
    title: "Une maison, pas un numéro de lot",
    paragraph1:
      "S'offrir quelque chose de rare : un lieu à soi, que personne d'autre n'aura à l'identique. Diversifier à l'international, dans un projet réel, qui se visite et qui se transmet. Plus qu'un investissement, une maison que l'on habite.",
    paragraph2: "À 300 mètres de la plage de Seseh, 8 minutes de Canggu, dans une résidence privée de 26 villas.",
    ctaLabel: "Être rappelé",
    pointsFortsLabel: "Points forts",
    pointsForts: [
      "À 300 mètres de la plage de Seseh",
      "Résidence privée de 26 villas uniques",
      "Maison individuelle, piscine privée, aucun vis-à-vis",
      "Intérieur conçu avec Julie Chatelain",
      "Livrée meublée et décorée",
      "Gestion SORA de A à Z",
    ],
  },

  equipe: {
    intro: "Deux ingénieurs du BTP, Vinci Energies et Bouygues Construction, installés à Bali.",
  },

  // Les 11 témoignages vidéo de https://www.sora-immobilier.com/temoignages
  // (mêmes vidéos Cloudinary, mêmes citations), dans l'ordre demandé.
  temoignages: {
    listenLabel: "Écouter le témoignage",
    items: [
      {
        firstName: "Jérôme C.",
        quote: "Il a été très clair sur les sujets fiscaux, juridiques, économiques ...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785077238/Je%CC%81ro%CC%82me_Paysage_V2_jefksr.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785077238/Je%CC%81ro%CC%82me_Paysage_V2_jefksr.jpg",
      },
      {
        firstName: "Daniel G.",
        quote: "Ici, on n'est pas dans un projet immo, on est dans un projet de confiance...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785165750/Daniel_Garault_Paysage_xjkpxb.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785165750/Daniel_Garault_Paysage_xjkpxb.jpg",
      },
      {
        firstName: "Clémentine M.",
        quote: "Il y a 3 ans, je n'aurais jamais pensé pouvoir faire ça...",
        videoSrc:
          "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1783822922/Investir_a%CC%80_Bali_Cle%CC%81mentine_raconte_son_expe%CC%81rience_dans_l_immobilier_a%CC%80_Canggu._vycims.mp4",
        poster: "https://cdn.sanity.io/images/tskrd6ze/production/ff9721a2840e4dce097f9878c80d7438e480146e-1918x981.png?rect=589,0,736,981&w=800&h=1067&fit=max&auto=format",
      },
      {
        firstName: "Grégory S.",
        quote: "Si on ne se sert pas de l'expérience d'experts, on passe à côté d'opportunités...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785077239/Gregory_Paysage_V2_ktskzq.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785077239/Gregory_Paysage_V2_ktskzq.jpg",
      },
      {
        firstName: "Jessica P.B.",
        quote: "C'est ta transparence qui a fait que je préfère investir à 12 000km que à coté de chez moi...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785316200/videoplayback_ijdofp.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785316200/videoplayback_ijdofp.jpg",
      },
      {
        firstName: "Samuel D.",
        quote: "C'est simple, on signe le contrat, on verse l'argent, et on récupère son argent...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785165754/Samuel_d3nbnt.mp4",
        poster: "https://cdn.sanity.io/images/tskrd6ze/production/1ae13705ca8fe83bc1f8d9cddeddc9a8c86cf3f2-358x623.png?rect=0,74,358,477&w=800&h=1067&fit=max&auto=format",
      },
      {
        firstName: "Karl-Henry M.",
        quote: "Je suis en train de réfléchir pour investir à nouveau...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785077242/Karl-Henry_Paysage_V2_rvevya.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785077242/Karl-Henry_Paysage_V2_rvevya.jpg",
      },
      {
        firstName: "Youness S.",
        quote: "Soit on réfléchit à l'opportunité, soit  on la saisit...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1783822918/Il_investit_en_3_e%CC%81tapes_cinbuf.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1783822918/Il_investit_en_3_e%CC%81tapes_cinbuf.jpg",
      },
      {
        firstName: "Hicham A.",
        quote: "Faire de l'investissement immo sans être accompagné, c'est une erreur...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785077238/Hicham_Paysage_tq9icm.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785077238/Hicham_Paysage_tq9icm.jpg",
      },
      {
        firstName: "Alexandra G.",
        quote: "Même ceux qui ne sont pas intéressés se sont dit...",
        videoSrc:
          "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1783822919/Bali_a%CC%80_la_hauteur_des_meilleurs_marche%CC%81s_jdkzln.mp4",
        poster: "https://cdn.sanity.io/images/tskrd6ze/production/8bf8857d12a904072c70bcaa0aca07d68cb7f29b-3372x5058.jpg?rect=422,785,2528,3372&w=800&h=1067&fit=max&auto=format",
      },
      {
        firstName: "Sébastien R.",
        quote: "Il y a de réelles opportunités de business pour les personnes ici...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785165750/SEBASTIEN_CLIP_txnyov.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785165750/SEBASTIEN_CLIP_txnyov.jpg",
      },
    ],
  },

  contact: {
    overline: "L'entretien",
    title: "Demander un entretien privé",
    intro: "Quelques questions, puis un rappel de l'équipe.",
    formTitle: "Demander un entretien privé",
    formHint: "Plans, prix par villa, disponibilités et étude de rentabilité détaillée.",
    photoSrc: "/seseh/contact-bg.webp",
  },

  footer: {
    columns: [
      {
        heading: "SORA Immobilier",
        lines: [{ label: "Seseh Sunset Villas, Bali" }],
      },
      {
        heading: "Contact",
        lines: [
          { label: "contact@sora-immobilier.com", href: "mailto:contact@sora-immobilier.com" },
          { label: "Mentions légales", href: "/mentions-legales" },
        ],
      },
      {
        heading: "Le lieu",
        lines: [{ label: "Seseh, Bali" }],
      },
    ],
    disclaimerLines: [
      "Visuels non contractuels.",
      "Revenus estimés, pas une garantie, sauf la garantie de revenus contractuelle.",
      "Prix tout compris, hors 1 % de frais de mutation et 800 € de création de société.",
    ],
  },
}

export default tasvanExtra
