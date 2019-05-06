const merge = require('webpack-merge');
const prod = require('@fuselab/build-config/webpack.prod');
const _ = require('underscore');
const common = require('./webpack.common');
const package = require('./package.json');
const version = `v${package.version}`;
const appName = package.appName;

module.exports = merge(common,
  _.omit(prod, 'plugins'),
  { plugins: prod.plugins(appName, version) },
  { output: { filename: '[name].bundle.min.[chunkhash].js' } });;
