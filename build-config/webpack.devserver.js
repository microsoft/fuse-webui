const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devServer: (name, version, apiServerHost, port) => {
    return {
      contentBase: path.resolve(`../built/${version}`),
      compress: true,
      inline: true,
      port: port || 3006,
      historyApiFallback: {
        index: `../built/${version}/${name}.debug.html`,
        rewrites: [
          // to to home page for single page app
          { from: /^.*\/[^\.\/]*$/, to: `./${name}.debug.html` },
          { from: /developers\/.*$/, to: `./${name}.debug.html` }
        ]
      },
      proxy: {
        '/api': {
          target: `https://${apiServerHost}`,
          secure: false,
          debug: true,
          changeOrigin: true
        }
      }
    };
  },
  plugins: (name, version, title, templatePath) => [
    new webpack.DefinePlugin({
      'BASENAME': JSON.stringify('/'),
      'VERSION': JSON.stringify(version)
    }),
    new HtmlWebpackPlugin({
      template: templatePath || '../index.webpack-devserver.html',
      title: title,
      inject: 'body',
      filename: `./${name}.debug.html`
    })]
}
