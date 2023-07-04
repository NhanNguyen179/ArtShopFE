/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ACTIVITY_TRACKING_URL: 'https://activity-tracking-art-shop.vercel.app/event-tracking/',
    ENABLE_ACTIVITY_TRACKING: "true",
    IMAGE_DOMAIN:"https://ec2-34-198-71-168.compute-1.amazonaws.com:8000",
  },

}

module.exports = nextConfig
