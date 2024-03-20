const webpack = require('webpack');
const { mergeWithCustomize, customizeArray } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackBaseConfig = require('./webpack.config');
const { getBuildParamWithDefault, htmlPlugins } = require('./helper');

const publicPath = getBuildParamWithDefault('publicPath', './');

const webpackBuildConfig = {
  mode: 'production',
  output: {
    filename: '[name].bundle.js?hash=[fullhash]',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                  {
                    'postcss-px-to-viewport': {
                      unitToConvert: 'px',
                      viewportWidth: 750,
                      unitPrecision: 6,
                      propList: ['*'],
                      viewportUnit: 'vw',
                      fontViewportUnit: 'vw',
                      selectorBlackList: ['wrap'],
                      minPixelValue: 1,
                      replace: true,
                      // exclude: [/node_modules/],
                      landscape: false,
                    },
                  },
                ],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: { javascriptEnabled: true },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css?hash=[fullhash]',
    }),
    ...htmlPlugins('./src/pages/**/index.jsx', true),
  ],
};

const config = mergeWithCustomize({
  customizeArray: customizeArray({
    'module.rules': 'prepend',
  }),
})(webpackBaseConfig, webpackBuildConfig);

// console.log("CONFIG:", config.module.rules);

module.exports = config;
