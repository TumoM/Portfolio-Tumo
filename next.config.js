
const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    return config
  }
  ,env: {
    AUTH0_NAMESPACE: process.env.AUTH0_NAMESPACE
  }
}
