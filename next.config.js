
const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    return config
  },
  images: {
    domains: ['via.placeholder.com'],
  },
  env: {
    AUTH0_NAMESPACE: process.env.AUTH0_NAMESPACE,
    BASE_URL: process.env.VERCEL_URL || process.env.BASE_URL,
    AUTH0_BASE_URL: process.env.VERCEL_URL || process.env.BASE_URL,
  }
}
