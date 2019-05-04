const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const prodPath = path.resolve(__dirname, './index.webpack-prod.html');

module.exports = {
  optimization: {
    minimize: true
  },
  mode: 'none',
  plugins: (name, version, title, templatePath) => [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'BASENAME': JSON.stringify('/apps/' + name),
      'VERSION': JSON.stringify(version)
    }),
    new HtmlWebpackPlugin({
      template: templatePath || prodPath,
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
