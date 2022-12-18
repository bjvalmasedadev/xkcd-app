/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imgs.xkcd.com"],
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    // localeDetection: false, // true, detected the client languages
    // domains: [
    //   { domain: "es.xkcd.bjvalmaseda.com", defaultLocale: "es" },
    //   {
    //     domain: "en.xkcd.bjvalmaseda.com",
    //     defaultLocale: "en",
    //   },
    // ],
  },
};

module.exports = nextConfig;
