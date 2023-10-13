/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    defaultLocale: "th",
    locales: ["th", "en"],
  },
  images: {
    domains: ["flowech-devices.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
