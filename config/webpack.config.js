const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { getEntry, getBuildParamWithDefault } = require('./helper');

const REACT_APP_ENV = getBuildParamWithDefault('env', 'prod');
const showAnalyzer = getBuildParamWithDefault('showAnalyzer', false);

module.exports = {
  entry: getEntry('./src/pages/**/index.jsx'),
  output: {
    path: path.resolve(__dirname + '/../dist/'), // eslint-disable-line
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, '..', 'src'),
      'antd-mobile': 'antd-mobile/2x',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-async-to-generator',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new webpack.DefinePlugin({
      REACT_APP_ENV: JSON.stringify(REACT_APP_ENV),
    }),
    ...(showAnalyzer
      ? [
          new BundleAnalyzerPlugin({
            analyzerPort: 8899,
          }),
        ]
      : []),
  ],
};
