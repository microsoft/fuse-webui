const merge = require('webpack-merge');
const common = require('./webpack.common');
const devserver = require('../webpack.devserver');
const package = require('./package.json');
const version = `v${package.version}`;
const appName = package.appName;

module.exports = merge(common, {
  mode: 'development',
  plugins: devserver.plugins(appName, version)
});
