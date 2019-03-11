require('dotenv').config()
const withCSS = require('@zeit/next-css')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

module.exports = withBundleAnalyzer(withCSS({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    }

    return config
  },
  publicRuntimeConfig: {
    GRAPHQL_ENDPOINT_CLIENT: process.env.GRAPHQL_ENDPOINT_CLIENT,
    GRAPHQL_ENDPOINT_SERVER: process.env.GRAPHQL_ENDPOINT_SERVER,
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
}))
