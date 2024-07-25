const { withContentlayer } = require("next-contentlayer2");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "visitor-badge.laobi.icu" },
    ],
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
  },
  env: {
    GIT_COMMIT_SHA:
      process.env.GIT_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA,
    NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
    NEXT_PUBLIC_SHOW_PARTICLES: process.env.NEXT_PUBLIC_SHOW_PARTICLES,
    TAURI_PLATFORM: process.env.TAURI_PLATFORM,
  },
};

module.exports = withContentlayer(nextConfig);
