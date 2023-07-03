/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ACTIVITY_TRACKING_URL: 'https://activity-tracking-art-shop.vercel.app/',
    ENABLE_ACTIVITY_TRACKING: "true",
    IMAGE_DOMAIN:"https://34.198.71.168:8000/media/",
  },

}

module.exports = nextConfig
