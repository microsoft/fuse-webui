const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: (name, version, title, templatePath) => [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'BASENAME': JSON.stringify('/apps/' + name),
      'VERSION': JSON.stringify(version)
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      template:  templatePath || '../index.webpack-prod.html',
      title: title,
      inject: 'body',
      filename: `./${name}.prod.html`
    }),
    new WebpackAssetsManifest({
      output: '../assets.json',
      merge: true,
      publicPath: `${version}/`
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: true,
      reportFilename: name + '-bundle-stat.html',
      defaultSizes: 'gzip',
      openAnalyzer: false
    })
  ]
}
