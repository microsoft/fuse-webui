const path = require('path');
const merge = require('webpack-merge');
const core = require('@fuselab/build-config/webpack.core');
const devserver = require('@fuselab/build-config/webpack.devserver');
const package = require('./package.json');
const version = `v${package.version}`;
const appName = package.appName;
const devServerHost = package.devServerHost;

var entry = {};
entry[appName] = './index.tsx';

module.exports = merge(core, {
  entry: entry,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('../built', version),
    publicPath: '/'
  },
  devServer: devserver.devServer(appName, version, devServerHost, {{ port }}),
});
