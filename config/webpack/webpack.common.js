const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {resolve, isProd, envFiles} = require('./utils');

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    minimize: isProd(),
  },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      require('stylelint')(),
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')(),
    ],
  },
};

module.exports = {
  bail: true,
  entry: resolve('src/index.js'),
  output: {
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].js',
    path: resolve('dist'),
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist/**'], {
      root: resolve('.'),
    }),
    new StyleLintPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:8].css',
    }),
    new Dotenv({
      path: isProd() ? envFiles.prod : envFiles.dev,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ManifestPlugin({
      fileName: 'static-manifest.json',
    }),
    new CopyWebpackPlugin([
      {from: resolve('public'), ignore: ['index.html']},
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve('public/index.html'),
      minify: !isProd() ? false : {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new InterpolateHtmlPlugin(process.env),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        include: resolve('src'),
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx|mjs)$/,
        include: resolve('src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          postcssLoader,
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          postcssLoader,
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        enforce: 'pre',
        loader: 'image-webpack-loader',
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 10 * 1024,
          noquotes: true,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
