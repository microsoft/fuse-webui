const path = require('path');
const merge = require('webpack-merge');
var core = require('../webpack.core');
var devserver = require('../webpack.devserver');
const package = require('./package.json');
const version = `v${package.version}`;
const appName = package.appName;

var entry = {};
entry[appName] = './index.tsx';

module.exports = merge(core, {
  entry: entry,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('../built', version),
    publicPath: '/'
  },
  devServer: devserver.devServer(appName, version, 'scratch.botframework.com', {{ port }}),
});
