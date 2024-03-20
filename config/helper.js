const glob = require("glob");
const path = require("path");
const { readFileSync } = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getEntry = (globPath) => {
  return glob.sync(globPath).reduce((acc, entry) => {
    const dirname = path.dirname(entry);
    const [_, name] = dirname.match(/pages\/(.*)/);

    if (name.indexOf("/components") === -1) {
      acc[`assets/${name}/index`] = entry;
    }

    return acc;
  }, {});
};

const htmlPlugins = (globPath, isProduction = true) => {
  return glob.sync(globPath).reduce((acc, entry) => {
    const dirname = path.dirname(entry);
    const [_, name] = dirname.match(/pages\/(.*)/);

    let pageConfig = {};

    try {
      const pageConfigFilePath = path.resolve(
        `${__dirname}/../${dirname}/index.config.json`
      );

      pageConfig = JSON.parse(readFileSync(pageConfigFilePath));
    } catch (e) {}

    const { title: pageTitle } = pageConfig;

    if (name.indexOf("/components") === -1) {
      const config = {
        template: path.resolve(__dirname + "/../template.html"),
        // filename: `html/${name}/index.html`,
        filename: `${name}/index.html`,
        pageTitle,
        inject: true,
        isProduction,
        chunks: [`assets/${name}/index`],
        minify: false,
      };
      acc.push(new HtmlWebpackPlugin(config));
    }

    return acc;
  }, []);
};

const getBuildParamWithDefault = (arg, defaultValue = "") => {
  const target = process.argv.find((x) => x.indexOf(`--${arg}`) > -1);
  let ret = defaultValue;
  if (target && target.indexOf("=") > 0) {
    [, ret] = target.split("=");
  }
  return ret;
};

module.exports = {
  getEntry,
  htmlPlugins,
  getBuildParamWithDefault,
};
