const {envFiles} = require('./utils');
require('dotenv').config({
  path: envFiles.dev,
});

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    progress: true,
    stats: 'minimal',
  },
});
