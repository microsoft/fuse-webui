const path = require('path');
var core = require('../webpack.core');
var CopyPlugin = require('copy-webpack-plugin');
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
  plugins: [
    new CopyPlugin([
      { from: './themes/seti/*.woff', to: '.' },
      { from: './themes/fabric/*.woff*', to: '.' },
      { from: './themes/fabric/*.css', to: '.' },
      { from: './themes/seti/*.json', to: '.' }
    ])
  ]
});
