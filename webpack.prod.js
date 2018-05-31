const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const webpack = require('webpack');

module.exports = {
  plugins: (name, version) => [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'BASENAME': JSON.stringify('/apps/' + name),
      'VERSION': JSON.stringify(version)
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      template: '../index.webpack-prod.html',
      inject: 'body',
      filename: `./${name}.prod.html`
    }),
    new WebpackAssetsManifest({
      output: 'assets.json',
      merge: true
    })
  ]
}
