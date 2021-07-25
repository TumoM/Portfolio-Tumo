
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    config.plugins.push(new Dotenv({silent: true}));
    return config
  }
}
