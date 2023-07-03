/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ACTIVITY_TRACKING_URL: 'https://activity-tracking-art-shop.vercel.app/',
    ENABLE_ACTIVITY_TRACKING: "true",
  },

}

module.exports = nextConfig
