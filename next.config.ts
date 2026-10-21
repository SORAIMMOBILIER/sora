import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2560, 3200, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async headers() {
    return [
      {
        source: "/((?!studio).*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      // Landing page Meta "maison-seseh-bali" : cachée, campagnes payantes
      // uniquement. En-tête en plus de la balise <meta robots> posée par
      // generateMetadata (robots: {index:false, follow:false}) — ceinture
      // et bretelles pour qu'aucun moteur ne l'indexe. Ne jamais lister ces
      // deux adresses dans robots.txt (ça reviendrait à les rendre publiques).
      {
        source: "/maison-seseh-bali",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/en/home-seseh-bali",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/seseh", destination: "/realisations/seseh", permanent: true },
      { source: "/vsl", destination: "/villas-ssv", permanent: true },
      { source: "/webinaire", destination: "/live-SSV", permanent: true },
      { source: "/replay", destination: "/SSV/allez-plus-loin", permanent: true },
      { source: "/SSV/allez-plus-loins", destination: "/SSV/allez-plus-loin", permanent: true },
      { source: "/lgen-contact", destination: "https://wa.me/33623676723?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20un%20projet%20d%27investissement%20%C3%A0%20Bali%2C%20j%27aimerais%20en%20savoir%20plus%20sur%20ce%20que%20vous%20avez%20%C3%A0%20proposer", permanent: true },
    ];
  },
  // Le français n'a pas de préfixe (URLs actuelles inchangées) ; /en/...
  // sert exactement les mêmes fichiers de page, sans aucun [locale] dans
  // l'arborescence — le middleware pose le cookie de langue avant que ça
  // n'arrive ici.
  async rewrites() {
    return [
      // Exception explicite AVANT la règle générique /en/:path* : la page
      // "/fondateurs" est servie en anglais sur "/en/founders" (mot plus
      // naturel pour le référencement anglophone), pas "/en/fondateurs".
      // Voir la même table dans src/components/localized-link.tsx.
      { source: "/en/founders", destination: "/fondateurs" },
      // Landing page Meta : même logique, slug anglais distinct.
      { source: "/en/home-seseh-bali", destination: "/maison-seseh-bali" },
      { source: "/en", destination: "/" },
      { source: "/en/:path*", destination: "/:path*" },
    ];
  },
};

const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN;

const configWithSentry = sentryAuthToken
  ? withSentryConfig(nextConfig, {
      org: "omenstudio",
      project: "sora",
      authToken: sentryAuthToken,
      silent: true,
      widenClientFileUpload: true,
    })
  : nextConfig;

export default withNextIntl(configWithSentry);
