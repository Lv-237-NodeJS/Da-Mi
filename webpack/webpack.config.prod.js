const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const rootPath = path.resolve('./');
const buildPath = path.resolve('build');
let devConfig = require('./webpack.config.dev.js');

let cleanBuildplagin = new cleanWebpackPlugin([buildPath], {
  root: rootPath,
  verbose: true,
  dry: false
});

devConfig.plugins.push(cleanBuildplagin);

module.exports = devConfig;
