const path = require('path');
var core = require('../webpack.core');
const package = require('./package.json');
const version = `v${package.version}`;

module.exports = Object.assign(core, {
  mode: 'production',
  entry: {
    'fuse-ui-adal': './index.ts'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(`../built/${version}`)
  },
  plugins: []
});
