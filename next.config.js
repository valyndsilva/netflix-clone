/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@stripe/firestore-stripe-payments",
]); // pass the modules you would like to see transpiled

// const repo = "netflix-clone";
// const assetPrefix = `/${repo}/`;
// const basePath = `/${repo}`;
const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
  },
  experimental: {
    esmExternals: "loose",
  },
  // time in seconds of no pages generating during static
  // generation before timing out
  staticPageGenerationTimeout: 2000,
  // assetPrefix,
  // basePath,
});

module.exports = nextConfig;
