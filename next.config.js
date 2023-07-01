/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ACTIVITY_TRACKING_URL: 'http://localhost:5000/event-tracking',
    ENABLE_ACTIVITY_TRACKING: "true",
  },

}

module.exports = nextConfig
