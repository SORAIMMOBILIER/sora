// English mirror of tasvan-extra-fr.ts — same structure, same media
// (Cloudinary videos, photos), only the text is translated. See
// tasvan-extra-fr.ts for the French original and the rationale.

const tasvanExtra = {
  headerCtaLabel: "Book a call",
  priceToggleLabel: "See the other models in the project",
  closeLabel: "Collapse",
  priceNote: "All-inclusive prices until 31 December 2026.",
  planRdcLabel: "Ground floor",
  planEtageLabel: "1st floor",
  planNote: "Standard plan, variations depending on the plot.",
  swipeLabel: (n: number) => `${n} PHOTOS · SWIPE`,
  modelsCtaLabel: "Receive this house's file",
  modelsExtraCtaLabel: "See the other models in the project",
  roiNote: "Estimated net income: net of management and operating costs, before tax, excluding capital gains, target scenario from the financial forecast.",

  pending: {
    team: "Team photo",
    complexe: "View of the estate",
    julie: "Portrait of Julie",
    video: "Introduction video",
    photo: "Photo of the villa",
  },

  lelieu: {
    videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/v1783086460/Header_site_u1i0j9.mp4",
    posterSrc: "/villa-exterior.webp",
  },

  payment: {
    overline: "Financing",
    title: "Payment plan",
    intro: [
      "Construction started in September 2026, delivery in Q3 2028.",
      "Every payment goes through the notary's escrow account, with construction progress tracked at each step.",
    ],
    steps: [
      { pct: "€1,000", title: "Reservation", body: "refundable until 31 December 2026" },
      { pct: "50%", title: "Notarised deed", body: "around 4 weeks later" },
      { pct: "10%", title: "Foundations completed", body: "as construction progresses" },
      { pct: "10%", title: "Shell completed", body: "as construction progresses" },
      { pct: "10%", title: "Interior structure", body: "as construction progresses" },
      { pct: "10%", title: "Second-fix works", body: "as construction progresses" },
      { pct: "10%", title: "Handover", body: "Q3 2028" },
    ],
  },

  acquisition: {
    overline: "Ownership",
    title: "What you own",
    cards: [
      {
        value: "60 years",
        text: "A notarised 30-year lease, plus a further 30 years of extension guaranteed in the contract, at the price of the land alone.",
      },
      {
        value: "PT PMA",
        text: "Your Indonesian company, in which you hold 100% of the shares, no nominee. It holds the villa and the lease.",
      },
      {
        value: "Succession",
        text: "It's the shares of your company that pass to your children, with no inheritance tax in Indonesia. An independent French lawyer guides you, first consultation complimentary.",
      },
    ],
  },

  gestion: {
    overline: "Management",
    title: "Rental management with SORA",
    intro: "SORA manages your house from A to Z, wherever you are.",
    stats: [
      { value: "10.2%", label: "Net, recorded in 2025 on our managed villas" },
      { value: "82%", label: "Occupancy" },
      { value: "93%", label: "Of clients who reinvest" },
    ],
    lines: [
      "Listing and pricing",
      "Guest welcome",
      "Maintenance and upkeep",
      "Accounting",
      "Monthly management report",
      "An annual review with your advisor",
    ],
  },

  maison: {
    overline: "The house",
    title: "A house, not a lot number",
    paragraph1:
      "Own something rare: a place of your own, that no one else will have quite the same. Diversify internationally, into something real: a project you can visit, and pass on. More than an investment, a house you'll actually live in.",
    paragraph2: "300 metres from Seseh beach, 8 minutes from Canggu, inside a private estate of 26 villas.",
    ctaLabel: "Request a call back",
    pointsFortsLabel: "Highlights",
    pointsForts: [
      "300 metres from Seseh beach",
      "Private estate of 26 unique villas",
      "Detached house, private pool, no overlooking neighbours",
      "Interior designed with Julie Chatelain",
      "Delivered furnished and decorated",
      "SORA management, A to Z",
    ],
  },

  equipe: {
    intro: "Two construction engineers, Vinci Energies and Bouygues Construction, based in Bali for 4 years.",
    founders: [
      {
        name: "Gabriel Lapierre",
        role: "co-founder and CEO",
        portrait: "/gabriel-lapierre.webp",
        bio: "Engineer, investing since 2019, based in Bali since 2023. I spent months studying the rules and meeting hundreds of people before putting the team together. A first project of 9 villas with our circle of investors, now rented out, then 19 more. I run every project from launch to handover: construction, site follow-up, investor support.",
      },
      {
        name: "Nitham Lapierre",
        role: "co-founder and head of development",
        portrait: "/nitham-lapierre.webp",
        bio: "Engineer, trained at Bouygues Construction. A good project is decided before the first dig: I study the land and the markets, build each project through to launch, and manage our relationships with local partners.",
      },
    ],
  },

  // Same 11 video testimonials as the French version — same Cloudinary
  // videos, captions translated for the EN reader (audio stays French).
  temoignages: {
    listenLabel: "Listen to the testimonial",
    items: [
      {
        firstName: "Jérôme C.",
        quote: "He was very clear on the tax, legal and economic questions...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785077238/Je%CC%81ro%CC%82me_Paysage_V2_jefksr.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785077238/Je%CC%81ro%CC%82me_Paysage_V2_jefksr.jpg",
      },
      {
        firstName: "Daniel G.",
        quote: "Here, it's not a property deal, it's a relationship of trust...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785165750/Daniel_Garault_Paysage_xjkpxb.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785165750/Daniel_Garault_Paysage_xjkpxb.jpg",
      },
      {
        firstName: "Clémentine M.",
        quote: "Three years ago, I never thought I could do this...",
        videoSrc:
          "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1783822922/Investir_a%CC%80_Bali_Cle%CC%81mentine_raconte_son_expe%CC%81rience_dans_l_immobilier_a%CC%80_Canggu._vycims.mp4",
        poster: "https://cdn.sanity.io/images/tskrd6ze/production/ff9721a2840e4dce097f9878c80d7438e480146e-1918x981.png?rect=589,0,736,981&w=800&h=1067&fit=max&auto=format",
      },
      {
        firstName: "Grégory S.",
        quote: "If you don't draw on experts' experience, you miss opportunities...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785077239/Gregory_Paysage_V2_ktskzq.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785077239/Gregory_Paysage_V2_ktskzq.jpg",
      },
      {
        firstName: "Jessica P.B.",
        quote: "It's your transparency that made me prefer investing 12,000km away over right next to home...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785316200/videoplayback_ijdofp.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785316200/videoplayback_ijdofp.jpg",
      },
      {
        firstName: "Samuel D.",
        quote: "It's simple: you sign the contract, you pay in, and you get your money back...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785165754/Samuel_d3nbnt.mp4",
        poster: "https://cdn.sanity.io/images/tskrd6ze/production/1ae13705ca8fe83bc1f8d9cddeddc9a8c86cf3f2-358x623.png?rect=0,74,358,477&w=800&h=1067&fit=max&auto=format",
      },
      {
        firstName: "Karl-Henry M.",
        quote: "I'm already thinking about investing again...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785077242/Karl-Henry_Paysage_V2_rvevya.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785077242/Karl-Henry_Paysage_V2_rvevya.jpg",
      },
      {
        firstName: "Youness S.",
        quote: "Either you think about the opportunity, or you take it...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1783822918/Il_investit_en_3_e%CC%81tapes_cinbuf.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1783822918/Il_investit_en_3_e%CC%81tapes_cinbuf.jpg",
      },
      {
        firstName: "Hicham A.",
        quote: "Investing in property without support is a mistake...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785077238/Hicham_Paysage_tq9icm.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785077238/Hicham_Paysage_tq9icm.jpg",
      },
      {
        firstName: "Alexandra G.",
        quote: "Even people who weren't interested thought...",
        videoSrc:
          "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1783822919/Bali_a%CC%80_la_hauteur_des_meilleurs_marche%CC%81s_jdkzln.mp4",
        poster: "https://cdn.sanity.io/images/tskrd6ze/production/8bf8857d12a904072c70bcaa0aca07d68cb7f29b-3372x5058.jpg?rect=422,785,2528,3372&w=800&h=1067&fit=max&auto=format",
      },
      {
        firstName: "Sébastien R.",
        quote: "There are real business opportunities here for people...",
        videoSrc: "https://res.cloudinary.com/dfpaw573r/video/upload/q_auto,vc_auto,w_720,h_1280,c_limit/v1785165750/SEBASTIEN_CLIP_txnyov.mp4",
        poster: "https://res.cloudinary.com/dfpaw573r/video/upload/so_0,f_auto,q_auto,w_720/v1785165750/SEBASTIEN_CLIP_txnyov.jpg",
      },
    ],
  },

  contact: {
    overline: "The consultation",
    title: "Request a private consultation",
    intro: "A few questions, then a call back from the team.",
    formTitle: "Request a private consultation",
    formHint: "Plans, price per villa, availability and a detailed profitability study.",
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
          { label: "Legal notice", href: "/mentions-legales" },
        ],
      },
      {
        heading: "The location",
        lines: [{ label: "Seseh, Bali" }],
      },
    ],
    disclaimerLines: [
      "Images are for illustration only.",
      "Estimated income, not a guarantee, except for the contractual income guarantee.",
      "All-inclusive price, excluding 1% transfer tax and €800 for company formation.",
    ],
  },
}

export default tasvanExtra
