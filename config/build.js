#!/usr/bin/env node

const webpackBuildConfig = require("./webpack.build.config");
const Webpack = require("webpack");

Webpack(webpackBuildConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
  }

  console.log(stats);
});
