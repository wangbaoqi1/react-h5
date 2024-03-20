const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config');

const { htmlPlugins } = require('./helper');

const webpackDevConfig = {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
  },
  // devtool: "cheap-eval-source-map",
  // devServer: {
  // contentBase: "../dist",
  // },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          { loader: 'style-loader' },
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
                      // include: [/\/node_modules\/antd-mobile\//],
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
  plugins: [...htmlPlugins('./src/pages/**/index.jsx', false)],
};

const config = merge(webpackBaseConfig, webpackDevConfig);

console.log('CONFIG:', config);

module.exports = config;
