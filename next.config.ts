import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

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
};

const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN;

export default sentryAuthToken
  ? withSentryConfig(nextConfig, {
      org: "omenstudio",
      project: "sora",
      authToken: sentryAuthToken,
      silent: true,
      widenClientFileUpload: true,
    })
  : nextConfig;
