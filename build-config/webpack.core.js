const path = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");
const CopyPlugin = require("copy-webpack-plugin");
const { resolve } = require("path");
const vendorPath = resolve(__dirname, "./vendor.ts");

module.exports = {
  entry: {
    vendor: vendorPath,
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: [/\.tsx?$/],
        loader: "awesome-typescript-loader",
        exclude: [/node_modules/],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: "vendor",
          //test: /[\\/]node_modules[\\/]((react)|(react-dom)|(react-router)|(react-router-dom)|(redux)|(react-redux)|(es6-shim)|(tslib)|(whatwg-fetch)|(redux-saga)|(underscore)|(history))([\\/].*)?$/,
          name: "vendor",
          chunks: "initial",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new CheckerPlugin(),
    new CopyPlugin({
      patterns: [
        { from: `node_modules/@fuselab/ui-fabric/lib/themes/**/*.woff*`, to: "./assets/fonts/", flatten: true },
        { from: `node_modules/@fuselab/ui-fabric/lib/themes/fabric/*.css`, to: "./assets/css/", flatten: true },
      ],
    }),
  ],
};
