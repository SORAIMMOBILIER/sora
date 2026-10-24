import type { MaisonSesehBaliContent } from "./types"

const content: MaisonSesehBaliContent = {
  meta: {
    title: "Une maison à Seseh, Bali | SORA Immobilier",
    description:
      "Une maison privée à 300 m de l'océan, dessinée avec vous, gérée quand vous n'y êtes pas, transmise à vos enfants. Entretien privé sur demande.",
  },
  nav: {
    switchLabel: "EN",
  },
  footer: {
    disclaimer: "Visuels non contractuels.",
    mentionsLegalesLabel: "Mentions légales",
    contactEmail: "contact@sora-immobilier.com",
  },
  hero: {
    overline: "SESEH, BALI · UNE COLLECTION DE MAISONS PRIVÉES, ENTRE RIZIÈRES ET OCÉAN",
    title: "Votre capital dort sur un compte. Il pourrait avoir une adresse, à 300 mètres de l'océan.",
    subtitle:
      "SORA conçoit, construit et gère une collection de maisons privées à Seseh. La vôtre : dessinée avec vous, à vivre en famille, louée et entretenue par notre équipe quand vous n'y êtes pas, et transmise à vos enfants dans un cadre vérifié par un avocat français indépendant, installé en Indonésie.",
    videoUrl: undefined,
    posterImage: "/seseh/signature/exterior.webp",
    ctaLabel: "Demander un entretien privé",
    ctaNote: "Un premier entretien de 30 minutes en visio avec l'équipe SORA. Sans engagement.",
    bandItems: [
      "Conçu par des ingénieurs",
      "Structure garantie 10 ans",
      "54 villas livrées ou en construction",
      "93 % de clients qui réinvestissent",
    ],
  },
  section2: {
    overline: "Le bon moment",
    title: "Le moment où l'on peut enfin choisir.",
    screenLines: [
      "S'offrir quelque chose de rare : un lieu à soi, que personne d'autre n'aura à l'identique.",
      "Diversifier à l'international, dans un projet réel, qui se visite et qui se transmet.",
      "Plus qu'un investissement, une maison que l'on habite.",
    ],
    paragraphs: [
      "Après une cession, une vente ou une très belle année, l'envie est légitime : s'offrir quelque chose de rare. Un lieu à soi, dessiné pour soi, que personne d'autre n'aura à l'identique. Une maison au soleil, où la famille se retrouve et où les amis restent une semaine.",
      "Vous avez déjà investi en France. Vous voulez maintenant diversifier à l'international, dans un projet réel, qui se visite et qui se transmet.",
      "Et plus qu'un investissement, une maison que l'on habite. Vous y passez vos vacances, vos enfants y prennent leurs habitudes, et le reste de l'année, elle rapporte sans vous demander de temps. C'est exactement ce que nous construisons à Seseh.",
    ],
  },
  section3: {
    overline: "La maison",
    title: "Une maison, pas un numéro de lot.",
    image: "/seseh/exception/exterior.webp",
    screenLines: [
      "À 300 mètres de l'océan, dans une résidence privée.",
      "À 8 minutes de Canggu, entre rizières et plage.",
    ],
    paragraphs: [
      "Seseh est un village de la côte sud, à 8 minutes de Canggu et à l'écart de son agitation. Les rizières descendent jusqu'à la plage. Votre maison est à 300 mètres de l'océan, dans une résidence privée : sécurité, services, et une équipe sur place toute l'année.",
      "Chaque maison de la collection est individuelle. Sa piscine, sa terrasse, ses volumes ouverts sur le jardin. L'intérieur est conçu avec Julie Chatelain, architecte d'intérieur publiée dans Art et Décoration : vous choisissez avec elle les matières, les teintes, le mobilier. Aucune autre maison n'aura le même intérieur que la vôtre.",
      "Une maison pensée pour recevoir : des chambres pour la famille, de l'espace pour les amis, une terrasse pour les soirées qui durent. Une adresse que l'on garde, et où l'on revient.",
    ],
  },
  julie: {
    overline: "L'intérieur",
    title: "Un intérieur qui n'existe qu'une fois.",
    screenLines: [
      "Conçu avec Julie Chatelain, architecte d'intérieur publiée dans Art et Décoration.",
      "Matières, teintes, mobilier : la vôtre ne ressemblera à aucune autre.",
    ],
    image: undefined,
  },
  models: [
    {
      name: "Signature",
      specLine: "2 ou 3 chambres, une chambre supplémentaire en option · 153 m² · piscine privée",
      gallery: [
        { src: "/seseh/signature/exterior.webp", alt: "Façade d'une villa Signature à Seseh" },
        { src: "/seseh/signature/dining.webp", alt: "Salle à manger d'une villa Signature à Seseh" },
      ],
      planImage: "/plans/signature-rdc.svg",
      planAlt: "Plan du rez-de-chaussée, villa Signature",
      priceLabel: "369 000 € tout compris",
      priceNote: "385 000 € au 1er janvier 2027",
      stats: [
        { value: "2 ou 3", label: "Chambres" },
        { value: "153 m²", label: "Surface" },
        { value: "25 830 €", label: "Garantis par an" },
      ],
      features: [
        "Piscine privée",
        "Intérieur conçu avec Julie Chatelain",
        "Livrée meublée et décorée",
        "Chambre supplémentaire en option",
      ],
    },
    {
      name: "Exception",
      specLine: "2 ou 3 chambres, une chambre supplémentaire en option · 197 m² · piscine privée",
      gallery: [
        { src: "/seseh/exception/exterior.webp", alt: "Façade d'une villa Exception à Seseh" },
        { src: "/seseh/exception/living.webp", alt: "Salon d'une villa Exception à Seseh" },
        { src: "/seseh/exception/bedroom.webp", alt: "Chambre d'une villa Exception à Seseh" },
        { src: "/seseh/exception/kitchen.webp", alt: "Cuisine d'une villa Exception à Seseh" },
        { src: "/seseh/exception/bathroom.webp", alt: "Salle de bain d'une villa Exception à Seseh" },
      ],
      planImage: "/plans/exception-rdc.svg",
      planAlt: "Plan du rez-de-chaussée, villa Exception",
      priceLabel: "469 000 € tout compris",
      priceNote: "489 000 € au 1er janvier 2027",
      stats: [
        { value: "2 ou 3", label: "Chambres" },
        { value: "197 m²", label: "Surface" },
        { value: "32 830 €", label: "Garantis par an" },
      ],
      features: [
        "Piscine privée",
        "Intérieur conçu avec Julie Chatelain",
        "Livrée meublée et décorée",
        "Chambre supplémentaire en option",
      ],
    },
  ],
  modelsNote: "Certaines maisons, déjà livrées ou hors catalogue, ne sont présentées qu'en entretien.",
  modelsCtaLabel: "Demander un entretien privé",
  section4: {
    overline: "Les revenus",
    title: "Une résidence secondaire qui rapporte, au lieu de coûter.",
    stats: [
      { value: "10,2 %", label: "Net constaté en 2025" },
      { value: "82 %", label: "D'occupation" },
      { value: "7 %", label: "Net garantis 3 ans" },
    ],
    screenLine: "Vous choisissez vos dates, SORA loue le reste de l'année.",
    paragraphs: [
      "Vous choisissez vos dates. Le reste du temps, SORA loue votre maison à des voyageurs qui recherchent précisément une villa privée, à pied de la plage, à 8 minutes de Canggu.",
      "Les villas que nous gérons ont dégagé 10,2 % net en 2025, avec 82 % d'occupation. C'est un historique, celui de nos clients. Pas une projection.",
      "Les trois premières années de location, votre résultat net est garanti à 7 % par an minimum, net de gestion et de charges, avant fiscalité. En cas de résultat inférieur, SORA verse la différence. Au-delà, l'intégralité vous revient.",
      "Vous n'avez rien à organiser. SORA conçoit la maison, la construit, la meuble, la met en location, fixe les prix, accueille les voyageurs, l'entretient, tient la comptabilité, et la revend le jour où vous le décidez. Votre seul rendez-vous : un bilan annuel avec votre conseiller, pour fixer vos dates et les arbitrages de l'année. Le reste du temps, vous êtes informé sans avoir à demander : un point de chantier chaque semaine pendant la construction, puis un rapport de gestion chaque mois, loyers, charges et résultat net.",
    ],
  },
  gestion: {
    overline: "La gestion",
    title: "Rien à organiser.",
    bullets: [
      "Mise en location",
      "Accueil des voyageurs",
      "Entretien",
      "Comptabilité",
      "Rapport de gestion chaque mois",
      "Un bilan par an avec votre conseiller",
    ],
  },
  section5: {
    overline: "La transmission",
    title: "Ce que vous possédez.",
    cartouches: [
      "Bail notarié 30 ans + 30 ans garantis",
      "Société détenue à 100 %, sans prête-nom",
      "Transmissible à vos enfants",
      "Un avocat indépendant, première consultation offerte",
    ],
    paragraphs: [
      "On vous le dit tel que c'est. Un étranger ne peut pas acheter le sol à Bali. Il achète un droit d'usage du terrain. Sur Seseh Sunset Villas, c'est un bail notarié de 30 ans, plus 30 ans d'extension garantis dans le contrat. Le renouvellement porte sur le seul terrain, environ 20 % du prix, et si ce prix fait débat, trois experts indépendants le fixent. La maison, elle, est à vous, détenue par une société dont vous possédez 100 % des parts. Pas de prête-nom. C'est le régime standard des propriétaires étrangers à Bali.",
      "Pour la transmission, nous ne jouons pas à l'avocat. Nous vous mettons en relation avec un avocat français indépendant, installé en Indonésie. Il lit votre contrat, vous explique comment la maison se transmet à vos enfants, et reste votre interlocuteur, quoi qu'il arrive. La première consultation est offerte.",
    ],
  },
  team: {
    overline: "L'équipe",
    title: "Nous faire confiance à 12 000 kilomètres.",
    photo: undefined,
    quote: "À 12 000 kilomètres, on ne vous demande pas de nous croire. On vous montre comment on travaille.",
    name: "Gabriel Lapierre",
    role: "cofondateur",
    stats: [
      { value: "54", label: "Villas livrées ou en construction" },
      { value: "100 %", label: "Dans les délais annoncés" },
      { value: "10 ans", label: "Structure garantie" },
      { value: "93 %", label: "De clients qui réinvestissent" },
    ],
    screenLine: "Deux ingénieurs du BTP, passés par Vinci Energies et Bouygues Construction.",
    detail: {
      overline: "La confiance",
      title: "Nous faire confiance à 12 000 kilomètres.",
      paragraphs: [
        "SORA, ce sont deux ingénieurs du BTP. Gabriel Lapierre, passé par Vinci Energies. Nitham Lapierre, passée par Bouygues Construction. Installés à Bali depuis quatre ans, nous y construisons avec les méthodes et les exigences que nous appliquions sur ces chantiers-là.",
        "Nos réalisations : 28 villas livrées, 26 en construction, 4 projets. Nous avons construit, loué, revendu, et 93 % de nos clients réinvestissent chez nous.",
        "Ce que vous ne verrez pas sur les photos, et qui compte dans vingt ans : une climatisation dimensionnée par un ingénieur, une isolation réelle, des matériaux choisis pour l'humidité tropicale. Une maison qui consomme moins, s'entretient moins, et que vos enfants n'auront pas à rénover.",
      ],
      engagementsIntro: "Nos engagements, dans votre contrat :",
      engagements: [
        "10 ans de garantie sur la structure, 5 ans sur la toiture, 1 an sur tout le reste, mobilier compris.",
        "La loi indonésienne n'impose aucune garantie décennale. Nous la proposons quand même.",
        "Un maître d'œuvre indépendant, d'origine européenne, contrôle chaque étape du chantier.",
        "Au-delà de trois mois après la date de livraison, des pénalités de retard vous sont versées.",
      ],
    },
  },
  section7: {
    overline: "Témoignages",
    title: "Ils se posaient les mêmes questions que vous.",
    testimonials: [],
    ctaLabel: "Demander un entretien privé",
  },
  section8: {
    overline: "L'accès",
    title: "Comment on travaille ensemble.",
    intro: "L'accès à l'équipe passe par quelques questions. C'est ce qui nous permet de consacrer à chaque projet le temps qu'il mérite.",
    steps: [
      {
        title: "Quelques questions, 2 minutes.",
        body: "Pour savoir si nous sommes faits pour travailler ensemble, et préparer l'entretien.",
      },
      {
        title: "Un membre de l'équipe vous rappelle et fixe un premier entretien.",
        body: "30 minutes en visio. Votre projet, votre horizon, la collection, vos questions. Si ce n'est pas pour vous, on vous le dit.",
      },
      {
        title: "Deuxième entretien.",
        body: "Les plans, le prévisionnel, le contrat, l'avocat si vous le souhaitez. Vous choisissez votre maison et sa parcelle sur le plan, premier arrivé, premier servi.",
      },
      {
        title: "Vous réservez avec 1 000 €, remboursables sans condition jusqu'au 31 décembre 2026.",
        body: "La maison est bloquée, le prix 2026 aussi. L'acte notarié suit sous un mois, le paiement s'étale au rythme du chantier, les clés sont prévues au troisième trimestre 2028.",
      },
    ],
  },
  lieu: {
    overline: "Le lieu",
    title: "Seseh, entre rizières et océan.",
    entries: [
      { place: "Plage de Seseh", distance: "300 m", photoSrc: undefined },
      { place: "Canggu", distance: "8 min", photoSrc: undefined },
      { place: "Pererenan", distance: undefined },
      { place: "Tanah Lot", distance: undefined },
      { place: "Aéroport", distance: undefined },
    ],
  },
  section10: {
    overline: "Le marché",
    title: "Bali en 2027.",
    screenLines: [
      "L'Indonésie tient une croissance d'environ 5 % par an.",
      "Bali : près de 7 millions de visiteurs en 2025, un record pour la deuxième année consécutive.",
      "Le 1er janvier 2027, la Signature passe à 385 000 € et l'Exception à 489 000 €.",
    ],
    ctaLabel: "Demander un entretien privé",
    paragraphs: [
      "L'Indonésie, quatrième pays le plus peuplé du monde, tient une croissance d'environ 5 % par an, 5,12 % au deuxième trimestre 2025, 5,04 % au troisième. Bali vient d'enregistrer près de 7 millions de visiteurs étrangers en 2025, en hausse de 9,7 % sur un an, un record pour la deuxième année consécutive. Sur l'île, les prix de l'immobilier progressent d'environ 7 % par an, et les terrains à 300 mètres de la mer ne se multiplient pas.",
      "Nous ne vendons pas la plus-value. Dans nos calculs, elle vaut zéro. Mais la villa Pererenan, achetée 299 000 €, s'est revendue 330 000 € deux ans plus tard.",
      "Le 1er janvier 2027, la Signature passe de 369 000 € à 385 000 € et l'Exception de 469 000 € à 489 000 €. Si vous souhaitez acquérir votre maison avant la hausse, répondez aux quelques questions ci-dessous. L'équipe vous rappelle.",
    ],
    priceChangeNote: "",
    sources: [
      { label: "BPS Statistics Indonesia (PIB T2 et T3 2025)" },
      { label: "BPS Bali (arrivées 2025)" },
      { label: "Rapport Horwath HTL / Bali Hotels Association (record 2025)" },
    ],
  },
  section11: {
    overline: "Entretien privé",
    title: "Quelques questions avant de nous appeler.",
    embedCode: undefined,
  },
  section9: {
    overline: "Questions fréquentes",
    title: "Ce que vous voulez savoir avant l'entretien.",
    items: [
      {
        q: "Je ne suis jamais allé à Bali. Dois-je y aller avant d'acheter ?",
        a: "Non. Beaucoup de nos clients ont acheté sans venir, sur plans, rendus, suivi de chantier en ligne et échanges avec l'équipe. Si vous préférez voir, nous organisons une visite des villas livrées et du chantier.",
      },
      {
        q: "Combien de temps puis-je séjourner dans ma maison ?",
        a: "Autant que vous le souhaitez, c'est la vôtre. Vos séjours sont simplement déduits du plancher de revenus, au prorata des semaines occupées.",
      },
      {
        q: "Et si je préfère ne pas la louer du tout ?",
        a: "C'est possible. Le plancher de revenus s'applique uniquement lorsque la maison est louée et gérée par SORA.",
      },
      {
        q: "Qui s'occupe de la maison quand je n'y suis pas ?",
        a: "SORA, sur place : location, accueil, entretien, ménage, comptabilité, et un rapport de gestion chaque mois. Rachel dirige une entreprise du bâtiment à Paris, un million de chiffre d'affaires, tout repose sur elle. Elle connaît la chaudière qui lâche et l'appel du dimanche soir, et sa conviction était faite : plus jamais d'immobilier en France. Sa première réaction sur Bali : gérer une villa à 12 000 kilomètres, non merci. Sauf qu'elle n'a rien à gérer. Villa à Canggu, 299 000 € clé en main. Elle a signé et elle est retournée à sa vie : 24 000 € nets par an, environ 8 % net, sans un check-in, sans une ampoule changée. Un an plus tard, elle est revenue d'elle-même en prendre une deuxième, à Seseh.",
      },
      {
        q: "Comment fonctionne la garantie de revenus ?",
        a: "Pendant les 36 premiers mois de location, SORA vous garantit un résultat net d'au moins 7 % par an du prix d'achat, soit 25 830 € par an sur une Signature et 32 830 € sur une Exception. Le résultat garanti est le résultat net d'exploitation : les loyers, moins les frais de gestion et les charges, avant fiscalité. Chaque fin d'année, nous comparons le résultat réel à ce plancher. S'il est inférieur, SORA verse la différence. S'il est supérieur, tout vous revient. La garantie s'applique avec la gestion SORA, et vos séjours sont déduits au prorata. Pourquoi 7 % quand nos villas ont fait 10,2 % en 2025 ? Parce qu'un plancher se fixe bas pour être tenu.",
      },
      {
        q: "Que comprend exactement le prix ?",
        a: "Tout : le terrain, la construction, le mobilier, les permis. La maison est livrée meublée et décorée. À prévoir en plus : 1 % de frais de mutation, l'équivalent des frais de notaire, et 800 € pour la création de votre société, la PT PMA.",
      },
      {
        q: "Ai-je besoin d'une assurance ?",
        a: "Oui, et elle est à votre charge. Une assurance multirisque couvre la maison et son mobilier : incendie, vol, vandalisme, dégâts des eaux, tempêtes, inondations, séismes, tsunamis, éruptions volcaniques. À titre de repère, l'assurance de l'une de nos villas de 160 m², assurée 261 000 €, coûte environ 725 € par an. Nous vous mettons en relation avec l'assureur à la livraison.",
      },
      {
        q: "Puis-je personnaliser l'extérieur ?",
        a: "L'architecture et le plan de la résidence sont figés, c'est ce qui garantit la cohérence de l'ensemble. Vous choisissez votre maison et sa parcelle sur le plan, et vous concevez l'intérieur avec Julie.",
      },
      {
        q: "Comment se passe le paiement ?",
        a: "1 000 € à la réservation, remboursables sans condition jusqu'au 31 décembre 2026. 50 % à l'acte notarié, environ quatre semaines plus tard. Puis un appel de fonds à chaque étape du chantier, et 10 % à la remise des clés. Une remise de 5 % est accordée pour 90 % payés à la signature, sur les signatures 2026.",
      },
      {
        q: "Quand la maison est-elle livrée, et comment suivre le chantier ?",
        a: "Livraison prévue au troisième trimestre 2028. Vous recevez un point d'avancement chaque semaine, en ligne, sur votre espace personnel dédié.",
      },
      {
        q: "Et si le chantier prend du retard ?",
        a: "Trois mois de grâce après la date prévue, puis des pénalités journalières versées à vous, écrites dans le contrat.",
      },
      {
        q: "Mes enfants pourront-ils en hériter ?",
        a: "Oui. C'est précisément le sujet que l'avocat indépendant traite avec vous. Nous préférons que vous ayez l'avis de quelqu'un qui ne dépend pas de nous, et qui répond précisément à vos questions, selon votre situation.",
      },
      {
        q: "Et si je veux revendre un jour ?",
        a: "Oui, et nous l'avons déjà fait. Samuel avait acheté un loft sur plan à Canggu, 99 000 € clé en main : un plan, des rendus 3D, une date de livraison. Pendant le chantier, le marché a fait son travail. D'autres acheteurs voulaient un bien terminé, prêt à encaisser dès le mois suivant, et acceptaient de payer plus pour ne pas attendre dix-huit mois. À la livraison, nous lui avons posé la question : garder, ou vendre ? Il a vendu. Acheté 99 000 €, ressorti à 115 000 € en moins d'un an, sans avoir vu passer un seul voyageur. Il n'a pas rapatrié l'argent : il l'a réinvesti aussitôt à Seseh.",
      },
      {
        q: "Quelle fiscalité s'applique ?",
        a: "La fiscalité indonésienne est intégrée au prévisionnel que vous recevez en entretien. Pour votre situation personnelle en France, en Belgique ou en Suisse, l'avocat indépendant vous conseille.",
      },
      {
        q: "Puis-je venir accompagné de mon expert-comptable ou de mon avocat ?",
        a: "Oui, et nous vous y encourageons.",
      },
    ],
  },
  stickyBar: {
    ctaLabel: "Demander un entretien privé",
  },
}

export default content
