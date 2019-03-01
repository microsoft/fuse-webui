const path = require('path');
var core = require('../webpack.core');
var CopyPlugin = require('copy-webpack-plugin');
const package = require('./package.json');
const version = `v${package.version}`;

/**
 * replace string 'https://static2.sharepointonline.com/files/fabric/assets/icons/fabricmdl2icons-2.58.woff2' with '../fonts/fabricmdl2icons-2.58.woff2'
 * @param {blob} content
 * @param {string} path
 */
function replaceIconFontUrl(content, path) {
  if (path.indexOf('fabric.min.css') >= 0) {
    return content.toString('utf8').replace('https://static2.sharepointonline.com/files/fabric/assets/icons/fabricmdl2icons-2.58.woff2', '../fonts/fabricmdl2icons-2.58.woff2');
  }

  return content;
}

module.exports = Object.assign(core, {
  mode: 'none',
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
      { from: './themes/fabric/*.css', to: '.', transform: replaceIconFontUrl },
      { from: './themes/seti/*.json', to: '.' }
    ])
  ]
});
