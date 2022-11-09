/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@stripe/firestore-stripe-payments",
]); // pass the modules you would like to see transpiled
const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
  },
  experimental: {
    esmExternals: "loose",
  },
});

module.exports = nextConfig;
