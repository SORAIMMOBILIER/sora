import type { VillaSesehBaliContent } from "./types"

const content: VillaSesehBaliContent = {
  meta: {
    title: "A villa in Seseh, Bali | SORA Immobilier",
    description:
      "Villas with 1 to 4 bedrooms, 300 m from the beach, from €149,000 all-inclusive. 10.2% net recorded in 2025, full management, proven resale.",
  },
  nav: {
    switchLabel: "FR",
  },
  footer: {
    disclaimer: "Visuals not contractual.",
    mentionsLegalesLabel: "Legal notice",
    contactEmail: "contact@sora-immobilier.com",
  },
  hero: {
    overline: "SESEH SUNSET VILLAS · BALI · 26 VILLAS 300 M FROM THE BEACH · DELIVERY Q3 2028",
    title: "You invest. We take care of the rest.",
    subtitle:
      "Villas in Seseh, 300 m from the beach, from €149,000 all-inclusive. 10.2% net in 2025, management and resale handled by our team.",
    videoUrl: undefined,
    posterImage: "/seseh/prestige/exterior.webp",
    heroImages: [
      { src: "/seseh/prestige/exterior.webp", alt: "Facade of a Prestige villa in Seseh" },
      { src: "/seseh/elegance/exterior.webp", alt: "Facade of an Élégance villa in Seseh" },
    ],
    ctaLabel: "Check my eligibility",
    ctaNote: "2 minutes. If your project fits, the team calls you back with the forecast for your villa.",
    bandItems: [
      "Engineer-designed",
      "54 villas delivered or under construction",
      "82% occupancy in 2025",
      "93% of clients reinvest",
    ],
  },
  section2: {
    overline: "The next step",
    title: "You've built up capital. It's time it worked without you.",
    subhead: "What actually drives a villa's return",
    screenLines: [
      "Over ten years, it isn't the purchase price that makes the difference. It's what the villa costs to run, and what it's worth the day you sell it.",
    ],
    blocks: [
      {
        title: "Lower costs, higher net income",
        body: "A well-built villa needs fewer repairs and less upkeep. Every euro saved on running costs stays in your pocket, year after year.",
      },
      {
        title: "It rents better, for longer",
        body: "A villa in good condition keeps its ratings, its reviews and its nightly rate. Occupancy holds up over time.",
      },
      {
        title: "It resells at the right price",
        body: "No renovation needed before the sale: the buyer pays for a villa that's ready to rent, and the capital gain is yours in full.",
      },
      {
        title: "In Bali, the gap widens fast",
        body: "Heat, humidity, the rainy season: the climate wears down a budget build fast. A villa built by engineers goes through the years without losing value.",
      },
    ],
    screenClosingLine: "If your criterion is the lowest entry price on the island, we won't be the right choice.",
    eligibilityNote: "This page is for you if you have at least €150,000 available within the next twelve months, and if you think in terms of a ten-year hold.",
    paragraphs: [
      "Whether it came from a business, a sale or years of work, you built it, and you're right not to put it into the first figure that comes along. A property investment is judged over ten years, net of everything: rent, running costs, maintenance, tax, resale.",
      "The right questions aren't about the country. They're about who builds, who rents, who resells, and the proof they bring. At SORA, it's the same team from the first dig to the resale.",
    ],
    closingParagraph: "The only question that matters: in ten or fifteen years, which one will have earned you more? That is the calculation we work on. If your criterion is the lowest entry price on the island, we won't be the right choice, and we'd rather tell you now.",
  },
  section3: {
    overline: "Already delivered, already rented.",
    title: "What our villas earned last year.",
    stats: [
      { value: "28", label: "Villas delivered" },
      { value: "10.2%", label: "Net in 2025" },
      { value: "82%", label: "Occupancy" },
      { value: "93%", label: "Reinvest with SORA" },
    ],
    resaleCartouches: [
      "Canggu loft: +16% in under a year, before it was even rented.",
      "Pererenan villa: +10% capital gain in two years, rental income not included.",
    ],
    resaleRows: [
      { label: "Canggu loft", value: "+16% in under a year, before it was even rented" },
      { label: "Pererenan villa", value: "+10% capital gain in two years, rental income not included" },
    ],
    facts: [
      "4 projects, 28 villas delivered, 26 under construction in Seseh.",
      "10.2% net in 2025 on the villas we manage, at 82% occupancy. A track record, not a simulation.",
      "Two resales completed for our clients. A loft in Canggu, bought off-plan for €99,000 and resold for €115,000 at handover: up 16% in under a year, before it was even rented. The Pererenan villa, bought for €299,000 and resold for €330,000 two years later: a 10% capital gain, not counting two years of rental income.",
      "93% of our investors reinvest with us. Nobody reinvests with someone who didn't keep their word.",
    ],
  },
  section4: {
    overline: "Testimonials",
    title: "What our investors say.",
    testimonials: [],
    ctaLabel: "Check my eligibility",
  },
  section5: {
    overline: "The villas",
    title: "Two villas, two prices, delivered ready to rent.",
    gammes: [
      {
        name: "Élégance",
        specLine: "1 bedroom · 51 m² · jacuzzi",
        gallery: [
          { src: "/seseh/elegance/exterior.webp", alt: "Facade of an Élégance villa in Seseh" },
          { src: "/seseh/elegance/terrace.webp", alt: "Terrace of an Élégance villa in Seseh" },
          { src: "/seseh/elegance/living.webp", alt: "Living room of an Élégance villa in Seseh" },
          { src: "/seseh/elegance/bedroom.webp", alt: "Bedroom of an Élégance villa in Seseh" },
          { src: "/seseh/elegance/bedroom1.webp", alt: "Bedroom of an Élégance villa in Seseh" },
          { src: "/seseh/elegance/bedroom2.webp", alt: "Bedroom of an Élégance villa in Seseh" },
        ],
        planImage: undefined, // plan not usable (black fill)
        planAlt: "Ground floor plan, Élégance villa",
        priceLabel: "€149,000 all-inclusive",
        priceNote: "€155,000 from 1 January 2027",
        stats: [
          { value: "1", label: "Bedroom" },
          { value: "51 m²", label: "Floor area" },
          { value: "€10,430", label: "Guaranteed per year" },
        ],
        features: [
          "Jacuzzi",
          "Delivered furnished, ready to rent",
          "7% net guaranteed for 3 years",
          "€31,290 secured over 3 years",
        ],
        rows: [
          { label: "Jacuzzi", value: "private" },
          { label: "Delivery", value: "furnished, ready to rent" },
          { label: "Guarantee", value: "7% net for 3 years" },
          { label: "Secured", value: "€31,290 over 3 years" },
        ],
      },
      {
        name: "Prestige",
        badge: "Most in demand",
        specLine: "2 bedrooms · 80 m² · private pool",
        gallery: [
          { src: "/seseh/prestige/exterior.webp", alt: "Facade of a Prestige villa in Seseh" },
          { src: "/seseh/prestige/living.webp", alt: "Living room of a Prestige villa in Seseh" },
          { src: "/seseh/prestige/dining.webp", alt: "Dining room of a Prestige villa in Seseh" },
          { src: "/seseh/prestige/kitchen.webp", alt: "Kitchen of a Prestige villa in Seseh" },
          { src: "/seseh/prestige/bathroom1.webp", alt: "Bathroom of a Prestige villa in Seseh" },
          { src: "/seseh/prestige/bedroom1.webp", alt: "Bedroom of a Prestige villa in Seseh" },
        ],
        planImage: undefined, // plan not usable (black fill)
        planAlt: "Ground floor plan, Prestige villa",
        priceLabel: "€239,000 all-inclusive",
        priceNote: "€249,000 from 1 January 2027",
        stats: [
          { value: "2", label: "Bedrooms" },
          { value: "80 m²", label: "Floor area" },
          { value: "€16,730", label: "Guaranteed per year" },
        ],
        features: [
          "Private pool",
          "Delivered furnished, ready to rent",
          "7% net guaranteed for 3 years",
          "€50,190 secured over 3 years",
        ],
        rows: [
          { label: "Pool", value: "private" },
          { label: "Delivery", value: "furnished, ready to rent" },
          { label: "Guarantee", value: "7% net for 3 years" },
          { label: "Secured", value: "€50,190 over 3 years" },
        ],
      },
    ],
    priceIncludesText: "The price covers the land on a notarised 30 + 30-year lease, the construction, the furniture and the permits: the villa is delivered furnished, decorated, ready to rent. Acquisition costs are known upfront: 1% transfer tax and €800 to set up your company.",
    previsionnelText: "At the consultation, you receive the forecast for your villa: rent, operating costs, management fees, Indonesian tax, net result. Line by line.",
    priceNote: "All-inclusive prices, until 31 December 2026.",
    ctaLabel: "Check my eligibility",
    offSeseh: {
      overline: "Outside Seseh",
      title: "Don't want to wait until 2028?",
      text: "We have one property left that is already built and rented, in Canggu: a loft at €125,000, around 10% net on record, rental income from the day you sign. One only, exclusively through us. Presented at the consultation.",
    },
  },
  section6: {
    overline: "The price",
    title: "The real cost of a villa shows over ten years.",
    screenLines: [
      "A lower purchase price almost always turns up elsewhere: electricity, upkeep, furniture, work before resale.",
      "Built by construction engineers: uses less, needs less upkeep, degrades less.",
      "100% of our villas delivered on the dates announced.",
    ],
    paragraphs: [
      "A lower purchase price almost always turns up elsewhere: in the electricity of an undersized air-conditioning system, the upkeep of a roof that suffers, furniture to replace, work to do before resale. Over ten years, the gap is no detail.",
      "Our villas are built by two construction engineers, formerly of Vinci Energies and Bouygues Construction, with the methods and standards of those sites: calculated air conditioning, real insulation, materials chosen for tropical humidity, and a controlled build that has allowed us to deliver 100% of our villas on the dates announced. A villa that uses less, needs less upkeep, degrades less. Every year, your net result is better. And on resale day, the buyer pays for an intact villa, not a renovation project.",
      "It's also what allows us to guarantee your income for three years, and to resell with a capital gain for our clients.",
    ],
    links: [
      { label: "See the guarantees", anchor: "#guarantees" },
      { label: "See the resales", anchor: "#numbers" },
    ],
  },
  section7: {
    overline: "Management",
    title: "What you'll never have to do.",
    neverList: [
      "Find a tenant.",
      "Answer a message at 11 pm.",
      "Wait for a plumber.",
      "Set the nightly rate in high season.",
      "Keep the books.",
      "Replace a mattress.",
    ],
    screenLine: "Your one appointment: an annual review with your advisor.",
    paragraph: "There's nothing for you to organise. SORA designs the villa, builds it, furnishes it, lists it, sets the rates, welcomes the guests, maintains it, keeps the books, and sells it the day you decide to. Your one appointment: an annual review with your advisor, to set your dates and the year's decisions. The rest of the time, you're kept informed without having to ask: a weekly site update during construction, then a monthly management report with rent, costs and net result.",
  },
  section8: {
    overline: "The guarantees",
    title: "Four guarantees, written into your contract.",
    guarantees: [
      {
        title: "Income.",
        short: "7% net minimum for 36 months, 21% of the price secured.",
        body: "For the first 36 months of rental, your net result is guaranteed at a minimum of 7% a year of the purchase price, net of management and operating costs, before tax: €10,430 a year on an Élégance, €16,730 on a Prestige. That's 21% of your villa's price secured over three years: €31,290 on an Élégance, €50,190 on a Prestige. If the result falls short, SORA pays the difference. Anything above it is yours.",
      },
      {
        title: "Construction.",
        short: "10 years structure, 5 years roof, 1 year everything else, furniture included.",
        body: "10 years on the structure, 5 years on the roof, 1 year on everything else, furniture included. Indonesian law requires no 10-year structural warranty. We give one anyway.",
      },
      {
        title: "Deadlines.",
        short: "Penalties of 1.5 million rupiah per day beyond 3 months.",
        body: "Delivery in the third quarter of 2028. Three months' grace, then penalties of 1.5 million rupiah per day of delay, around €75, paid to you.",
      },
      {
        title: "Legal framework.",
        short: "30+30-year lease, 100% owned company, independent lawyer.",
        body: "At Seseh Sunset Villas, a notarised 30-year lease, plus a further 30 years guaranteed in the contract. A company in which you hold 100% of the shares, no nominee. An independent lawyer based in Indonesia, who reads your contract before you sign. First consultation complimentary.",
      },
    ],
    ctaLabel: "Check my eligibility",
  },
  paiement: {
    overline: "Payment",
    title: "From the first question to the keys.",
    steps: [
      { value: "€1,000", title: "Reservation", body: "Refundable until 31 December 2026, villa and 2026 price held." },
      { value: "50%", title: "Notarised deed", body: "Around 4 weeks later." },
      { value: "Construction", title: "Payment calls", body: "At each stage, roughly every quarter." },
      { value: "10%", title: "Handover", body: "Third quarter of 2028." },
      { value: "5%", title: "Discount", body: "For 90% paid at signing, on 2026 signings." },
    ],
    detail: {
      overline: "Access",
      title: "From the first question to the keys.",
      intro: "A few questions filter the way in. It's how we give every file the time it deserves.",
      steps: [
        {
          title: "You check your eligibility, 2 minutes.",
          body: "If your project fits, a member of the SORA team calls you back promptly.",
        },
        {
          title: "First consultation, 30 minutes on video.",
          body: "Your situation, the right villa for you, the forecast, your questions. If it's not for you, we'll say so.",
        },
        {
          title: "Second consultation.",
          body: "The contract, the guarantees, the payment schedule, the lawyer if you wish.",
        },
        {
          title: "Reservation at €1,000, refundable unconditionally until 31 December 2026.",
          body: "The villa and the 2026 price are held.",
        },
        {
          title: "Notarised deed around 4 weeks later, 50%.",
          body: "Then a payment call at each stage of construction, roughly every quarter, and 10% at handover. 5% discount for 90% paid at signing, on 2026 signings.",
        },
      ],
    },
  },
  team: {
    overline: "The team",
    title: "Trusting a builder you've never met.",
    photo: "/seseh/team/team-photo.webp",
    photoCaption: "The SORA team in Bali.",
    quote: "From thousands of kilometres away, we don't ask you to take our word for it. We show you how we work.",
    name: "Gabriel Lapierre",
    role: "co-founder",
    stats: [
      { value: "54", label: "Villas delivered or under construction" },
      { value: "100%", label: "On schedule" },
      { value: "10 years", label: "Structural warranty" },
      { value: "93%", label: "Of clients reinvest" },
    ],
    screenLine: "Two construction engineers, formerly of Vinci Energies and Bouygues Construction.",
    detail: {
      overline: "Trust",
      title: "Trusting a builder you've never met.",
      paragraphs: [
        "SORA is two construction engineers. Gabriel Lapierre, formerly of Vinci Energies. Nitham Lapierre, formerly of Bouygues Construction. Based in Bali for four years, we build here with the methods and standards we applied on those sites.",
        "Our track record: 28 villas delivered, 26 under construction, 4 projects. We have built, rented and resold, and 93% of our clients reinvest with us.",
        "What you won't see in the photos, and what matters in twenty years: air conditioning sized by an engineer, real insulation, materials chosen for tropical humidity. A house that uses less energy, needs less upkeep, and that your children won't have to renovate.",
      ],
      engagementsIntro: "Our commitments, in your contract:",
      engagements: [
        "10-year warranty on the structure, 5 years on the roof, 1 year on everything else, furniture included.",
        "Indonesian law requires no 10-year structural warranty. We give one anyway.",
        "An independent European project manager inspects every stage of construction.",
        "Beyond three months past the delivery date, late penalties are paid to you.",
      ],
    },
  },
  lieu: {
    overline: "The location",
    title: "Seseh, between rice fields and ocean.",
    entries: [
      { place: "Seseh beach", distance: "3 min, 300 m", photoSrc: undefined },
      { place: "Restaurants, beach clubs and wellness", distance: "3 min" },
      { place: "Canggu", distance: "8 min" },
      { place: "Bali international airport", distance: "60 min" },
    ],
  },
  section11: {
    overline: "The market",
    title: "Bali in 2027.",
    screenLines: [
      "Indonesia holds growth of around 5% a year.",
      "Bali: close to 7 million visitors in 2025, a record for the second consecutive year.",
      "On 1 January 2027, the Élégance moves to €155,000 and the Prestige to €249,000.",
    ],
    rows: [
      { label: "Indonesia", value: "growth of around 5% a year" },
      { label: "Bali", value: "close to 7 million visitors in 2025, a record" },
      { label: "1 January 2027", value: "Élégance €155,000, Prestige €249,000" },
    ],
    paragraphs: [
      "Indonesia, the world's fourth most populous country, holds growth of around 5% a year, 5.12% in the second quarter of 2025, 5.04% in the third. Bali has just recorded close to 7 million international visitors in 2025, up 9.7% on the year, a record for the second consecutive year. On the island, property prices rise by around 7% a year, and land 300 metres from the ocean isn't being made any more.",
      "We don't sell capital gains. In our calculations, they're worth zero.",
      "On 1 January 2027, the Élégance moves from €149,000 to €155,000 and the Prestige from €239,000 to €249,000. Same villa, same beach. If you'd like to secure your villa before the increase, check your eligibility below. The team calls you back with the forecast.",
    ],
    ctaLabel: "Check my eligibility",
    sources: [
      { label: "BPS Statistics Indonesia (GDP, Q2 & Q3 2025)" },
      { label: "BPS Bali (2025 arrivals)" },
      { label: "Horwath HTL / Bali Hotels Association report (2025 record)" },
    ],
  },
  section12: {
    overline: "Eligibility",
    title: "Two minutes to find out whether we can work together.",
    embedCode: undefined,
  },
  section10: {
    overline: "Frequently asked questions",
    title: "What you want to know before the call.",
    items: [
      {
        q: "Is the 7% net of tax?",
        a: "No. Net of management fees and operating costs, before tax. Indonesian tax is built into the forecast you receive at the consultation. Your personal situation is reviewed with the independent lawyer.",
      },
      {
        q: "How does the income guarantee work?",
        a: "For the first 36 months of rental, SORA guarantees you a net result of at least 7% a year of the purchase price: €10,430 a year on an Élégance and €16,730 on a Prestige. Over three years, that's 21% of your villa's price secured. At the end of each year, we compare the actual result with the floor. If it's lower, SORA pays the difference. If it's higher, it's all yours. The guarantee applies with SORA management, and your own stays are deducted pro rata.",
      },
      {
        q: "What do management and running costs amount to?",
        a: "They're detailed line by line in the forecast you receive at the consultation. The guaranteed 7% is net of those costs.",
      },
      {
        q: "Who looks after the villa when I'm not there?",
        a: "SORA, on site: rental, guest welcome, maintenance, housekeeping, accounting, and a monthly management report. Rachel runs a construction company in Paris, a €1M-turnover business, and everything rests on her. She knows all about broken boilers and Sunday-evening phone calls, and her mind was made up: no more property at home. Her first reaction to Bali: managing a villa from thousands of kilometres away, no thanks. Except there's nothing to manage. A villa in Canggu, €299,000 turnkey. She signed and went back to her life: €24,000 net a year, around 8% net, without a single check-in, without changing a single light bulb. A year later, she came back on her own to take a second one, in Seseh.",
      },
      {
        q: "What exactly does the price include?",
        a: "Everything: the land, the construction, the furniture, the permits. The villa is delivered furnished and decorated. On top of that, plan for 1% in transfer tax, the local equivalent of stamp duty, and €800 to set up your company, the PT PMA.",
      },
      {
        q: "Can I finance it with a loan?",
        a: "Not against the villa itself: Indonesian banks don't lend to foreigners, and banks at home don't take security over an asset outside their jurisdiction. Our clients who borrow do so against their existing assets: a mortgage on a property they already own at home, a loan secured against an investment portfolio or insurance policy, or a loan taken by their holding company. We give your banker the complete file: land due diligence, zoning, lease, projections, guarantees.",
      },
      {
        q: "Can I buy through my holding company?",
        a: "Yes. The Indonesian company that holds the villa can be owned in your own name, by your holding company or by your property company. The choice is made at the structuring stage, with your accountant, and our Indonesian firm can speak with them directly.",
      },
      {
        q: "With a lease, am I really the owner?",
        a: "You buy the right to use the land for 30 years, with a further 30 years guaranteed in the contract. The villa is yours, through a company you own 100%. The land represents around 20% of the price, and if the renewal price is disputed, three independent experts set it. This is the standard framework for foreigners in Bali, and the independent lawyer checks the contract with you.",
      },
      {
        q: "When does the rental income start?",
        a: "At handover, planned for the third quarter of 2028: the villa is furnished, photographed and listed from the day you get the keys, and the income guarantee starts then. If you want income from the day you sign, the already-rented loft in Canggu is presented at the consultation.",
      },
      {
        q: "What if construction runs late?",
        a: "Three months' grace after the planned date, then penalties of 1.5 million rupiah per day of delay, around €75 a day, paid to you. You follow progress every week.",
      },
      {
        q: "I don't have all the funds yet.",
        a: "The €1,000 reservation holds the villa and the 2026 price. The deed follows around a month later with 50%, and the rest follows the construction schedule until 2028.",
      },
      {
        q: "Do I need insurance?",
        a: "Yes, and it's at your expense. A comprehensive policy covers the villa and its contents: fire, theft, vandalism, water damage, storms, floods, earthquakes, tsunamis, volcanic eruptions. As a reference, insuring one of our 160 m² villas for €261,000 costs around €725 a year. We put you in touch with the insurer at handover.",
      },
      {
        q: "Can I stay there?",
        a: "Yes. Your weeks are deducted from the guarantee pro rata.",
      },
      {
        q: "Do I need to go to Bali?",
        a: "No, everything is handled remotely, with online site updates. You can also come and see the delivered villas and the site.",
      },
      {
        q: "What if I want to sell?",
        a: "We take care of it, as we did for the Pererenan villa and the Canggu loft. The independent lawyer secures the transfer of the lease.",
      },
      {
        q: "What tax applies?",
        a: "Indonesian tax is built into the forecast. For your personal situation in your country of residence, the independent lawyer advises you.",
      },
    ],
  },
  stickyBar: {
    ctaLabel: "Check my eligibility",
  },
}

export default content
