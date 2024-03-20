#!/usr/bin/env node

const webpackDevserverConfig = require("./webpack.devserver.config");
const WebpackDevServer = require("webpack-dev-server");
const Webpack = require("webpack");

const compiler = Webpack(webpackDevserverConfig);
const devServerOptions = {
  open: true,
  port: 80,
  allowedHosts: [
    "http://localhost/",
  ],
};

const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log("Starting server...");
  await server.start();
};

runServer();
