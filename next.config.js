const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([
  [withBundleAnalyzer],
  {
    env: {
      NEXT_PUBLIC_API_KEY: process.env.UNSPLASH__API,
      DATABASE_URL: process.env.DB_URL,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
  },
  {
    images: {
      domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
  },
]);
