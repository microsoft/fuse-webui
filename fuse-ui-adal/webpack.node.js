const path = require('path');
var core = require('../webpack.core');
const package = require('./package.json');
const version = `v${package.version}`;

module.exports = Object.assign(core, {
  entry: {
    'empty': './empty.ts'
  },
  target: 'node',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./lib')
  },
  plugins: []
});
