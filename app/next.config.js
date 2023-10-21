const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    domains: [
      "lh3.googleusercontent.com",
      "visitor-badge.laobi.icu",
      "vercel.com",
    ],
  },
  env: {
    GIT_COMMIT_SHA: process.env.GIT_COMMIT_SHA,
    NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
  },
};

module.exports = withContentlayer(nextConfig);
