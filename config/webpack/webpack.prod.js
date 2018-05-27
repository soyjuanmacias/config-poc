const {envFiles} = require('./utils');
require('dotenv').config({
  path: envFiles.prod,
});

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  stats: {
    children: false,
  },
  mode: 'production',
  performance: {
    hints: 'warning',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../logs/bundle.html',
      openAnalyzer: false,
    }),
  ],
});
